import { useRef } from 'react'
import { UseCanvas, ScrollScene } from '@14islands/r3f-scroll-rig';
import classes from '../home/home.module.css';
import logo from '../assets/present-logo.svg'

import HeroMaterial from "./HeroMaterial";
import { extend } from '@react-three/fiber';
extend({ HeroMaterial });

export default function HeroSection() {
    const el = useRef();
    return (
        <>
            <div ref={el} className={`${classes.screenHeightContainer} ${classes.flexDown}`}>
                <img className={classes.logo} src={logo} alt="logo" />
            </div>
            <UseCanvas>
                <ScrollScene track={el}>
                    {(props) => (
                        <mesh {...props}>
                            <planeGeometry />
                            <heroMaterial key={HeroMaterial.key} />
                        </mesh>
                    )}
                </ScrollScene>
            </UseCanvas>
        </>
    );
};
