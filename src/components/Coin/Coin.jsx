import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import info from  './info.png';
import { useState } from 'react';
import ChartData from '../Chart/ChartData';
import TradeForm from './TradeForm';


const Td = styled.td`
   width: 35vh;
   height: 10vh;
`
const TdCoinName = styled.td`
   width: 45vh;
`
const TdHidden = styled.td`
   ${'' /* border: 2px solid black; */}
   height: 10vh;
   width: 35vh;
   font-size: 1.5rem;
`
// TdChart is a temprorary component that will be replaced by a Chart component
const TdChart = styled.td`     
   ${'' /* border: 2px solid black; */}
`
const TrCoin = styled.tr`
   border-top: 1px solid black;
   border-bottom: 1px solid black;

`

const Div = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   font-size: 3vh;
   font-weight: bold;
`
const DivBalance = styled.div`
   display: flex;
   flex-direction: column;
   width: 35vh;
   font-size: 1.2rem;
   height: 9vh;
`
const DivCryptoBalance = styled.div`
   margin: 5px 0px 5px 0px; 
   font-size: 0.8em;
   font-weight: bold;
   height: 9vh;
`

const Img = styled.img`
   align-self: center;
   height: 1.5rem;
   border-radius: 1rem;
   &:hover {
      transform: scale(1.1);
      background-color: rgba(255, 74, 38, 0.8);
   }
   
`
// const Button = styled.button`
// `
const Form = styled.form`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`
// const ImgGraph = styled.img`
// `
// const DivTicker = styled.div`
//    display: flex;
//    align-items: center;
//    font-size: 0.8rem;
//    font-weight: bold;
// `

export default function Coin (props) {
   const [coinInput, setCoinInput] = useState(0);
   
   const handleInfoClick = (event) => {
      event.preventDefault();
      props.handleInfo(props.id);
   }
   const handleChange = (event) => {
      event.preventDefault();
      setCoinInput(event.target.value);
   }
   const handleBuy = async (event) => {
      event.preventDefault();
      const sucess = await props.handleBuy(props.id, Number(coinInput));
      if (sucess) {
         setCoinInput(0);
      }
   }
   const handleSell = async (event) => {
      event.preventDefault();
      const success = await props.handleSell(props.id, Number(coinInput));
      if (success) {
         setCoinInput(0);
      }
   }

   return (
      <TrCoin>
         <TdCoinName>
            <Div>
               <button onClick={handleInfoClick}>
                  <img 
                     src={props.image} 
                     alt={props.name}
                     className='w-10 h-10'  />
               </button>
               <button onClick={handleInfoClick}>
                  <p className='hover:scale-110'>{props.name} </p>
               </button>
               <button>
                  <Img src={info} alt="info" onClick={handleInfoClick}/>
               </button>
            </Div>
         </TdCoinName>
         <Td>${parseFloat(Number(props.price).toFixed(3))}</Td>
         <TdChart><ChartData
               name={props.name}
               id={props.id}
               priceChange24h={props.priceChange24h} />
         </TdChart>
         {props.showBalance ? (
            <Td>
               <DivBalance>
                  <div >${ Number(props.coinBalance * props.price).toFixed(2)}</div>
                  <DivCryptoBalance>{parseFloat(Number(props.coinBalance).toFixed(5))} {props.ticker.toUpperCase()}</DivCryptoBalance>
               </DivBalance>
            </Td>) : (<TdHidden>Hidden</TdHidden>)}

         <Td>
            <Form action="#" method="POST">
               <button
                  type="button"
                  onClick={handleBuy}
                  className="inline-flex items-center px-3 mx-1 py-1.5 border border-green-300 text-xs font-medium rounded-full shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
               >
                  BUY
               </button>
               <TradeForm
                  handleChange={handleChange}
                  coinInput={coinInput}
               />
               <button
                  type="button"
                  onClick={handleSell}
                  className="inline-flex items-center px-3 mx-1 py-1.5 border border-red-300 text-xs font-medium rounded-full shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
               >
                  SELL
               </button>
            </Form>
         </Td>
      </TrCoin>
   );
}

Coin.propTypes = {
   name: PropTypes.string.isRequired,
   ticker: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   coinBalance: PropTypes.number.isRequired,
}