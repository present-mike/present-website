import { useRef, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import PropTypes from 'prop-types'
import { UseCanvas } from '@14islands/r3f-scroll-rig';
import { StickyScrollScene } from '../routes/home/StickyScrollScene'
import ReactPlayer from 'react-player/lazy'
import classes from '../routes/home/home.module.css';
import FadeIn from '../components/fadeIn/FadeIn'
import lottie from 'lottie-web';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import animationData from '../assets/Present.json'

gsap.registerPlugin(ScrollTrigger);

import HeroQuad from './HeroQuad';

HeroSection.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string,
}

export default function HeroSection({ src }) {
    const scrollDivRef = useRef(null);
    const animationRef = useRef(null);
    const el = useRef();

    const isMobile = useMediaQuery({ query: '(max-width: 425px)' })

    useEffect(() => {
        // Load the Lottie animation
        const lottieAnimation = lottie.loadAnimation({
            container: animationRef.current, // the DOM element to render the animation
            renderer: 'svg',
            loop: false, // Control the loop manually via scroll
            autoplay: false, // We'll control the animation via GSAP
            animationData: animationData, // Replace with the path to your Lottie file
        });

        // GSAP ScrollTrigger setup
        ScrollTrigger.create({
            trigger: scrollDivRef.current,
            start: 'top top', // When the top of the container hits the top of the viewport
            end: 'bottom top', // When the bottom of the container hits the bottom of the viewport
            scrub: true, // Smoothly scrubs the animation based on scroll position
            onUpdate: (self) => {
                const progress = self.progress; // Progress of the scroll (0 to 1)
                lottieAnimation.goToAndStop(progress * lottieAnimation.totalFrames, true); // Map scroll progress to animation frames
            },
        });

        // Clean up on component unmount
        return () => {
            lottieAnimation.destroy(); // Destroy the animation when the component is unmounted
        };
    }, []);

    useEffect(() => {
        const fadeDiv = scrollDivRef.current;

        gsap.to(fadeDiv, {
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: fadeDiv,
                start: "top top", // When the top of the div hits the top of the viewport
                end: "bottom top", // When the bottom of the div hits the top of the viewport
                scrub: true,      // Smoothly scrubs the animation
            },
        });
    }, []);

    return (
        <>
            <div className={`${classes.stickyContainer}`}>
                <div ref={el} className={`${classes.screenHeightContainer} ${classes.sticky} ${classes.noTouch}`} />
            </div>
            {isMobile ? (
                <div className={`${classes.stickyContainer}`}>
                    <div className={`${classes.screenHeightContainer} ${classes.sticky} ${classes.noTouch}`}>
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
                </div>
            ) : (
                <UseCanvas>
                    <StickyScrollScene track={el}>
                        {
                            (props) => (
                                <HeroQuad src={src} {...props} />
                            )}
                    </StickyScrollScene >
                </UseCanvas >
            )
            }
            <FadeIn />
            <div className={`${classes.screenHeightContainer} ${classes.flexDown}`} style={{ opacity: 1 }} ref={scrollDivRef}>
                <div style={{ width: '100%', padding: '3rem', boxSizing: 'border-box' }} ref={animationRef} />
            </div>
        </>
    );
}
