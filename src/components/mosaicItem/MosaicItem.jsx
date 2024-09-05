import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import classes from './mosaicItem.module.css'
import PropTypes from 'prop-types'

gsap.registerPlugin(useGSAP);

MosaicItem.propTypes = {
    item: PropTypes.object,
}

export default function MosaicItem({ item }) {
    const path = getProjectType(item)
    const overlay = useRef()
    const isTabletUp = useMediaQuery({ query: '(min-width: 768px)' })

    const onMouseEnter = () => {
        gsap.to(overlay.current, { opacity: 1 });
    };

    const onMouseLeave = () => {
        gsap.to(overlay.current, { opacity: 0 });
    };


    return (
        <div className={classes.mosaicItem}>
            <div
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                style={{ position: 'relative', width: '100%', height: '100%' }}
            >
                <Link to={`/${path}/` + item.id} style={{ width: 'fit-content', height: 'fit-content' }}>
                    <img src={item.thumbnail.url} alt={item.name} className={classes.mosaicImg} />
                </Link>
                {isTabletUp ? (
                    <div ref={overlay} className={`${classes.mosaicHover}`}>
                        <h4>{item.name}</h4>
                    </div>
                ) : null}
            </div>
            {!isTabletUp ? (
                <h4 style={{ color: 'black', marginTop: '0.5rem' }}>{item.name}</h4>
            ) : null}
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