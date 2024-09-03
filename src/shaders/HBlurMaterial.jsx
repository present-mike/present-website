import * as THREE from "three"
import { shaderMaterial } from '@react-three/drei'

import vs from './hero.vert';
import fs from './hblur.frag';

const HBlurMaterial = shaderMaterial(
    {
        tDiffuse: null,
        h: 1 / 512
    }, vs, fs
)

export default HBlurMaterial;
