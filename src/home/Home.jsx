import classes from './home.module.css'
import logo from '../assets/present-logo.svg'

export default function Home() {

    return (
        <>
            <div className={`${classes.screenHeightContainer} ${classes.flexDown}`}>
                <img className={classes.logo} src={logo} alt="logo" />
            </div>
            <div className={`${classes.screenHeightContainer} ${classes.flexCenter}`}>
                <div className={`${classes.headerContainer} ${classes.flexCenter}`}>
                    <h1>
                        The future of experience and entertainment
                    </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>
        </>
    )
}