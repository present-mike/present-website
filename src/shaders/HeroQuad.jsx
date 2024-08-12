import { useTexture, useVideoTexture } from "@react-three/drei";

import HeroMaterial from "./HeroMaterial";
import { extend, useThree } from '@react-three/fiber';
import { Suspense } from "react";
extend({ HeroMaterial });

export default function HeroQuad ({ src, ...props }) {

    const viewport = useThree((state) => state.viewport);
    const videoTexture = useVideoTexture(src);
    const tex = useTexture('placeholder-hero.png');
    const noiseTexture = useTexture('noise.jpg');

    // const videoTexture = useMemo(() => {
    //     return new THREE.VideoTexture(src)
    // }, []);
    // useFrame({})

    return (<>
        <mesh {...props}>
            <planeGeometry />

            {/* TODO: add fallback to static img here */}
            <Suspense>
                <heroMaterial
                    key={HeroMaterial.key}
                    tMap={videoTexture}
                    tNoise={noiseTexture}
                    resolution={[ viewport.width, viewport.height ]}
                />
            </Suspense>

            {/* <meshBasicMaterial color="red" /> */}
        </mesh>
    </>);
};
