import { useTexture, useVideoTexture } from "@react-three/drei";

import PropTypes from 'prop-types'
import HeroMaterial from "./HeroMaterial";
import { extend, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef } from "react";
extend({ HeroMaterial });

HeroQuad.propTypes = {
    src: PropTypes.string,
}

export default function HeroQuad({ src, ...props }) {

    const shaderRef = useRef();
    const viewport = useThree((state) => state.viewport);

    const videoTexture = useVideoTexture(src);
    // const tex = useTexture('placeholder-hero.png');
    const noiseTexture = useTexture('/noise.jpg');

    // const videoTexture = useMemo(() => {
    //     return new THREE.VideoTexture(src)
    // }, []);

    // const h = window.innerHeight / 2
    useFrame(({ clock }) => {
        // const position = window.scrollY / h;
        shaderRef.current.uniforms.time.value = clock.getElapsedTime();
    });

    return (
        <mesh {...props}>
            <planeGeometry />

            {/* TODO: add fallback to static img here */}
            <Suspense>
                <heroMaterial
                    ref={shaderRef}
                    key={HeroMaterial.key}
                    tMap={videoTexture}
                    tNoise={noiseTexture}
                    time={0}
                    resolution={[viewport.width, viewport.height]}
                />
            </Suspense>

            {/* <meshBasicMaterial color="red" /> */}
        </mesh>
    );
};
