import AccountBalance from './components/AccountBalance/AccountBalance';
import styled from 'styled-components';
import React from 'react'
import CoinList from './components/CoinList/CoinList';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import axios from 'axios';

const AppCss = styled.div`
  text-align: center;
  background-color: rgb(151, 69, 201);
  color: rgb(255, 255, 255);
`
const COIN_COUNT = 10;
class App extends React.Component {
  state = {
    buttonState: true,
    balance: 0,
    coinData: [
      // {
      //   name: "Bitcoin", 
      //   ticker: "BTC",
      //   balance: 0.5,
      //   price: 20000
      // },
      // {
      //   name: "Ethereum", 
      //   ticker: "ETH",
      //   balance: 32.0,
      //   price: 1000
      // },
      // {
      //   name: "Dogecoin", 
      //   ticker: "DOGE",
      //   balance: 1000,
      //   price: 0.04
      // },
      // {
      //   name: "Tether", 
      //   ticker: "USDT",
      //   balance: 0,
      //   price: 1.0
      // },
      // {
      //   name: "Solana", 
      //   ticker: "SOL",
      //   balance: 100,
      //   price: 25
      // }
    ]
  }

  componentDidMount = async () => {
    this.calculateBalance();

    const response = await axios.get('https://api.coinpaprika.com/v1/coins')
    const coinIDs = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const tickerURL = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIDs.map(id => axios.get(tickerURL + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map( function(response) {
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: coin.quotes.USD.price,
      }
    });
    this.setState({ coinData: coinPriceData });
  }

  calculateBalance = () => {
    let totalBalance = 0;
    this.state.coinData.forEach(function( {price, balance}){
      totalBalance = totalBalance + (balance * price);
      return totalBalance;
    })
    this.setState({balance: totalBalance});
    console.log("Total balance is ",totalBalance);
  }

  handleHide = () => {
    this.setState({
        buttonState: !this.state.buttonState,
    })
    console.log(this.state.buttonState);
  }

  handleRefresh = (valueChangeKey) => {
    const newCoinData =  this.state.coinData.map( function(values) {
      let newValues = {...values};  // * Shallow clone of the original object to avoid pointer issue. 
      const response = axios.get('https://api.coinpaprika.com/v1/tickers/' + newValues.key);
      if ( valueChangeKey === newValues.ticker) {
        console.log("Key is", newValues.key);
        
        response.then(function(response) {
          const coin = response.data;
          newValues.price = coin.quotes.USD.price;
          console.log("Price is ", newValues.price);
        }).catch(function(error) {
          console.log(error);
        });
      }
      return newValues;
    });
    this.setState({coinData: newCoinData});
  }

  render() {
    return (
      <AppCss>
        <ExchangeHeader />
        <AccountBalance 
          amount={this.state.balance} //pass buttonState to AccountBalance component to determine whether to show or hide
          buttonState={this.state.buttonState}
          handleHide={this.handleHide} />
        <CoinList 
          calculateBalance={this.calculateBalance}
          coinData={this.state.coinData} 
          
          handleRefresh={this.handleRefresh} 
          handleHide={this.handleHide}
          buttonState={this.state.buttonState}
          />
      </AppCss>
    );
  }
  
}

export default App;
