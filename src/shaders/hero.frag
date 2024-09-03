uniform float time;
uniform vec2 resolution;

uniform float scrollDelta;
uniform sampler2D tMap;
uniform sampler2D tNoise;
uniform sampler2D tPrevious;

uniform float uAlpha;

varying vec2 vUv;

// Emulates background-size: cover
vec2 uvCover (vec2 uv, vec2 size, vec2 resolution) {
    vec2 coverUv = uv;
    vec2 s = resolution; // Screen
    vec2 i = size; // Image

    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;

    coverUv = coverUv * s / new + offset;
    return coverUv;
}

float rand(float co) { return fract(sin(co*(91.3458)) * 47453.5453); }

float random2d(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float randomRange (in vec2 seed, in float min, in float max) {
    return min + random2d(seed) * (max - min);
}

// return 1 if v inside 1d range
float insideRange(float v, float bottom, float top) {
   return step(bottom, v) - step(top, v);
}

float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
    vec3 sub = vec3(oldValue, newMax, oldMax) - vec3(oldMin, newMin, oldMin);
    return sub.x * sub.y / sub.z + newMin;
}

float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
    return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMin, newMax), max(newMin, newMax));
}

vec3 step_gt(vec3 color, float cutoff) {
    return max(sign(color - cutoff), 0.0);
}

void main() {
    float AMT = crange(abs(scrollDelta), 0., 12., 0., 15.); //0 - 15 glitch amount
    float SPEED = 60.; //0 - 60 speed
    float WIDTH = crange(abs(scrollDelta), 10., 35., 40., 20.);

    float OFFSET = crange(abs(scrollDelta), 0., 20., 50., 200.); // 0-100
    float GLITCHSPEED = 0.05;
    float GLITCHAMOUNT = 0.55;
    float GLITCHAMP = crange(abs(scrollDelta), 0., 20., 0., 1.); // 0-1

    vec2 coverUv = uvCover(vUv, vec2(1920., 1080.), resolution.xy);
    vec3 color = texture(tMap, coverUv).rgb;
    // color = vec3(vUv, 0.);

    vec3 noise = texture(tNoise, vUv).rgb;
    vec2 texel = 1. / resolution.xy;
    vec2 uv2 = coverUv;

    // block offset
    float maxOffset = AMT / 200.0;
    for (float i = 0.0; i < AMT; i += 1.0) {
        float sliceY = random2d(vec2(floor(time * SPEED), 2345.0 + float(i)));
        float sliceH = random2d(vec2(floor(time * SPEED), 9035.0 + float(i))) / WIDTH;
        float hOffset = randomRange(vec2(floor(time * SPEED), 9625.0 + float(i)), -maxOffset, maxOffset);

        if (insideRange(coverUv.x, sliceY, fract(sliceY + sliceH)) == 1.0 ) {
            uv2.y += hOffset;
        }
    }

    // pixel sort-ey glitch
    float step_y = texel.g * (rand(coverUv.x) * OFFSET) * (sin(sin(time * GLITCHSPEED)) * GLITCHAMOUNT + GLITCHAMOUNT * 0.6);
    step_y += rand(coverUv.x * coverUv.y * time) * 0.05;
    step_y = mix(step_y, step_y * rand(vUv.x * time) * 0.5, 0.8);
    
    vec2 uv3 = uv2;
    if ((scrollDelta > 0. && dot(color, vec3(0.299, 0.587, 0.114)) > range(abs(scrollDelta), 0., 30., .00, .25)) ||
        (scrollDelta < 0. && dot(color, vec3(0.299, 0.587, 0.114)) < range(abs(scrollDelta), 0., 30., .00, .25))
    ) {
    	uv3.y += step_y * GLITCHAMP;
    } else {
    	uv3.y -= step_y * GLITCHAMP;
    }
    color = texture(tMap, uv3).rgb;


    // blend with past frames
    vec2 prevUv = coverUv;
    prevUv.y += (scrollDelta / resolution.y) * pow(crange(abs(scrollDelta), 15., 30., 1., 50.), 0.75);
    float fade = max(pow(crange(abs(scrollDelta), 0., 20., 0., .98), 0.05) - 0.01, 0.);
    float cutoff = crange(abs(scrollDelta), 5., 20., 0.95, 0.4);

    vec3 prevColor = texture(tPrevious, prevUv).rgb;
    prevColor *= fade * step_gt(prevColor, cutoff);
    color = max(color, prevColor);

    // color = prevColor;

    gl_FragColor = vec4(color, 1.0);
}