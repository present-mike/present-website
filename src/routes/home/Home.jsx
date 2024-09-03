import { useState, useEffect, useRef } from 'react'
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import lottie from 'lottie-web';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import classes from './home.module.css'
import HeroSection from "../../shaders/HeroSection"
import AlternateRows from '../../components/alternateRows/AlternateRows'
import Carousel from '../../components/carousel/Carousel'
import arrow from '../../assets/down-arrow.svg'
import linkArrow from '../../assets/link-arrow.svg'
import DotList from '../../components/dotList/DotList'
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'

import animationData from '../../assets/Present.json'
gsap.registerPlugin(ScrollTrigger);


export default function Home() {
    const [ref, inView] = useInView({ threshold: 0 });
    const [content, setContent] = useStateWithCallbackLazy(null)
    const [projects, setProjects] = useStateWithCallbackLazy([])
    const [reel, setReel] = useState('placeholder-hero.mp4')
    const lastHash = useRef('');
    const scrollDivRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/landing')
            .then(response => response.json())
            .then(data => {
                setContent(data, () => addAnimation())
                setReel(data.landing.HeaderReel.url)
                setProjects(shuffleArray(data.creativeDirectors.docs.concat(data.caseStudies.docs)), () => toProjects())
            })
            .catch(error => console.error(error));
    }, []);

    function toProjects() {
        if (location.hash) {
            lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            setTimeout(() => {
                document
                    .getElementById(lastHash.current)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                lastHash.current = '';
            }, 1000);
        }
    }

    function addAnimation() {
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
    }

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

    gsap.fromTo('.landing-head',
        {
            opacity: 0,
            x: -100
        },
        {
            scrollTrigger: '.landing-head', // start the animation when ".box" enters the viewport (once)
            ease: 'sine.out',
            opacity: 1,
            x: 0,
            duration: 1,
            scrub: 1
        });

    gsap.fromTo('.entire-nav',
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 1,
            scrub: 1
        });

    return (
        <>
            {!inView ? (
                <Header className='entire-nav' />
            ) : (
                <></>
            )}

            {content ? (
                <>
                    <div className={classes.dataMoshContainer} ref={ref}>
                        <HeroSection src={reel} key={reel} />
                        <div style={{ zIndex: 9999, position: 'absolute', bottom: 0, opacity: 1, width: '100%' }}>
                            <div ref={scrollDivRef} className={`${classes.atLeastScreenHeightContainer} ${classes.flexDown}`} style={{ opacity: 1 }}>
                                <div style={{ width: '100%', padding: '3rem', boxSizing: 'border-box' }} ref={animationRef} />
                            </div>
                            <div className={`${classes.atLeastScreenHeightContainer} ${classes.flexCenter}`}>
                                <div className="section">
                                    <div className={`landing-head ${classes.headerContainer}`}>
                                        <h1 className={classes.heroHeader}>{content.landing.Headline}</h1>
                                        <p style={{ textTransform: 'none' }} className={classes.heroSubtitle}>{content.landing.HeadlineSubtitle}</p>
                                    </div>
                                </div>
                                <img className={classes.arrowImage} src={arrow} alt="Scroll Down" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.spacer} />
                    <div id="projects" className={`${classes.mosaic}`}>
                        {projects ?
                            (
                                <AlternateRows data={projects} />
                            ) : null
                        }
                    </div>
                    <div className={classes.spacer} />
                    <div className="section">
                        <div className='headerContainer'>
                            <h2 className='heroHeader'>{content.about.Headline}</h2>
                            <img src={content.about.HeaderImage.url} key={content.about.HeaderImage.url} />
                        </div>
                    </div>
                    <hr />
                    <div className="section">
                        <div className={classes.listContainer}>
                            <DotList list={content.landing.JustificationList[0]} />
                        </div>
                    </div>
                    <div className={classes.spacer} />
                    <div className='wSection'>
                        <div className={classes.labHeader}>
                            <h3>{content.landing.InnovationLabDescription}</h3>
                            <Link to="/lab">
                                <div className='linkContainer'>
                                    <h4>Read More</h4>
                                    <img src={linkArrow} alt="arrow" className={classes.arrow} />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='galleryContainer'>
                        <div className='imgBox'>
                            <Carousel images={content.lab.gallery} />
                        </div>
                    </div>
                </>
            ) : <Loading />}
        </>
    )
}

function shuffleArray(array) {
    if (array != null) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }
    return null
}