import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import CoinList from './components/CoinList/CoinList';
import AccountBalanceHeader from './components/AccountBalanceHeader/AccountBalanceHeader';
import CoinDetails from './components/CoinDetails/CoinDetails';
import axios from 'axios';

const AppCss = styled.div`
  text-align: center;
  background-color: white ; 
  color: rgb(255, 255, 255); 
  width: 100%; 
`
const COIN_COUNT = 10;

function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [coinDetailReveal, setCoinDetailReveal] = useState(false);
  const [coinDetail, setCoinDetail] = useState();

  const componentDidMount = async () => {
    calculateBalance();

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
        id: coin.id,
        balance: 0,
        price: coin.quotes.USD.price,
      }
    });
    setCoinData( coinPriceData );
  }

  const calculateBalance = () => {
    let totalBalance = 0;
    coinData.forEach(function( {price, balance}){
      totalBalance = totalBalance + (balance * price);
      return totalBalance;
    })
    setBalance(totalBalance + balance); // Later change this to be a function that takes in the coinData and calculates the balance for each coin and adds it to the total balance
    console.log("Total balance is ",totalBalance);
  }

  const handleHide = () => {
    setShowBalance(!showBalance);
    console.log(showBalance);
  }

  const handleRefresh = async (valueChangeId) => {
    const tickerURL = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerURL);
    const newPrice = response.data.quotes.USD.price;
    const newCoinData = coinData.map( function(coin) {
      let newValues = {...coin}
      if (valueChangeId === coin.id) {
        console.log("Price of the", coin.name, "is", newPrice);
        newValues.price = newPrice;
      }
      return newValues;
    });
    setCoinData(newCoinData);
  }

  const handleInfo = (valueChangeId) => {  
    let newCoin;
    setCoinDetailReveal(!coinDetailReveal);
    if (valueChangeId) {
      newCoin = valueChangeId;
      console.log("valueChangeId is", valueChangeId);
    }
    setCoinDetail(newCoin);
    console.log("Coin detail is ", coinDetail);
  }

  useEffect(() => {
    if ( coinData.length === 0 ) {
      componentDidMount();
    }
  }); 

  return (
    <AppCss>
      <AccountBalanceHeader 
        amount={balance}
        showBalance={showBalance}
        handleHide={handleHide}
      />
      { !coinDetailReveal ? 
        <CoinList 
          calculateBalance={calculateBalance}
          coinData={coinData} 
          
          handleRefresh={handleRefresh} 
          handleHide={handleHide}
          showBalance={showBalance}
          handleInfo={handleInfo} /> 
        : 
        <CoinDetails 
          handleInfo={handleInfo}
          coinDetail={coinDetail}
        /> 
      }
    </AppCss>
  );
  
}

export default App;
