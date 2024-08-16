import { useState, useEffect } from 'react'
import classes from './home.module.css'
import HeroSection from "../../shaders/HeroSection"
import arrow from '../../assets/down-arrow.svg'

export default function Home() {
    const [content, setContent] = useState([])
    const [reel, setReel] = useState('placeholder-hero.mp4')

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/landing-page?locale=undefined&draft=false&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data)
                setReel(data.HeaderReel.url)
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
            {/* Gallery */}
            <div className={classes.spacer} />
            <div className={classes.labHeader}>
                <h3>{content.InnovationLabDescription}</h3>
            </div>
        </>
    )
}