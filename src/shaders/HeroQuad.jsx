import PropTypes from 'prop-types'
import { useTexture, useVideoTexture, useFBO } from "@react-three/drei";
import { extend, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from "react";
import * as THREE from 'three';

import HeroMaterial from "./HeroMaterial";
import HBlurMaterial from "./HBlurMaterial";
import VBlurMaterial from "./VBlurMaterial";

extend({ HeroMaterial });
extend({ HBlurMaterial });
extend({ VBlurMaterial });

HeroQuad.propTypes = {
    src: PropTypes.string,
}

export default function HeroQuad({ src, ...props }) {
    const shaderRef = useRef();
    const meshRef = useRef();
    const horizontalBlurRef = useRef();
    const verticalBlurRef = useRef();

    const { viewport, gl, scene, camera } = useThree();

    const videoTexture = useVideoTexture(src);
    const noiseTexture = useTexture('/noise.jpg');

    const [renderTargetA, renderTargetB, blurTargetA, blurTargetB] = useMemo(() => [
        new THREE.WebGLRenderTarget(viewport.width, viewport.height),
        new THREE.WebGLRenderTarget(viewport.width, viewport.height),
        new THREE.WebGLRenderTarget(viewport.width, viewport.height),
        new THREE.WebGLRenderTarget(viewport.width, viewport.height)
    ], [viewport]);

    // Refs to track current read/write targets
    const readTarget = useRef(renderTargetA);
    const writeTarget = useRef(renderTargetB);

    let prevScrollY = 0;
    useFrame(({ clock }) => {
        if (!shaderRef.current || !meshRef.current || !horizontalBlurRef.current || !verticalBlurRef.current) return;

        shaderRef.current.uniforms.time.value = clock.getElapsedTime();
        shaderRef.current.uniforms.scrollDelta.value = window.scrollY - prevScrollY;
        shaderRef.current.uniforms.tPrevious.value = readTarget.current.texture;
        prevScrollY = window.scrollY;

        // Render current video frame to the write target
        const currentScene = scene.background;
        const currentOverrideMaterial = scene.overrideMaterial;

        scene.background = null;
        scene.overrideMaterial = shaderRef.current;
        gl.setRenderTarget(blurTargetA);
        gl.render(scene, camera);
        scene.background = currentScene;
        scene.overrideMaterial = currentOverrideMaterial;


        // Vertical blur pass
        meshRef.current.material = verticalBlurRef.current;
        verticalBlurRef.current.uniforms.tDiffuse.value = blurTargetA.texture;
        gl.setRenderTarget(blurTargetB);
        gl.render(scene, camera);

        // Horizontal blur pass
        meshRef.current.material = horizontalBlurRef.current;
        horizontalBlurRef.current.uniforms.tDiffuse.value = blurTargetB.texture;
        gl.setRenderTarget(writeTarget.current);
        gl.render(scene, camera);


        // Reset shaders for actual draw pass
        meshRef.current.material = shaderRef.current;
        gl.setRenderTarget(null);

        // Swap read and write targets for next frame
        const temp = readTarget.current;
        readTarget.current = writeTarget.current;
        writeTarget.current = temp;
    });

    return (
        <>
        <mesh ref={meshRef} {...props}>
            <planeGeometry />
            <Suspense fallback={<meshBasicMaterial color="black" />}>
                <hBlurMaterial
                    ref={horizontalBlurRef}
                    h={3 / viewport.width}
                />
                <vBlurMaterial
                    ref={verticalBlurRef}
                    v={3 / viewport.height}
                />

                <heroMaterial
                    ref={shaderRef}
                    key={HeroMaterial.key}
                    tMap={videoTexture}
                    tNoise={noiseTexture}
                    time={0}
                    resolution={[viewport.width, viewport.height]}
                />
            </Suspense>
        </mesh>
        </>
    );
};