import React from 'react'
import styled from 'styled-components';
import ChartData from '../Chart/ChartData';

const DivDataView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
`
const DivHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`
const DivDetailBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`
export default function CoinData(props) {
  console.log("coinDataDetail passed to " + props.coinDataDetail.id);
  const coinDetail = props.coinDataDetail;

  return (
    <DivDetailBody>
      <DivHead>
        <img 
          src={coinDetail.image} 
          alt={coinDetail.name} 
          width="50" height="50"
          className='mx-2' />
        <div className='font-medium text-3xl '> {coinDetail.name}</div>
        <button 
          type="button" 
          onClick={props.handleBackClick}
          className=" flex-initial rounded border border-transparent bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
          Back
        </button>
      </DivHead>
      <DivDataView>
        <div>Balance: {coinDetail.coinBalance}</div>
        <div>Price: ${coinDetail.price}</div>
        <div>24h: { parseFloat(Number(coinDetail.priceChange24h).toFixed(2))}%</div>
        <div>
          <ChartData
            name={coinDetail.name}
            id={coinDetail.id}
            priceChange24h={coinDetail.priceChange24h} />
        </div>
        
      </DivDataView>
      <p className='border-t-2 border-black mt-2 pt-2 text-justify'>
        {props.descriptionFormatted}
      </p>
    </DivDetailBody>
    
  )
}
