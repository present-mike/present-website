import { useRef } from 'react'
import PropTypes from 'prop-types'
import { UseCanvas } from '@14islands/r3f-scroll-rig';
import { StickyScrollScene } from '@14islands/r3f-scroll-rig/powerups'
import classes from '../routes/home/home.module.css';
import logo from '../assets/light-logo.svg'

import HeroQuad from './HeroQuad';

HeroSection.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string,
}

export default function HeroSection({ src }) {
    const el = useRef();
    return (
        <>
            <UseCanvas>
                <StickyScrollScene track={el}>
                    {(props) => (
                        <HeroQuad src={src} {...props} />
                    )}
                </StickyScrollScene>
            </UseCanvas>
            <div className={`${classes.screenHeightContainer} ${classes.flexDown}`}>
                <img className={classes.logo} src={logo} alt="logo" />
            </div>
            <div className={classes.stickyContainer}>
                <div ref={el} className={`${classes.screenHeightContainer} ${classes.sticky} ${classes.noTouch}`} />
            </div>
        </>
    );
}
