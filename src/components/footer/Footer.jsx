import { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { UseCanvas, ScrollScene } from '@14islands/r3f-scroll-rig';
import ReactPlayer from 'react-player/lazy'
import classes from './footer.module.scss'
import HeroQuad from '../../shaders/HeroQuad';
import logo from '../../assets/dark-logo.svg'

export default function Footer() {
    const el = useRef()
    const [content, setContent] = useState(null)
    const isLaptopUp = useMediaQuery({ query: '(min-width: 992px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 425px)' })

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/footer?locale=undefined&draft=false&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data)
            })
            .catch(error => console.error(error));
    }, [])

    return (
        <>
            <div className={classes.spacer} />
            <div className={classes.footerWrapper}>
                <div className={classes.quadRef} ref={el} />
                {content ? (
                    <>
                        {isMobile ? (
                            <div className={`${classes.stickyContainer}`}>
                                <div className={`${classes.screenHeightContainer} ${classes.sticky} ${classes.noTouch}`}>
                                    <ReactPlayer
                                        playing
                                        loop
                                        muted
                                        url={content.SourceReel.url}
                                        key={content.SourceReel.url}
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </div>
                        ) : (
                            <UseCanvas>
                                <ScrollScene track={el}>
                                    {
                                        (props) => (
                                            <HeroQuad src={content.SourceReel.url} {...props} />
                                        )}
                                </ScrollScene>
                            </UseCanvas >
                        )
                        }
                    </>
                ) : null}
                <hr />
                {
                    content && (
                        <div className={`${classes.linkContainer} ${classes.blur}`}>
                            <div className={classes.linkItem}>
                                <h4 className={`${classes.label} ${classes.bolded}`}>Contact Us</h4>
                                <div className={classes.subItem}>
                                    {Object.entries(content.contact).map(([key, value]) =>
                                        <div key={key}>
                                            {value.link.url != "NA" ?
                                                <a className={classes.label} href={value.link.url}>{value.link.label}</a>
                                                : <p className={classes.label}>{value.link.label}</p>
                                            }
                                        </div>
                                    )}
                                    <h4 className={classes.label}>{content.phone}</h4>
                                </div>
                            </div>
                            <div className={classes.linkItem}>
                                <h4 className={`${classes.label} ${classes.bolded}`}>Connect with Us</h4>
                                <div className={classes.subItem}>
                                    {Object.entries(content.connect).map(([key, value]) => (
                                        <a key={key} href={value.link.url} className={classes.label}>{value.link.label}</a>
                                    ))}
                                </div>
                            </div>
                            {isLaptopUp && (
                                <>
                                    <div className={classes.linkItem} />
                                </>
                            )}
                        </div>
                    )
                }
                <hr />
                <div className={`${classes.logoContainer} ${classes.blur}`}>
                    <p className={classes.logoSubtitle}>@ 2024 present</p>
                    <img className={classes.logo} src={logo} alt="logo" />
                </div>
            </div >
        </>
    )
}