import { useTexture, useVideoTexture, useFBO } from "@react-three/drei";
import PropTypes from 'prop-types'
import HeroMaterial from "./HeroMaterial";
import { extend, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from "react";
import * as THREE from 'three';

extend({ HeroMaterial });

HeroQuad.propTypes = {
    src: PropTypes.string,
}

export default function HeroQuad({ src, ...props }) {
    const shaderRef = useRef();
    const meshRef = useRef(); // Add this line
    const { viewport, gl, scene, camera } = useThree();

    const videoTexture = useVideoTexture(src);
    const noiseTexture = useTexture('/noise.jpg');

    // Create two render targets for ping-pong
    const [renderTargetA, renderTargetB] = useMemo(() => [
        new THREE.WebGLRenderTarget(viewport.width, viewport.height),
        new THREE.WebGLRenderTarget(viewport.width, viewport.height)
    ], [viewport]);

    // Refs to track current read/write targets
    const readTarget = useRef(renderTargetA);
    const writeTarget = useRef(renderTargetB);

    let prevScrollY = 0;
    useFrame(({ clock }) => {
        if (!shaderRef.current) return;

        shaderRef.current.uniforms.time.value = clock.getElapsedTime();
        shaderRef.current.uniforms.scrollDelta.value = window.scrollY - prevScrollY;
        shaderRef.current.uniforms.tPrevious.value = readTarget.current.texture;

        // Render to the write target
        const currentScene = scene.background;
        const currentOverrideMaterial = scene.overrideMaterial;
        
        scene.background = null;
        scene.overrideMaterial = shaderRef.current;
        
        gl.setRenderTarget(writeTarget.current);
        gl.render(scene, camera);
        gl.setRenderTarget(null);
        
        scene.background = currentScene;
        scene.overrideMaterial = currentOverrideMaterial;

        // Swap read and write targets
        const temp = readTarget.current;
        readTarget.current = writeTarget.current;
        writeTarget.current = temp;

        prevScrollY = window.scrollY;
    });

    return (
        <mesh ref={meshRef} {...props}>
            <planeGeometry />
            <Suspense fallback={<meshBasicMaterial color="black" />}>
                <heroMaterial
                    ref={shaderRef}
                    key={HeroMaterial.key}
                    tMap={videoTexture}
                    tNoise={noiseTexture}
                    tPrevious={renderTargetA.texture}
                    time={0}
                    resolution={[viewport.width, viewport.height]}
                />
            </Suspense>
        </mesh>
    );
};