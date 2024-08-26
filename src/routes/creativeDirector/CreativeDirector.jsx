import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import ReactPlayer from 'react-player/lazy'
import useStateWithCallback from 'use-state-with-callback';
import Header from '../../components/header/Header'
import classes from './creativeDirector.module.css'

export default function CreativeDirector() {
    const { id } = useParams();
    const [content, setContent] = useStateWithCallback(null, () => {
    })

    const isTabletUp = useMediaQuery({ query: '(min-width: 768px)' })

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/creative-directors/' + id + '?locale=undefined&draft=true&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data)
                console.log(data)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header />
            {content && (
                <>
                    <div className='spacer' />
                    <div className="section">
                        <div>
                            <ReactPlayer
                                playing
                                loop
                                url={content.reel.url}
                                key={content.reel.url}
                                width="100%" height="100%"
                            />
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
                                        <p>Creative Director</p>
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
                                <p>{content.description}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}