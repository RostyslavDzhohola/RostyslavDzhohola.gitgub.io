import React from 'react'
import styled from 'styled-components';
import CoinData from '../CoinData/CoinData';
import CoinTweets from '../CoinTweets/CoinTweets';


const Div = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    color: black;
`
const DivRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    height: 100%;
`
const DivDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%; 
    margin: 0 auto;
    color: black;

`

export default function CoinDetails(props) {
    // debugger;
    const handleBackClick = (event) => {
        event.preventDefault();
        props.handleBack(); // click back button to go back to CoinList
    }
    // destructring worked, I just didn't set the state before moving on and thas's why I couldn't use replace() function on a string.
    console.count(" Coin Twitter " + props.coinTwitter);
    const description = props.coinDescription;
    // console.log( " Coin Description is ", description);
    const descriptionFormatted = description.replace(/<a.*?>/g, '').replace(/<\/a>/g, ' ');

    return (
        <> 
            <Div>
                <DivRow>
                    
                    <CoinData 
                        coinDataDetail={props.coinDataDetail}
                        descriptionFormatted={descriptionFormatted}
                        handleBackClick={handleBackClick} />
                    <CoinTweets coinTwitter={props.coinTwitter}/>
                   
                </DivRow>
                {/* <DivDescription>{descriptionFormatted}</DivDescription> */}
            </Div>
        </>
    )
}
