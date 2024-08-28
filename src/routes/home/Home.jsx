import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import classes from './home.module.css'
import HeroSection from "../../shaders/HeroSection"
import AlternateRows from '../../components/alternateRows/AlternateRows'
import Carousel from '../../components/carousel/Carousel'
import arrow from '../../assets/down-arrow.svg'
import linkArrow from '../../assets/link-arrow.svg'
import DotList from '../../components/dotList/DotList'
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'

export default function Home() {
    const [ref, inView] = useInView({ threshold: 0 });
    const [content, setContent] = useState(null)
    const [projects, setProjects] = useState([])
    const [reel, setReel] = useState('placeholder-hero.mp4')

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/landing')
            .then(response => response.json())
            .then(data => {
                setContent(data)
                setReel(data.landing.HeaderReel.url)
                setProjects(shuffleArray(data.creativeDirectors.docs.concat(data.caseStudies.docs)))
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            {!inView ? (
                <Header />
            ) : (
                <></>
            )}

            {content ? (
                <>
                    <div className={classes.dataMoshContainer} ref={ref}>
                        <HeroSection src={reel} key={reel} />
                        <div style={{ zIndex: 9999, position: 'relative' }} className={`${classes.atLeastScreenHeightContainer} ${classes.flexCenter}`}>
                            <div className="section">
                                <div className={`${classes.headerContainer}`}>
                                    <h1 className={classes.heroHeader}>{content.landing.Headline}</h1>
                                    <p className={classes.heroSubtitle}>{content.landing.HeadlineSubtitle}</p>
                                </div>
                            </div>
                            <img className={classes.arrowImage} src={arrow} alt="Scroll Down" />
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
                            <h3>{content.InnovationLabDescription}</h3>
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
            ): <Loading />}
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