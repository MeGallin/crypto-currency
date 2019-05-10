import React from 'react';
import './App.css';
import CryptoCard from './components/crypto-card/';

function App() {
  return (
    <div className="App">
      <h1>Crypto Currencies</h1>
      <CryptoCard name="bitcoin" symbol="BTC" />
    </div>
  );
}

export default App;
