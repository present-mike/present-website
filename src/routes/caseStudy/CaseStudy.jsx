import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import ReactPlayer from 'react-player/lazy'
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'
import classes from './caseStudy.module.css'
import mutedImage from '../../assets/mute.svg'
import notMutedImage from '../../assets/unmute.svg'
import ProjectNavBar from '../../components/projectNavBar/ProjectNavBar'

export default function CaseStudy() {
    const { id } = useParams()
    const [content, setContent] = useStateWithCallbackLazy(null)
    const [muted, setMuted] = useState(true)

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/case-study/' + id + '?locale=undefined&draft=true&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data, () => window.scrollTo(0, 0))
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header />
            {content ? (
                <>
                    <div className='spacer' />
                    <div className="section">
                        <div className={classes.headSectionContainer}>
                            <div className={classes.headerContainer}>
                                <h2 className='heroHeader'>{content.name}</h2>
                                <h3>{content.description}</h3>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <ReactPlayer
                                    playing
                                    loop
                                    url={content.reel.url}
                                    key={content.reel.url}
                                    width="100%"
                                    height="100%"
                                    muted={muted}
                                    onClick={() => setMuted(prev => !prev)}
                                    volume={1}
                                />
                                <div style={{ position: 'absolute', bottom: '2rem', left: '1.5rem', width: '2rem', height: '2rem', pointerEvents: 'none' }}>
                                    {muted ? <img src={mutedImage} alt="muted" /> : <img src={notMutedImage} alt="not muted" />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className={classes.subtitleContainer}>
                            <div>
                                <h3 className={`${classes.leftItem} ${classes.mediumWeight}`} >{content.name}</h3>
                                <div className={classes.leftItem}>
                                    <h5>What we did do</h5>
                                    <p>{content.roles[0].role}</p>
                                </div>
                                <div className={classes.leftItem}>
                                    <h5>Industry</h5>
                                    <p>{content.industry}</p>
                                </div>
                                <div className={classes.leftItem}>
                                    <h5>Team</h5>
                                    <p>{content.team[0].teamMember}</p>
                                </div>
                            </div>
                            <div className={classes.subtitle}>
                                <div className={classes.rightItem}>
                                    <h4>Insight</h4>
                                    <p style={{ textTransform: 'none' }}>{content.insight}</p>
                                </div>
                                <div className={classes.rightItem}>
                                    <h4>Idea</h4>
                                    <p style={{ textTransform: 'none' }}>{content.idea}</p>
                                </div>
                                <div className={classes.rightItem}>
                                    <h4>Execution</h4>
                                    <p style={{ textTransform: 'none' }}>{content.execution}</p>
                                </div>
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
                    <ProjectNavBar />
                </>
            ) : <Loading />
            }
        </>
    )
}