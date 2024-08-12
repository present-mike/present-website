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

void main() {
    vec2 coverUv = uvCover(vUv, vec2(1920., 1080.), resolution.xy);
    vec3 color = texture(tMap, coverUv).rgb;

    vec3 noise = texture(tNoise, vUv).rgb;
    // color = vec3(vUv, 0.);

    gl_FragColor = vec4(color, 1.0);
}