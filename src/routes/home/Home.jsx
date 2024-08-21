import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classes from './home.module.css'
import HeroSection from "../../shaders/HeroSection"
import arrow from '../../assets/down-arrow.svg'

export default function Home() {
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

    function getProjectType(project) {
        let path = 'case-study'
        if (Object.hasOwn(project, 'socials')) {
            path = 'creative-director'
        }
        return path
    }

    return (
        <>
            <div className={classes.dataMoshContainer}>
                <HeroSection src={reel} key={reel} />
                <div className={`${classes.atLeastScreenHeightContainer} ${classes.flexCenter}`}>
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
            <div className={`${classes.mosaic} ${classes.screenHeightContainer}`}>
                {projects &&
                    (
                        <>
                            <div className={classes.mosaicRow}>
                                {Object.entries(projects.slice(0, Math.ceil(projects.length / 2))).map(([key, value]) => {
                                    const path = getProjectType(value)
                                    return (
                                        <div key={key} className={classes.mosaicItem}>
                                            <Link to={`/${path}/` + value.id} >
                                                <img src={value.thumbnail.url} alt={value.name} />
                                            </Link>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                            <div className={classes.mosaicRow}>
                                {Object.entries(projects.slice(Math.ceil(projects.length / 2))).map(([key, value]) => {
                                    const path = getProjectType(value)
                                    return (
                                        <div key={key} className={classes.mosaicItem}>
                                            <Link to={`/${path}/` + value.id} >
                                                <img src={value.thumbnail.url} alt={value.name} />
                                            </Link>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </>
                    )
                }
            </div>
            <div className={classes.spacer} />
            <div className='wSection'>
                <div className={classes.labHeader}>
                    <h3>{content.InnovationLabDescription}</h3>
                </div>
            </div>
            {lab && (
                <div className='galleryContainer'>
                    <div className='imgBox'>
                        {Object.entries(lab.gallery).map(([key, value]) => (
                            <img key={key} src={value.image.url} alt={value.image.url} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}