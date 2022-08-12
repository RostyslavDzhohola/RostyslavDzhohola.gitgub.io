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
const COIN_COUNT = 30;
const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App(props) {
  const [cashBalance, setCashBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [coinDetailReveal, setCoinDetailReveal] = useState(false);
  const [coinDetail, setCoinDetail] = useState();
  // const [coinBuySellAmount, setCoinBuySellAmount] = useState(0);

  const componentDidMount = async () => {
    calculateBalance();

    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets',{
      params: {
        vs_currency: 'usd',
        ids: ''
      }
    });
    const coinData = response.data.slice(0, COIN_COUNT).map(function (coin) {
      return {
        key: coin.id,
        name: coin.name,
        image: coin.image,
        ticker: coin.symbol,
        id: coin.id,
        coinBalance: 0,
        price: formatPrice(coin.current_price),
        priceChange24h: parseFloat(Number(coin.price_change_percentage_24h).toFixed(2)),
      };
    });
    setCoinData( coinData );
    // const tickerURL = 'https://api.coinpaprika.com/v1/tickers/';
    // const promises = coinIDs.map(id => axios.get(tickerURL + id));
    // const coinData = await Promise.all(promises);
    // const coinPriceData = coinData.map( function(response) {
    //   const coin = response.data;
    //   return {
    //     key: coin.id,
    //     name: coin.name,
    //     ticker: coin.symbol,
    //     id: coin.id,
    //     coinBalance: 0,
    //     price: coin.quotes.USD.price,
    //   }
    // });
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

  // const calculateEachCoinBalance = () => {
  //   const newCoinData = coinData.map(function(coin){
  //     let newValues = {...coin};
  //     const coinCashBalane = coin.price * coin.coinBalance;
  //     newValues.coinCashBalane = coinCashBalane;
  //     return newValues;
  //   })
  //   setCoinData(newCoinData);
  // }

  const handleHide = () => {
    setShowBalance(!showBalance);
    console.log(showBalance);
  }

  const handleCoinPriceRquest = async (coinId) => {
    const tickerURL = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const response = await axios.get(tickerURL);
    // console.log( "Response data is " ,response.data );  --> Checking if the response is correct
    const newPrice = response.data.market_data.current_price.usd; 
    console.log("New price for ", coinId, " is ", newPrice); // --> Checking if the new price is correct
    return newPrice;
  }
    
  const handleRefresh = async (valueChangeId) => {
    const newPrice = await handleCoinPriceRquest(valueChangeId);
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

  const handleBuy = async (coinId, amount) => {
    console.log("Coin id is ", coinId);
    let success;
    if (amount <= cashBalance) {
      const newPrice = await handleCoinPriceRquest(coinId);
      const newCoinData = coinData.map( function(coin) {
        let newValues = {...coin}
        if (coinId === coin.id) {
          newValues.price = newPrice;
          newValues.coinBalance = newValues.coinBalance + amount/newPrice;
          const newCashBalance = cashBalance - amount;
          setCashBalance(newCashBalance);
          console.log("Coin balance is", newValues.coinBalance);
        }
        return newValues;
      }); 
      setCoinData(newCoinData);
      success = true;
    } else {
      console.log("You don't have enough cash");
      alert("You don't have enough cash");
      success = false;
    }
    return success;
  }

  const handleSell = async (coinId, amount) => {
    let success;
    const newPrice = await handleCoinPriceRquest(coinId);
    const newCoinData = coinData.map( function(coin) {
      let newValues = {...coin}
      if (coinId === coin.id) {
        if (amount/newPrice < coin.coinBalance) {
          newValues.price = newPrice;
          newValues.coinBalance = newValues.coinBalance - amount/newPrice;
          const newCashBalance = cashBalance + amount;
          setCashBalance(newCashBalance);
          console.log("Coin balance is", newValues.coinBalance);
          success = true;
        } else {
          console.log("Not enough", coin.name, "to sell");
          alert("Not enough " + coin.name +  " to sell");
          success = false;
        }
      }
      return newValues;
    }); 
    setCoinData(newCoinData);
    return success;
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
          handleBuy={handleBuy}
          handleSell={handleSell} /> 
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
