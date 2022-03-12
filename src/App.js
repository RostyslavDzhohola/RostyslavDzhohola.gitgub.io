import './App.css';
import Coin from './components/Coin';
import Coin2 from './components/Coin2';
import logo from './logo.svg';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <img src={logo} alt="React logo" className="App-logo"
       />
        <h1 className="App-title">
          Coin Exchange 
        </h1>
     
      </header>

      <table className="coin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <Coin name="Bitcoin" ticker="BTC" price={45000} />
          <Coin name="Ethereum" ticker="ETH" price={200} />
          <Coin name="Dogecoin" ticker="DOGE" price={0.003} />
          <Coin name="Tether" ticker ="USDT" price={1.0}/>
          <Coin name="Ripple" ticker="XRP" price={0.4}/>
          <Coin name="Ripple" ticker="XRP" price={0.4}/>
        </tbody>
      </table>

    </div>
  );
}

export default App;
