// https://cdn.jsdelivr.net/npm/three@0.141/examples/js/shaders/HorizontalBlurShader.js
uniform sampler2D tDiffuse;
uniform float h;

varying vec2 vUv;
varying vec2 vSUv;

void main() {
    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vSUv.x - 4.0 * h, vSUv.y ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vSUv.x - 3.0 * h, vSUv.y ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vSUv.x - 2.0 * h, vSUv.y ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vSUv.x - 1.0 * h, vSUv.y ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vSUv.x + 1.0 * h, vSUv.y ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vSUv.x + 2.0 * h, vSUv.y ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vSUv.x + 3.0 * h, vSUv.y ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vSUv.x + 4.0 * h, vSUv.y ) ) * 0.051;

    gl_FragColor = sum;
}