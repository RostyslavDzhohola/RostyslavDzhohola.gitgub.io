import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table`
    border-collapse: collapse;
    margin: 50px 40px 50px 40px;
    display: inline-block;
    font-size: 1.5rem;
    color: black;
    border-top: 1px solid black;
`
const TrRow = styled.tr`
    border-top: 1px solid black;
    border-bottom: 1px solid black;
`
export default function CoinList(props) {
    return (
        <Table>
            <thead>
            <TrRow>
                <th>Name</th>
                <th>Price</th>
                <th>Chart 24H</th>
                <th>Balance</th>
                <th>Action</th>
            </TrRow>
            </thead>
            <tbody>
            { 
                props.coinData.map(({key, name, ticker, id, price, image, coinBalance}) => 
                    <Coin   key={key} 
                            name={name} 
                            ticker={ticker}
                            coinBalance={coinBalance}
                            price={Number(price)}
                            id={id}
                            image={image}
                            priceChange24h={props.priceChange24h}

                            showBalance={props.showBalance}
                            handleInfo={props.handleInfo}
                            handleBuy={props.handleBuy}
                            handleSell={props.handleSell} />
                )
            }
            </tbody>
        </Table>
    )
}
