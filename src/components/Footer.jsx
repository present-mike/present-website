import { useState, useEffect, useRef } from 'react'
import { UseCanvas, ScrollScene } from '@14islands/r3f-scroll-rig';
import classes from './footer.module.css'
import HeroQuad from '../shaders/HeroQuad';
import logo from '../assets/dark-logo.svg'

export default function Footer() {
    const el = useRef()
    const [content, setContent] = useState(null)

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/footer?locale=undefined&draft=false&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data)
            })
            .catch(error => console.error(error));
    }, [])

    const src = 'https://present-cms.payloadcms.app/media/comp2.mp4'

    return (
        <>
            <div className={classes.spacer} />
            <div className={classes.footerWrapper}>
                <div className={classes.quadRef} ref={el} />
                <UseCanvas>
                    <ScrollScene track={el}>
                        {(props) => (
                            <HeroQuad src={src} {...props} />
                        )}
                    </ScrollScene>
                </UseCanvas>
                <hr />
                {content && (
                    <div className={`${classes.linkContainer} ${classes.blur}`}>
                        <div className={classes.linkItem}>
                            <h4>Join our mailing list</h4>
                            <form>
                                <input type="email" />
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                        <div className={classes.linkItem}>
                            <h4>Contact Us</h4>
                            <div className={classes.subItem}>
                                {Object.entries(content.contact).map(([key, value]) => (
                                    <a key={key} href={value.link.url}>{value.link.label}</a>
                                ))}
                                <h4>{content.phone}</h4>
                            </div>
                        </div>
                        <div className={classes.linkItem}>

                        </div>
                        <div className={classes.linkItem}>
                            <h4>Connect with Us</h4>
                            <div className={classes.subItem}>
                                {Object.entries(content.connect).map(([key, value]) => (
                                    <a key={key} href={value.link.url}>{value.link.label}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <hr />
                <div className={`${classes.logoContainer} ${classes.blur}`}>
                    <p className={classes.logoSubtitle}>@ 2024 present</p>
                    <img className={classes.logo} src={logo} alt="logo" />
                </div>
            </div>
        </>
    )
}