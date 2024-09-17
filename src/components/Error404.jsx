import Header from './header/Header'
import { Link } from 'react-router-dom'

export default function Error404() {
    return (
        <>
            <Header />
            <div className='spacer' />
            <div style={{ height: "50vh" }} className="section">
                <h1>404 Page Not Found</h1>
                <Link to='/'>
                    <h3>Back to Home</h3>
                </Link>
            </div>
        </>
    )
}