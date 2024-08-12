uniform float time;
uniform vec2 resolution;
uniform sampler2D tMap;
uniform sampler2D tNoise;
uniform vec3 uColor;
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

float AMT = 5.; //0 - 1 glitch amount
float SPEED = 0.1; //0 - 1 speed
float OFFSET = 20.;
float GLITCHSPEED = .95;
float GLITCHAMOUNT = .55;

void main() {
    vec2 coverUv = uvCover(vUv, vec2(1920., 1080.), resolution.xy);
    vec3 color = texture(tMap, coverUv).rgb;
    // color = vec3(vUv, 0.);

    vec3 noise = texture(tNoise, vUv).rgb;
    vec2 texel = 1. / resolution.xy;
    vec2 uv2 = coverUv;

    // block offset
    float maxOffset = AMT / 200.0;
    for (float i = 0.0; i < AMT; i += 1.0) {
        float sliceY = random2d(vec2(time * SPEED, 2345.0 + float(i)));
        float sliceH = random2d(vec2(time * SPEED, 9035.0 + float(i))) * 0.05;
        float hOffset = randomRange(vec2(time * SPEED, 9625.0 + float(i)), -maxOffset, maxOffset);

        if (insideRange(coverUv.y, sliceY, fract(sliceY + sliceH)) == 1.0 ) {
            uv2.x += hOffset;
        }
    }

    // pixel sort-ey glitch
    float step_y = texel.g * (rand(coverUv.x) * OFFSET) * (sin(sin(time * GLITCHSPEED)) * GLITCHAMOUNT + GLITCHAMOUNT * 0.6);
    step_y += rand(coverUv.x * coverUv.y * time) * 0.05 * sin(time);
    step_y = mix(step_y, step_y * rand(vUv.x * time) * 0.5, sin(time));
    
    vec2 uv3 = uv2;
    if (dot(color, vec3(0.299, 0.587, 0.114)) > .25 * (sin(time) * 0.725 + 0.5)) {
    	uv3.y += step_y;
    } else {
    	uv3.y -= step_y;
    }
    color = texture(tMap, uv3).rgb;

    gl_FragColor = vec4(color, 1.0);
}