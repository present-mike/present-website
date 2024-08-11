import * as THREE from "three"
import { shaderMaterial } from '@react-three/drei'

const HeroMaterial = shaderMaterial(
    {
        uColor: new THREE.Color(),
        uAlpha: 1
    },
    // vertex shader
    `
    uniform vec3 uColor;
    uniform float uAlpha;

    varying vec2 vUv;
  
    void main() {
        vUv = uv;
        vec3 pos = position;

        vec4 modelViewPos = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * modelViewPos;
    }
    `,
    // frag shader
    `
    uniform vec3 uColor;
    uniform float uAlpha;

    varying vec2 vUv;
    
    void main() {
        vec3 color = vec3(0.8, 0.14, 0.12);

        color = vec3(vUv, 0.);

        gl_FragColor = vec4(color, 1.0);
    }
    `
)

export default HeroMaterial;
