import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import ReactPlayer from 'react-player/lazy'
import Header from '../../components/header/Header'
import linkArrow from '../../assets/link-arrow.svg'
import classes from './caseStudy.module.css'

export default function CaseStudy() {
    const { id } = useParams()
    const [content, setContent] = useState(null)
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/case-study/' + id + '?locale=undefined&draft=true&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data)
            })
            .catch(error => console.error(error));

        fetch('https://present-cms.payloadcms.app/api/creative-directors')
            .then(response => response.json())
            .then(data => {
                setProjects(data.docs)
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
                        <div className={classes.headSectionContainer}>
                            <div className={classes.headerContainer}>
                                <h2 className='heroHeader'>{content.name}</h2>
                                <h3>{content.description}</h3>
                            </div>
                            <ReactPlayer
                                playing
                                loop
                                url={content.reel.url}
                                key={content.reel.url}
                                width="100%"
                                height="100%"
                            />
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
                                    <p>{content.insight}</p>
                                </div>
                                <div className={classes.rightItem}>
                                    <h4>Idea</h4>
                                    <p>{content.idea}</p>
                                </div>
                                <div className={classes.rightItem}>
                                    <h4>Execution</h4>
                                    <p>{content.execution}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='section'>
                        <div className={classes.caseGallery}>
                            {Object.entries(content.gallery).map(([key, value]) => (
                                <div key={key}>
                                    <img src={value.image.url} alt={value.image.url} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr />
                    <div className='wSection'>
                        <div className={classes.seeMoreHeader}>
                            <Link to="/">
                                <div className='arrowDiv'>
                                    <h3>View all projects</h3>
                                    <img src={linkArrow} alt="arrow" />
                                </div>
                            </Link>
                        </div>
                        <div className={classes.projectGallery}>
                            {projects &&
                                (Object.entries(projects).map(([key, value]) => (
                                    <div key={key}>
                                        <Link to={'/creative-director/' + value.id} >
                                            <img src={value.thumbnail.url} alt={value.thumbnail.url} className={classes.square} />
                                            <h4>{value.name}</h4>
                                            {/* <p>{value.description}</p> */}
                                        </Link>
                                    </div>
                                )))
                            }
                        </div>
                    </div>
                </>
            )}
        </>
    )
}