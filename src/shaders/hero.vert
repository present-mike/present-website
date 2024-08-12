uniform vec3 uColor;
uniform float uAlpha;

varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = position;

    vec4 modelViewPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * modelViewPos;
}