// https://cdn.jsdelivr.net/npm/three@0.141/examples/js/shaders/VerticalBlurShader.js
uniform sampler2D tDiffuse;
uniform float v;

varying vec2 vUv;
varying vec2 vSUv;

void main() {
    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vSUv.x, vSUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;
}