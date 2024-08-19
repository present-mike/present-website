import { useEffect } from 'react'
import useStateWithCallback from 'use-state-with-callback';
import classes from './about.module.css'

export default function About() {
    const [content, setContent] = useStateWithCallback(null, () => {
    })

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/about?locale=undefined&draft=false&depth=1')
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
                        <div className='headerContainer'>
                            <h2 className='heroHeader'>{content.Headline}</h2>
                            <img src={content.HeaderImage.url} className={classes.heroSubtitle} key={content.HeaderImage.url} />
                        </div>
                    </div>
                    <hr />
                    <div className="section">
                        <div className={classes.listContainer}>
                            {Object.entries(content.ContentList[0]).map(([key, value]) => {
                                if (key != "id") {
                                    return (
                                        <div key={key} className={classes.listItem}>
                                            <div className={classes.dot} />
                                            <h3>{value}</h3>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}