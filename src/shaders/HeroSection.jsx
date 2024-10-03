import { useRef, useState } from 'react'
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
    mobile: PropTypes.string.isRequired,
    mobileGif: PropTypes.string.isRequired,
    poster: PropTypes.string,
}

export default function HeroSection({ src, mobile, mobileGif }) {
    const GPUTier = useDetectGPU();
    const isMobile = useMediaQuery({ query: '(max-width: 425px)' })
    const [played, setPlayed] = useState(0)
    const el = useRef();

    function handlePlay(p) {
        if (p.playedSeconds === 0) {
            setPlayed(null)
        }
    }

    return (
        <>
            {(GPUTier.tier === "0" || (GPUTier.isMobile && GPUTier.tier === "1") || isMobile) ?
                <>
                    {played != null ? <div className={`${classes.screenHeightContainer} ${classes.noTouch}`}>
                        <ReactPlayer
                            playsinline
                            playing
                            loop
                            muted={true}
                            onProgress={handlePlay}
                            autoPlay
                            volume={0}
                            url={isMobile ? mobile : src}
                            key={src}
                            width='100%'
                            height='100%'
                            onPause={() => console.log('oops')}
                            style={{ maxWidth: `100vw`, maxHeight: `100vh`, position: `sticky`, top: 0 }}
                        />
                    </div> : <div className={`${classes.screenHeightContainer} ${classes.noTouch}`}>
                        <img src={mobileGif} alt="static" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>}
                </>
                :
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
