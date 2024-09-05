import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import linkArrow from '../../assets/link-arrow.svg'
import classes from './projectNavBar.module.css'

export default function ProjectNavBar() {
    const [projects, setProjects] = useState(null)
    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/creative-directors')
            .then(response => response.json())
            .then(data => {
                setProjects(data.docs)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='wSection'>
            <div className={classes.seeMoreHeader}>
                <Link to="/#projects">
                    <div className='arrowDiv'>
                        <h3>View all projects</h3>
                        <img src={linkArrow} alt="arrow" />
                    </div>
                </Link>
            </div>
            <div className={classes.projectGallery}>
                {projects &&
                    (Object.entries(projects.slice(0, 3)).map(([key, value]) => (
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
    )
}