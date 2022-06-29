import AccountBalance from './components/AccountBalance/AccountBalance';
import styled from 'styled-components';
import React from 'react'
import CoinList from './components/CoinList/CoinList';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';

const AppCss = styled.div`
  text-align: center;
  background-color: rgb(151, 69, 201);
  color: rgb(255, 255, 255);
`
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: true,
      balance: 0,
      coinData: [
        {
          name: "Bitcoin", 
          ticker: "BTC",
          balance: 0.5,
          price: 20000
        },
        {
          name: "Ethereum", 
          ticker: "ETH",
          balance: 32.0,
          price: 1000
        },
        {
          name: "Dogecoin", 
          ticker: "DOGE",
          balance: 1000,
          price: 0.04
        },
        {
          name: "Tether", 
          ticker: "USDT",
          balance: 0,
          price: 1.0
        },
        {
          name: "Solana", 
          ticker: "SOL",
          balance: 100,
          price: 25
        }

      ]
    }
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.calculateBalance = this.calculateBalance.bind(this);
  }

  calculateBalance(){
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

  handleRefresh(valueChangeTicker){
    const newCoinData = this.state.coinData.map( function( {ticker, name, price, balance} ) {
      let newPrice = price;
      if ( valueChangeTicker === ticker) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newPrice = newPrice * randomPercentage;
      }
      return {
        ticker,
        name,
        balance,
        price: newPrice
      }
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
