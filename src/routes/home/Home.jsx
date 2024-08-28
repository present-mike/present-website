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

export default function Home() {
    const [ref, inView] = useInView({ threshold: 0 });
    const [content, setContent] = useState(null)
    const [projects, setProjects] = useState([])
    const [lab, setLab] = useState(null)
    const [reel, setReel] = useState('placeholder-hero.mp4')
    const [about, setAbout] = useState(null)

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/landing-page')
            .then(response => response.json())
            .then(data => {
                setContent(data)
                setReel(data.HeaderReel.url)
            })
            .catch(error => console.error(error));

        fetch('https://present-cms.payloadcms.app/api/creative-directors')
            .then(response => response.json())
            .then(data => {
                setProjects(prev => prev.concat(data.docs))
            })
            .catch(error => console.error(error));

        fetch('https://present-cms.payloadcms.app/api/case-study')
            .then(response => response.json())
            .then(data => {
                setProjects(prev => prev.concat(data.docs))
            })
            .catch(error => console.error(error));

        fetch('https://present-cms.payloadcms.app/api/globals/innovation-lab')
            .then(response => response.json())
            .then(data => {
                setLab(data)
            })
            .catch(error => console.error(error));

        fetch('https://present-cms.payloadcms.app/api/globals/about?locale=undefined&draft=false&depth=1')
            .then(response => response.json())
            .then(data => {
                setAbout(data)
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        setProjects(prev => shuffleArray(prev))
    }, [])

    return (
        <>
            {!inView ? (
                <Header />
            ) : (
                <></>
            )}
            {content && (
                <>
                    <div className={classes.dataMoshContainer} ref={ref}>
                        <HeroSection src={reel} key={reel} />
                        <div style={{ zIndex: 9999, position: 'relative' }} className={`${classes.atLeastScreenHeightContainer} ${classes.flexCenter}`}>
                            <div className="section">
                                <div className={`${classes.headerContainer}`}>
                                    <h1 className={classes.heroHeader}>{content.Headline}</h1>
                                    <p className={classes.heroSubtitle}>{content.HeadlineSubtitle}</p>
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
                            <h2 className='heroHeader'>{about.Headline}</h2>
                            <img src={about.HeaderImage.url} key={about.HeaderImage.url} />
                        </div>
                    </div>
                    <hr />
                    <div className="section">
                        <div className={classes.listContainer}>
                            <DotList list={content.JustificationList[0]} />
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
                </>
            )}
            {lab ? (
                <div className='galleryContainer'>
                    <div className='imgBox'>
                        <Carousel images={lab.gallery} />
                    </div>
                </div>
            ) : null}
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