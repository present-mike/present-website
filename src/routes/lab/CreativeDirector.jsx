import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import ReactPlayer from 'react-player/lazy'
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'
import classes from './creativeDirector.module.css'
import mutedImage from '../../assets/mute.svg'
import notMutedImage from '../../assets/unmute.svg'
import ProjectNavBar from '../../components/projectNavBar/ProjectNavBar'

export default function CreativeDirector() {
    const { id } = useParams();
    const [muted, setMuted] = useState(true)
    const [content, setContent] = useState(null)

    const isTabletUp = useMediaQuery({ query: '(min-width: 768px)' })

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/creative-directors/' + id + '?locale=undefined&draft=true&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data)
            })
            .catch(error => console.error(error));
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            {content ? (
                <>
                    <div className='spacer' style={{ borderBottom: 0 }} />
                    <div className="section">
                        <div style={{ position: 'relative' }}>
                            <ReactPlayer
                                playsinline
                                playing
                                loop
                                muted={muted}
                                url={content.reel.url}
                                key={content.reel.url}
                                width="100%" height="100%"
                                onClick={() => setMuted(prev => !prev)}
                            />
                            <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', width: '2rem', height: '2rem', pointerEvents: 'none' }}>
                                {muted ? <img src={mutedImage} alt="muted" /> : <img src={notMutedImage} alt="not muted" />}
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.infoSection} section`}>
                        <div className={classes.subtitleContainer}>
                            <div className={classes.leftItem}>
                                {isTabletUp && <img className={classes.square} src={content.profileImage.url} alt={content.name} />}
                                <div>
                                    <h3 className={classes.mediumWeight}>{content.name}</h3>
                                    <div>
                                        <h6>Role</h6>
                                        <p>Experience Director</p>
                                    </div>
                                </div>
                                <div>
                                    <h6>Socials</h6>
                                    {Object.entries(content.socials).map(([key, value]) => (
                                        <div key={key}>
                                            <a href={value.url} target="_blank">{value.label}</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={classes.subtitle}>
                                <p style={{ fontSize: '1.25rem' }}>{content.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='section'>
                        <div className={classes.caseGallery}>
                            {Object.entries(content.gallery.slice(0, 2)).map(([key, value]) => (
                                <div key={key}>
                                    <img src={value.image.url} alt={value.image.url} />
                                </div>
                            ))}
                            <div className={classes.doubleGallery}>
                                {Object.entries(content.gallery.slice(2)).map(([key, value]) => (
                                    <div key={key} style={{ flexBasis: '50%', height: '100%' }}>
                                        <img src={value.image.url} alt={value.image.url} style={{ height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <ProjectNavBar currentId={id} />
                </>
            ) : <Loading />}
        </>
    )
}