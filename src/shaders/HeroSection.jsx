import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UseCanvas } from '@14islands/r3f-scroll-rig';
import { StickyScrollScene } from '../routes/home/StickyScrollScene'
import classes from '../routes/home/home.module.css';
import logo from '../assets/light-logo.svg'
import logosmear from '../assets/logosmear.mp4'

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import HeroQuad from './HeroQuad';

HeroSection.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string,
}

export default function HeroSection({ src }) {
    const videoRef = useRef(null);
    const scrollDivRef = useRef(null);
    const el = useRef();

    return (
        <>
            <div className={`${classes.screenHeightContainer} ${classes.flexDown}`} ref={scrollDivRef}>
                <img className={classes.logo} src={logo} alt="logo" />
            </div>
            <div className={`${classes.stickyContainer}`}>
                <div ref={el} className={`${classes.screenHeightContainer} ${classes.sticky} ${classes.noTouch}`} />
            </div>
            <UseCanvas>
                <StickyScrollScene track={el}>
                    {(props) => (
                        <HeroQuad src={src} {...props} />
                    )}
                </StickyScrollScene>
            </UseCanvas>
        </>
    );
}
