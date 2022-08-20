import React from 'react'
import styled from 'styled-components';
import ChartData from '../Chart/ChartData';

const DivDataView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  height: 100%;
`
const DivHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const DivDetailBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
`
export default function CoinData(props) {
  console.log("coinDataDetail passed to " + props.coinDataDetail.id);
  const coinDetail = props.coinDataDetail;
  //        key: coin.id,
  //       name: coin.name,
  //       image: coin.image,
  //       ticker: coin.symbol,
  //       id: coin.id,
  //       coinBalance: 0,
  //       price: formatPrice(coin.current_price),
  //       priceChange24h: parseFloat(Number(coin.price_change_percentage_24h).toFixed(2)),

  return (
    <DivDetailBody>
      <DivHead>
        <img src={coinDetail.image} alt={coinDetail.name} width="50" height="50" />
        <div>Name: {coinDetail.name}</div>
        
      </DivHead>
      <DivDataView>
        <div>Balance: {coinDetail.coinBalance}</div>
        <div>Price: {coinDetail.price}</div>
        <div>priceChange24h: {coinDetail.priceChange24h}</div>
        <div>
          <ChartData
            name={coinDetail.name}
            id={coinDetail.id}
            priceChange24h={coinDetail.priceChange24h} />
        </div>
        
      </DivDataView>
    </DivDetailBody>
    
  )
}
