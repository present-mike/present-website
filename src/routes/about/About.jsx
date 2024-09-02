import { useEffect } from 'react'
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'
import DotList from '../../components/dotList/DotList'
import classes from './about.module.css'

export default function About() {
    const [content, setContent] = useStateWithCallbackLazy(null)

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/about?locale=undefined&draft=false&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data, () => window.scrollTo(0, 0))
            })
            .catch(error => console.error(error));
    }, []);

    // function email(e) {
    //     console.log(e)
    // }

    return (
        <>
            <Header />
            {content ? (
                <>
                    <div className='spacer' />
                    <div className="section">
                        <div className='headerContainer'>
                            <h2 className='heroHeader'>{content.Headline}</h2>
                            <img src={content.HeaderImage.url} key={content.HeaderImage.url} />
                        </div>
                    </div>
                    <hr />
                    <div className="section">
                        <div className={classes.listContainer}>
                            <DotList list={content.ContentList[0]} />
                        </div>
                    </div>
                    <hr />
                    <div className={`section ${classes.contactContainer}`}>
                        <div>
                            <h3>Let&apos;s Create Together</h3>
                            <h4>here@nowpresent.co</h4>
                        </div>
                        <hr />
                        <form className={classes.contactGrid}>
                            <h4 className={classes.fullCol}>contact form</h4>
                            <input type="text" placeholder="First Name*" required></input>
                            <input type="text" placeholder="Last Name*" required></input>
                            <input type="text" placeholder="Email*" required></input>
                            <input type="tel" placeholder="Phone Number"></input>
                            <input type="text" placeholder="Company Name*" className={classes.fullCol} required></input>
                            <input type="text" placeholder="Message" className={`${classes.fullCol} ${classes.tallRow}`}></input>
                            <input type="submit" className={classes.fullCol}></input>
                        </form>
                    </div>
                </>
            ) : <Loading />}
        </>
    )
}