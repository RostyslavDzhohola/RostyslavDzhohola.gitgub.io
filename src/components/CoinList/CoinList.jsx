import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table`
    margin: 50px auto 50px auto;
    display: inline-block;
    font-size: 1.5rem;
    color: black;
`

export default function CoinList(props) {
    return (
        <Table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Chart 24H</th>
                <th>Balance</th>
                <th>Action</th>
            </tr>
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
