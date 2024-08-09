import { useState, useEffect } from 'react'
import classes from './home.module.css'
import logo from '../assets/present-logo.svg'

export default function Home() {

    const [content, setContent] = useState([])

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/landing-page?locale=undefined&draft=false&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data)
                console.log(data)
            })
            .catch(error => console.error(error));
    })

    return (
        <>
            <div className={`${classes.screenHeightContainer} ${classes.flexDown}`}>
                <img className={classes.logo} src={logo} alt="logo" />
            </div>
            <div className={`${classes.screenHeightContainer} ${classes.flexCenter}`}>
                <div className={`${classes.headerContainer} ${classes.flexCenter}`}>
                    <h1>{content.Headline}</h1>
                    <p>{content.HeadlineSubtitle}</p>
                </div>
            </div>
        </>
    )
}