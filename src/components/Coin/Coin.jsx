import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import info from  './info.png';
import { useState } from 'react';

const Td = styled.td`
   border: 2px solid black;
   width: 25vh;
`
const TdCoinName = styled.td`
   width: 30vh;
   border: 2px solid black;
`
const TdHidden = styled.td`
   border: 2px solid black;
   height: 0vh;
   width: 35vh;
   font-size: 2.4rem;
`
const Div = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   font-size: 3vh;
   font-weight: bold;
`
const DivTickerBox = styled.div`
   display: flex;
   flex-direction: row;
   font-style: italic;
`
const DivBalance = styled.div`
   display: flex;
   flex-direction: column;
   width: 30vh;
   font-size: 1.2rem;
`
const Img = styled.img`
   align-self: center;
   height: 1.5rem;
   border-radius: 1rem;
   &:hover {
      transform: scale(1.1);
      background-color: green;
   }
   
`
const Button = styled.button`
`
const Form = styled.form`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`
const ImgGraph = styled.img`
`
const DivTicker = styled.div`
   display: flex;
   align-items: center;
   font-size: 0.8rem;
   font-weight: bold;
`

export default function Coin (props) {
   const [coinInput, setCoinInput] = useState(0);
   // const handleClick = (event) => {
   //    event.preventDefault();
   //    props.handleRefresh(props.id);    // this.props.key is the coin's id 
   // }
   const handleInfoClick = (event) => {
      event.preventDefault();
      props.handleInfo(props.ticker);
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
      <tr>
         <TdCoinName>
            <Div>
               {props.name} 
               <DivTickerBox>
                  <DivTicker>{props.ticker}</DivTicker>
                  <Img src={info} alt="info" onClick={handleInfoClick}/>
               </DivTickerBox>
            </Div>
         </TdCoinName>
         <Td>${parseFloat(Number(props.price).toFixed(3))}</Td>
         <Td><ImgGraph alt="graph"/></Td>
         {props.showBalance ? (
            <Td>
               <DivBalance>
                  <div>${ Number(props.coinBalance * props.price).toFixed(2)}</div>
                  <div>{parseFloat(Number(props.coinBalance).toFixed(5))} {props.ticker}</div>
               </DivBalance>
            </Td>) : (<TdHidden>Hidden</TdHidden>)}

         <Td>
            <Form action="#" method="POST">
               <Button onClick={handleBuy}>Buy</Button>
               $
               <input   
                  type="number" 
                  min="0" 
                  placeholder={0} 
                  name="price"
                  onChange={handleChange}
                  value={coinInput}
                  />
               <Button onClick={handleSell}>Sell</Button>
            </Form>
         </Td>
      </tr>
   );
}

Coin.propTypes = {
   name: PropTypes.string.isRequired,
   ticker: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired,
   coinBalance: PropTypes.number.isRequired,
}