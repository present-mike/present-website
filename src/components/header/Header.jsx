import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useLocation } from 'react-router-dom'
import classes from './header.module.css'
import logo from '../../assets/dark-logo.svg'
import hamburger from './hamburger.svg'

export default function Header() {
    const isTabletUp = useMediaQuery({ query: '(min-width: 768px)' })
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation();

    const menu = <ul>
        <li>
            <Link to='/lab'>
                <p>Innovation Lab</p>
            </Link>
        </li>
        <li>
            <Link to='/about'>
                <p>About</p>
            </Link>
        </li>
    </ul>

    return (
        <>
            {location != '/'} && {
                <div className={classes.spacer} />
            }
            <div className={classes.stickyHeader}>
                <div className="wSection">
                    <div className={`${classes.navContainer} ${classes.navSpacing}`}>
                        <Link to="/">
                            <img className={classes.headLogo} src={logo} alt="Present" />
                        </Link>
                        {isTabletUp ? <>{menu}</> : (
                            <button className={classes.cleanButton} onClick={() => setMenuOpen(prev => !prev)}>
                                <img src={hamburger} alt="Menu" />
                            </button>
                        )}
                    </div>
                </div>
                {menuOpen && (
                    <div className="wSection">
                        {menu}
                    </div>
                )}
            </div>
        </>
    )
}
