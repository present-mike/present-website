import { useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import useStateWithCallback from 'use-state-with-callback';
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'
import Carousel from '../../components/carousel/Carousel'
import classes from './lab.module.css'

export default function Lab() {
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
                            <ReactPlayer url={content.Reel.url} key={content.Reel.url} width="100%" height="100%" />
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