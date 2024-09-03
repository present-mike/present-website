import { useRef, } from 'react'
import { useMediaQuery } from 'react-responsive'
import PropTypes from 'prop-types'
import { ScrollScene, UseCanvas } from '@14islands/r3f-scroll-rig';
import ReactPlayer from 'react-player/lazy'
import classes from '../routes/home/home.module.css';
import FadeIn from '../components/fadeIn/FadeIn'

import HeroQuad from './HeroQuad';

HeroSection.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string,
}

export default function HeroSection({ src }) {
    const el = useRef();

    const isMobile = true;//useMediaQuery({ query: '(max-width: 425px)' })

    return (
        <>
            <div ref={el} className={`${classes.screenHeightContainer} ${classes.noTouch}`} />
            {/* {isMobile ? (
                    <div className={`${classes.screenHeightContainer} ${classes.noTouch}`}>
                        <ReactPlayer
                            playing
                            loop
                            muted
                            url={src}
                            key={src}
                            width="100%"
                            height="100%"
                        />
                    </div>
            ) : ( */}
                <UseCanvas>
                    <ScrollScene track={el}>
                        {
                            (props) => (
                                <HeroQuad src={src} {...props} />
                        )}
                    </ScrollScene >
                </UseCanvas >
            {/* )
            } */}
            <FadeIn />
        </>
    );
}
