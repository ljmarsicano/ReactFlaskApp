import React, { useState, useEffect } from 'react';
import './searchbar.css';

function Searchbar () {
    const [symbol, setSymbol] = useState('');
    const [message, setMessage] = useState('');

    const handleSearchChange = (event) => {
        setSymbol(event.target.value);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUserSubmission();
      };

    const handleUserSubmission = () => {
      fetch('http://localhost:5000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ symbol : symbol })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setMessage('Watching ' + symbol)
      }
      else {
        setMessage('Symbol not found')
      }
    })
    .catch(error => {
      console.error(error);
    });

    }

    return (
        <>
            <div className='search-container'>
                <form id='search' onSubmit={handleSubmit}>
                    <input className='searchbar' type='text' name='search' placeholder='Stock symbol' value={symbol} onChange={handleSearchChange}/>
                    <button id='search-button'>Search</button>
                    <p>{message}</p>
                </form>
            </div> 
        </>
    )

}

export default Searchbar;