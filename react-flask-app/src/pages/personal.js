import React from 'react';
import NavBar from '../components/navbar';
import '../components/pages.css';

const Personal = () => {
    return (
        <>
            <NavBar />
            <h1>Personal Page</h1>
            <div class='personal-value'>
                <p>This section will display total value of money</p>
            </div>
            <div class='personal-graph'>
                <h3>Total value</h3>
                <p>This section will display a graph of the starting value and current value</p>
            </div>
            <div class='personal-holdings'>
                <h3>Current Holdings</h3>
                <p>This section will display a table of current holdings</p>
            </div>
        </>
    )
}

export default Personal;