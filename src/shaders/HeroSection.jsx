import { useRef, } from 'react'
import { useMediaQuery } from 'react-responsive'
import PropTypes from 'prop-types'
import { ScrollScene, UseCanvas } from '@14islands/r3f-scroll-rig';
import { useDetectGPU } from '@react-three/drei';
import ReactPlayer from 'react-player/lazy'

import classes from '../routes/home/home.module.scss';
import FadeIn from '../components/fadeIn/FadeIn'

import HeroQuad from './HeroQuad';

HeroSection.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string,
}

export default function HeroSection({ src }) {
    const GPUTier = useDetectGPU();
    const isMobile = useMediaQuery({ query: '(max-width: 425px)' })
    const el = useRef();

    return (
        <>
            {(GPUTier.tier === "0" || (GPUTier.isMobile && GPUTier.tier === "1") || isMobile) ?
                <div className={`${classes.screenHeightContainer} ${classes.noTouch}`}>
                    <ReactPlayer
                        playsinline
                        playing
                        loop
                        muted
                        url={src}
                        key={src}
                        width='100%'
                        height='100%'
                        style={{ maxWidth: `100vw`, maxHeight: `100vh`, position: `sticky`, top: 0 }}
                        volume={0}
                        config={{
                            file: {
                                attributes: {
                                    autoPlay: true,
                                    muted: true
                                }
                            }
                        }}
                    />
                </div> :
                <>
                    <div ref={el} className={`${classes.screenHeightContainer} ${classes.noTouch}`} />
                    <UseCanvas>
                        <ScrollScene track={el}>
                            {
                                (props) => (
                                    <HeroQuad src={src} {...props} />
                                )}
                        </ScrollScene >
                    </UseCanvas >
                </>}

            <FadeIn />
        </>
    );
}
