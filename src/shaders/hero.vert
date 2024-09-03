uniform float time;
uniform vec3 uColor;
uniform float uAlpha;

varying vec2 vUv;
varying vec2 vSUv;

void main() {
    vUv = uv;

    vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vSUv = (clipPos.xy / clipPos.w) * vec2(.5) + vec2(.5);

    gl_Position = clipPos;
}