import React, { Component } from 'react';
import './styles.css';

class CryptoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      symbol: props.symbol,
      price: null,
      lastPrice: null
    };

    this.pollPrice = this.pollPrice.bind(this);
    this.priceChange = this.priceChange.bind(this);
  }

  componentDidMount() {
    this.pollPrice();
    setInterval(this.pollPrice, 10000);
  }
  pollPrice() {
    const { symbol } = this.state;
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${symbol},USD`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState(prevState => ({
          price: json.USD,
          lastPrice:
            prevState.price !== json.USD ? prevState.price : prevState.lastPrice
        }));
      });
  }

  priceChange(lastPrice, price) {
    const diff = lastPrice - price;
    const change = diff / lastPrice;
    return (change * 100).toFixed(3);
  }

  render() {
    const { name, symbol, price, lastPrice } = this.state;
    const gainloss = lastPrice > price ? 'gain' : 'loss';
    return (
      <div>
        <div>{name}</div>
        <div className={`card ${gainloss}`}>
          <div>price:{price}</div>
          <div>
            {symbol} {this.priceChange(lastPrice, price)}%{' '}
          </div>
          <div>Price Change: {lastPrice - price}</div>
        </div>
      </div>
    );
  }
}

export default CryptoCard;
