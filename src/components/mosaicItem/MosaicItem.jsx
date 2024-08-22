import { Link } from 'react-router-dom'
import { useState } from 'react'
import classes from './mosaicItem.module.css'
import PropTypes from 'prop-types'

MosaicItem.propTypes = {
    item: PropTypes.object,
}

export default function MosaicItem({ item }) {
    const path = getProjectType(item)
    const [style, setStyle] = useState({ display: 'none' })

    return (
        <div className={classes.mosaicItem}>
            <div
                style={{ position: 'relative', width: '100%', height: '100%' }}
                onMouseEnter={() => {
                    setStyle({ display: 'block' });
                }}
                onMouseLeave={() => {
                    setStyle({ display: 'none' })
                }}
            >
                <Link to={`/${path}/` + item.id}>
                    <img src={item.thumbnail.url} alt={item.name} className={classes.mosaicImg} />
                </Link>
                <div className={classes.mosaicHover} style={style}>
                    <h4>{item.name}</h4>
                </div>
            </div>
        </div>
    )
}

function getProjectType(project) {
    let path = 'case-study'
    if (Object.hasOwn(project, 'socials')) {
        path = 'creative-director'
    }
    return path
}