import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import classes from './home.module.css'
import HeroSection from "../../shaders/HeroSection"
import AlternateRows from '../../components/alternateRows/AlternateRows'
import arrow from '../../assets/down-arrow.svg'
import linkArrow from '../../assets/link-arrow.svg'
import Header from '../../components/header/Header'

export default function Home() {
    const [ref, inView] = useInView({ threshold: 0 });
    const [content, setContent] = useState([])
    const [projects, setProjects] = useState([])
    const [lab, setLab] = useState(null)
    const [reel, setReel] = useState('placeholder-hero.mp4')

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
    }, []);

    return (
        <>
            {!inView ? (
                <Header />
            ): (
                <></>
            )}
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
            {lab ? (
                <div className='galleryContainer'>
                    <div className='imgBox'>
                        {Object.entries(lab.gallery).map(([key, value]) => (
                            <img key={key} src={value.image.url} alt={value.image.url} />
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    )
}