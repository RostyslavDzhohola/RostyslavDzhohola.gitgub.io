import AccountBalance from './components/AccountBalance/AccountBalance';
import styled from 'styled-components';
import React from 'react'
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';

const AppCss = styled.div`
  text-align: center;
  background-color: rgb(151, 69, 201);
  color: rgb(255, 255, 255);
`
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 20000,
      coinData: [
        {
          name: "Bitcoin", 
          ticker: "BTC",
          price: 29999.99
        },
        {
          name: "Ethereum", 
          ticker: "ETH",
          price: 1900
        },
        {
          name: "Dogecoin", 
          ticker: "DOGE",
          price: 0.003
        },
        {
          name: "Tether", 
          ticker: "USDT",
          price: 1.0
        },
        {
          name: "Solana", 
          ticker: "SOL",
          price: 50
        }

      ]
    }
  }

  render() {
    return (
      <AppCss>
        <Header />
        <AccountBalance amount={this.state.balance}/>
        <CoinList coinData={this.state.coinData} />
      </AppCss>
    );
  }
  
}

export default App;
