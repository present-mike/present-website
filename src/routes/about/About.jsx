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
                setContent(data) //, () => addListener())
            })
            .catch(error => console.error(error));
    }, []);

    // function addListener() {
    //     window.scrollTo(0, 0)
    //     document.getElementById('sendEmail').addEventListener('click', function (event) {
    //         event.preventDefault();
    //         const emailTo = 'here@nowpresent.co';
    //         let first = document.getElementById('firstName').value;
    //         let last = document.getElementById('firstName').value;
    //         let company = document.getElementById('company').value;
    //         let phone = document.getElementById('phone').value;
    //         const emailSubject = 'Reaching Out'
    //         const emailBody = document.getElementById('message').value;

    //         // Create the mailto link
    //         const body = "It's " + first + " " + last + " from " + company + ", " + phone + " \n\n" + emailBody
    //         const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;

    //         console.log(body)
    //         const hiddenMailto = document.getElementById('hiddenMailto');
    //         hiddenMailto.href = mailtoLink;
    //         hiddenMailto.click();
    //     });
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
                </>
            ) : <Loading />}
            {/* <hr /> */}
            {/* <div className={`section ${classes.contactContainer}`}>
                <div>
                    <h3>Let&apos;s Create Together</h3>
                    <h4>here@nowpresent.co</h4>
                </div>
                <hr />
                <form className={classes.contactGrid} id="emailForm">
                    <h4 className={classes.fullCol}>contact form</h4>
                    <input type="text" placeholder="First Name*" required id="firstName"></input>
                    <input type="text" placeholder="Last Name*" required id="lastName"></input>
                    <input type="text" placeholder="Email*" required id="email"></input>
                    <input type="tel" placeholder="Phone Number" id="phone"></input>
                    <input type="text" placeholder="Company Name*" className={classes.fullCol} required id="company"></input>
                    <input type="text" placeholder="Message" className={`${classes.fullCol} ${classes.tallRow}`} id="message"></input>
                    <button className={classes.fullCol} type="button" id="sendEmail">Submit</button>
                </form>
                <a id="hiddenMailto" style={{ display: "none" }} target="_blank"></a>
            </div> */}
        </>
    )
}