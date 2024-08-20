import { useState, useEffect } from 'react'
import classes from './home.module.css'
import HeroSection from "../../shaders/HeroSection"
import arrow from '../../assets/down-arrow.svg'

export default function Home() {
    const [content, setContent] = useState([])
    const [directors, setDirectors] = useState([])
    const [cases, setCases] = useState([])
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
                setDirectors(data.docs)
            })
            .catch(error => console.error(error));

        fetch('https://present-cms.payloadcms.app/api/case-study')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCases(data.docs)
            })
            .catch(error => console.error(error));

        fetch('https://present-cms.payloadcms.app/api/globals/innovation-lab')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLab(data)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <div className={classes.dataMoshContainer}>
                <HeroSection src={reel} key={reel} />
                <div className={`${classes.screenHeightContainer} ${classes.flexCenter}`}>
                    <div className={`${classes.headerContainer}`}>
                        <h1 className={classes.heroHeader}>{content.Headline}</h1>
                        <p className={classes.heroSubtitle}>{content.HeadlineSubtitle}</p>
                    </div>
                    <img className={classes.arrowImage} src={arrow} alt="Scroll Down" />
                </div>
            </div>
            <div className={classes.spacer} />
            <div className={classes.mosaic}>
                {Object.entries(cases).map(([key, value]) => (
                    <div key={key} className={classes.mosaicItem}>
                        <img src={value.thumbnail.url} alt={value.name} />
                    </div>
                ))}
            </div>
            <div className={classes.spacer} />
            <div className={classes.labHeader}>
                <h3>{content.InnovationLabDescription}</h3>
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