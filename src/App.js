import './App.css';
import Coin from './components/Coin/Coin';
import AccountBalance from './components/AccountBalance/AccountBalance';
import logo from './logo.svg';
import React from 'react'


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
      <div className="App">
        <header className="App-header">
         <img src={logo} alt="React logo" className="App-logo"/>
          <h1 className="App-title">
            Coin Exchange 
          </h1>
       
        </header>
        <AccountBalance amount={this.state.balance}/>
        <table className="coin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Ticker</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            { 
              this.state.coinData.map(v => 
                <Coin key={v.ticker} {...v}/>
              )
            }
          </tbody>
        </table>
  
      </div>
    );
  }
  
}

export default App;
