import { useEffect } from 'react'
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import Header from '../../components/header/Header'
import Loading from '../../components/loading/Loading'
import DotList from '../../components/dotList/DotList'
import classes from './about.module.scss'

export default function About() {
    const [content, setContent] = useStateWithCallbackLazy(null)

    useEffect(() => {
        fetch('https://present-cms.payloadcms.app/api/globals/about?locale=undefined&draft=false&depth=1')
            .then(response => response.json())
            .then(data => {
                setContent(data) //, () => addListener())
            })
            .catch(error => console.error(error));
    }, []);

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
                            <DotList list={content.ContentList[0]} imgList={content.ContentImageList[0]} showImages={content.DisplayImages}/>
                        </div>
                    </div>
                </>
            ) : <Loading />}
        </>
    )
}