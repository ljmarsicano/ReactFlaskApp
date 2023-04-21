import React, { useState, useEffect } from 'react';
import './styles.css';

function LoginSignupButton() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [submitMessage, setSubmitMessage] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUserSubmission = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const firstnameRegex = /^[a-zA-Z'-]+$/;
    const lastnameRegex = /^[a-zA-Z'-]+$/;

    
    if (!emailRegex.test(email)) {
      setSubmitMessage('Please enter a valid email address');
      return;
    }
    if (!username) {
      setSubmitMessage('Username cannot be empty');
      return;
    }
    
    if (!usernameRegex.test(username)) {
      setSubmitMessage('Username should only contain letters and numbers');
      return;
    }
    if (!firstname) {
      setSubmitMessage('Please enter your first name');
      return;
    } else if (!firstnameRegex.test(firstname)) {
      setSubmitMessage('First name should only contain letters, hyphens, and apostrophes');
      return;
    } else if (!isNaN(firstname)) {
      setSubmitMessage('First name cannot be a number');
      return;
    }
    
    if (!lastname) {
      setSubmitMessage('Please enter your Last name');
      return;
    } else if (!lastnameRegex.test(lastname)) {
      setSubmitMessage('Last name should only contain letters, hyphens, and apostrophes');
      return;
    } else if (!isNaN(lastname)) {
      setSubmitMessage('Last name cannot be a number');
      return;
    }

    if (!passwordRegex.test(password)) {
      setSubmitMessage('Password must contain at least eight characters, one letter, and one number');
      return;
    }
    if (!confirmPassword) {
      setSubmitMessage('Please confirm your password');
      return;
    }
    if (password !== confirmPassword) {
      setSubmitMessage('Passwords do not match');
      return;
    }
    fetch('http://localhost:5000/api/setInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email : email,
                             username : username,
                             firstname : firstname,
                             lastname : lastname,
                             password : password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setSubmitMessage('User added successfully')
      }
      else {
        setSubmitMessage('User could not be added')
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUserSubmission();
    // TODO: implement the authentication and validation of the user input
  };

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="container">
    <center>
      {isLoginMode ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Login</button>
          <br />
          <button type="button" onClick={handleToggleMode}>
            Switch to Signup
          </button>
          <p>The current time is {currentTime}.</p>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            First Name:
            <input type="text" value={firstname} onChange={handleFirstNameChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={lastname} onChange={handleLastNameChange} />
          </label>
          <br />
          <label>
            New Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </label>
          <br />
          <button type="submit">Signup</button>
          <br />
          <button type="button" onClick={handleToggleMode}>
            Switch to Login
          </button>
          <p>{submitMessage}</p>
        </form>
      )}
      </center>
    </div>
  );


}

export default LoginSignupButton;
