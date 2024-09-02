import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import useStateWithCallback from 'use-state-with-callback';
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'
import Carousel from '../../components/carousel/Carousel'
import classes from './lab.module.css'
import mutedImage from '../../assets/mute.svg'
import notMutedImage from '../../assets/unmute.svg'

export default function Lab() {
    const [muted, setMuted] = useState(true)
    const [content, setContent] = useStateWithCallback(null, () => {
    })

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/innovation-lab')
            .then(response => response.json())
            .then(data => {
                setContent(data)
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
                        <div className='headerContainer'>
                            <h2 className='heroHeader'>{content.Headline}</h2>
                            <div style={{ position: 'relative' }}>
                                <ReactPlayer
                                    playing
                                    loop
                                    url={content.Reel.url}
                                    key={content.Reel.url}
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
                    <hr />
                    <div className="section">
                        <div className={classes.subtitleContainer}>
                            <h3>Our Drive</h3>
                            <p className={classes.subtitle}>{content.HeadlineSubtitle}</p>
                        </div>
                    </div>
                    <div className='galleryContainer'>
                        <div className='imgBox'>
                            <Carousel images={content.gallery} />
                        </div>
                    </div>
                </>
            ) : <Loading />}
        </>
    )
}