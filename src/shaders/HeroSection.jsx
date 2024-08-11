import { useRef } from 'react'
import { UseCanvas, ScrollScene } from '@14islands/r3f-scroll-rig';
import classes from '../home/home.module.css';
import logo from '../assets/present-logo.svg'

import HeroQuad from './HeroQuad';

export default function HeroSection({ src, poster }) {
    const el = useRef();
    return (
        <>
            <div ref={el} className={`${classes.screenHeightContainer} ${classes.flexDown}`}>
                <img className={classes.logo} src={logo} alt="logo" />
            </div>

            <UseCanvas>
                <ScrollScene track={el}>
                    {(props) => (
                        <HeroQuad src={src} {...props} />
                    )}
                </ScrollScene>
            </UseCanvas>
        </>
    );
};
