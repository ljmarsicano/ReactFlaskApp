import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function NavBar () {
    return (
        <>
            <header>
            <a href='/login-home'><img class='logo' src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Editions-stock-logo.jpg" /></a>
            <nav>
                <ul>
                    <li><a href='/personal'>Personal</a></li>
                    <li><a href='/stock'>Stock</a></li>
                    <li id='logout'><a href='/'>Logout</a></li>
                </ul>
            </nav>
        </header>
        </>
    )
}

export default NavBar;