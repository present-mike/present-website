import { Link } from 'react-router-dom'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import classes from './mosaicItem.module.css'
import PropTypes from 'prop-types'

MosaicItem.propTypes = {
    item: PropTypes.object,
}

export default function MosaicItem({ item }) {
    const path = getProjectType(item)
    const overlay = useRef()

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set(overlay.current, { opacity: 0 });
        });

        return () => ctx.revert();
    }, [])

    const onMouseEnter = ({ currentTarget }) => {
        let q = gsap.utils.selector(currentTarget);
        gsap.to(q(".overlay"), { opacity: 1, duration: 1 });
    };

    const onMouseLeave = ({ currentTarget }) => {
        let q = gsap.utils.selector(currentTarget);

        gsap.to(q(".overlay"), { opacity: 0 });
    };


    return (
        <div className={classes.mosaicItem}>
            <div
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                style={{ position: 'relative', width: '100%', height: '100%' }}
            >
                <Link to={`/${path}/` + item.id}>
                    <img src={item.thumbnail.url} alt={item.name} className={classes.mosaicImg} />
                </Link>
                <div ref={overlay} className={`overlay ${classes.mosaicHover}`}>
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