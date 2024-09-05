import { useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import classes from './header.module.css'
import logo from '../../assets/dark-logo.svg'
import hamburger from './hamburger.svg'

export default function Header() {
    const isTabletUp = useMediaQuery({ query: '(min-width: 768px)' })
    const [menuOpen, setMenuOpen] = useState(false)
    const lastHash = useRef('');

    function toProjects() {
        if (location.pathname === "/") {
            if (location.hash) {
                lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
            }

            if (lastHash.current && document.getElementById(lastHash.current)) {
                setTimeout(() => {
                    document
                        .getElementById(lastHash.current)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    lastHash.current = '';
                }, 1000);
            }
        }
    }

    const menu = <ul>
        <li>
            <Link to='/about'>
                <p>About</p>
            </Link>
        </li>
        <li>
            <Link to='/#projects' onClick={() => toProjects()}>
                <p>Work</p>
            </Link>
        </li>
        <li>
            <Link to='/lab'>
                <p>Innovation Lab</p>
            </Link>
        </li>
    </ul>

    return (
        <div className={`${classes.stickyHeader}`}>
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
            {menuOpen ? (
                <div className="wSection">
                    {menu}
                </div>
            ) : null}
        </div>
    )
}
