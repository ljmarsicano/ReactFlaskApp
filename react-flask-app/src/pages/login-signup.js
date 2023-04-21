import React from 'react';
import LoginSignupButton from '../components/login-signup-button';
import '../components/pages.css';

const LoginSignup = () => {
    return (
        <>
        <div>
            <h1 class='main-header'>
                Login / Signup
            </h1>
            <br></br>
            <div class='centered'>
                <LoginSignupButton>
                </LoginSignupButton>
            </div>
        </div>
        </>
    )
}

export default LoginSignup;