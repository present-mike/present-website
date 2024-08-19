import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player/lazy'
import useStateWithCallback from 'use-state-with-callback';
import classes from './creativeDirector.module.css'

export default function CreativeDirector() {
    const { id } = useParams();
    const [content, setContent] = useStateWithCallback(null, () => {
    })

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
            {content && (
                <>
                    <div className="section">
                        <div>
                            <ReactPlayer url={content.reel.url} key={content.reel.url} width="100%" height="100%" />
                        </div>
                    </div>
                    <div className={classes.infoSection}>
                        <div className={classes.subtitleContainer}>
                            <div className={classes.leftItem}>
                                <div>
                                    <img src={content.profileImage.url} alt={content.name} />
                                    <h3>{content.name}</h3>
                                </div>
                                <div>
                                    <h6>Role</h6>
                                    <p>Creative Director</p>
                                </div>
                                <div>
                                    <h6>Socials</h6>
                                    {Object.entries(content.socials).map(([key, value]) => (
                                        <div key={key}>
                                            <a href={value.url}>{value.label}</a>
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