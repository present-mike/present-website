import * as THREE from "three"
import { shaderMaterial } from '@react-three/drei'

import vs from './hero.vert';
import fs from './hero.frag';

const HeroMaterial = shaderMaterial(
    {
        tMap: null,
        tNoise: null,
        resolution: [0, 0],
        uColor: new THREE.Color(),
        uAlpha: 1
    }, vs, fs
)

export default HeroMaterial;
