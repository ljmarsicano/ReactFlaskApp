import { React } from 'react';
import MainNavbar from '../components/main-navbar';
import '../components/pages.css';

function Home () {
    return (
        <>
        <body>
            <MainNavbar />
            <h1 class='welcome'>Welcome to PsyStock</h1>
            <div className='about'>
                <p>This section will display the welcome and about section</p>
            </div>
            <div className='footer'>
                <p>Here will be the contact info / useful links</p>
            </div>
        </body>
        </>
    )
}

export default Home;