import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import '../components/pages.css';
import Searchbar from '../components/searchbar';

const Stock = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('http://localhost:5000/api/getAllStockWatchItems')
        .then(res => res.json())
        .then(data => {
          setData(data);
        });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const renderSquares = () => {
    return data.map((item, index) => (
      <div key={index} className="square">
        <p>SYMBOL: {item.symbol}</p>
        <p>PRICE: {item.price}</p>
        <p>VOLUME: {item.volume}</p>
      </div>
    ));
  };

  return (
    <>
      <NavBar />
      <h1>Stock Page</h1>
      <Searchbar />
      <div className="stock-total">
        <h3>Stock Total</h3>
        <p>This section will show the stock total</p>
      </div>
      <div className="stock-holdings">
        <h3>Holdings</h3>
        <p>This section will show current stock holdings</p>
      </div>
      <div className="stock-watchlist">
        <h3>Watchlist</h3>
        <div className="squares-container">{renderSquares()}</div>
      </div>
    </>
  );
};

export default Stock;
