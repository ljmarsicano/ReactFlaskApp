import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
import './navbar.css';

function MainNavbar () {
    return (
        <>
        <header>
            <a href='/'><img class='logo' src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Editions-stock-logo.jpg" /></a>
            <nav>
                <ul>
                    <li id='login'><a href='/login-signup'>Login / Signup</a></li>
                </ul>
            </nav>
        </header>
        </>
    )
}

export default MainNavbar;