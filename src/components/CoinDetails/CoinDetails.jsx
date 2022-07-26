import React from 'react'
import styled from 'styled-components';
import CoinNews from '../CoinNews/CoinNews';
import CoinTweets from '../CoinTweets/CoinTweets';

const Div = styled.div`
    display: flex;  
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 97%;
    height: 100%;
    border: 1px solid black;
    margin: 0 auto;
    color: black;
    
`

export default function CoinDetails(props) {
    const handleBackClick = (event) => {
        event.preventDefault();
        props.handleInfo(); // click back button to go back to CoinList
    }
  return (
    <>
        <button type="button" onClick={handleBackClick}>To Coinlist</button>
        <Div>
            <CoinNews />
            <> I display coin  = {props.coinDetail}</>
            <CoinTweets />
        </Div>
    </>
  )
}
