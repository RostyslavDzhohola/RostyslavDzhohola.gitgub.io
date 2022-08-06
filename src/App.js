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
  const [cashBalance, setCashBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [coinDetailReveal, setCoinDetailReveal] = useState(false);
  const [coinDetail, setCoinDetail] = useState();
  // const [coinBuySellAmount, setCoinBuySellAmount] = useState(0);

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
        coinBalance: 0,
        coinCashBalane: 0,
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
    setCashBalance(totalBalance + cashBalance); // Later change this to be a function that takes in the coinData and calculates the balance for each coin and adds it to the total balance
    console.log("Total balance is ",totalBalance);
  }

  const handleHide = () => {
    setShowBalance(!showBalance);
    console.log(showBalance);
  }

  const handleRefresh = async (valueChangeId) => {
    const tickerURL = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerURL);
    const newPrice = response.data.quotes.USD.price; // newPrice string to number
    const newCoinData = coinData.map( function(coin) {
      let newValues = {...coin}
      if (valueChangeId === coin.id) {
        console.log("Price of the", coin.name, "is", newPrice.typeof);
        newValues.price = newPrice;
      }
      return newValues;
    });
    setCoinData(newCoinData);
  }
  const handleTrade = async (coinId, amount, trade) => {
    const tickerURL = `https://api.coinpaprika.com/v1/tickers/${coinId}`;
    const response = await axios.get(tickerURL);
    const newPrice = Number(response.data.quotes.USD.price).toFixed(3);
    const newCoinData = coinData.map( function(coin) {
      let newValues = {...coin}
      if (coinId === coin.id) {
        newValues.price = newPrice;
        if (trade === true) {
          newValues.coinBalance = newValues.coinBalance + amount/newPrice;
          newValues.coinCashBalane = newValues.coinBalance * newPrice;
          setCashBalance(cashBalance - amount);
          console.log("Coin balance is", newValues.coinBalance, "and cash balance is", newValues.coinCashBalane);
        } else {
          newValues.coinBalance = newValues.coinBalance - amount/newPrice;
          newValues.coinCashBalane = newValues.coinBalance * amount;
          setCashBalance(cashBalance + amount);
          console.log("Coin balance is", newValues.coinBalance, "and cash balance is", newValues.coinCashBalane);
        }
      }
      return newValues;
    }  ); 
    setCoinData(newCoinData);
  } // End of handleTrade

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

  const handleAirdrop = () => {
    setCashBalance(cashBalance + 1200);
  }

  useEffect(() => {
    if ( coinData.length === 0 ) {
      componentDidMount();
    }
  }); 

  return (
    <AppCss>
      <AccountBalanceHeader 
        amount={cashBalance}
        showBalance={showBalance}
        handleHide={handleHide}
        handleAirdrop={handleAirdrop}
      />
      { !coinDetailReveal ? 
        <CoinList 
          calculateBalance={calculateBalance}
          coinData={coinData} 
          handleRefresh={handleRefresh} 
          handleHide={handleHide}
          showBalance={showBalance}
          handleInfo={handleInfo}
          handleTrade={handleTrade} /> 
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
