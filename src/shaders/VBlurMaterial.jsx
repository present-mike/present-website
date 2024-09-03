import * as THREE from "three"
import { shaderMaterial } from '@react-three/drei'

import vs from './hero.vert';
import fs from './vblur.frag';

const VBlurMaterial = shaderMaterial(
    {
        tDiffuse: null,
        v: 1 / 512
    }, vs, fs
)

export default VBlurMaterial;
