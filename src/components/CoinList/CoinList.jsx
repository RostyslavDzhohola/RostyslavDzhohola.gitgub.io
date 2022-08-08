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
                <th>Graph</th>
                <th>Balance</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            { 
                props.coinData.map(({key, name, ticker, id, price, coinBalance}) => 
                    <Coin   key={key} 
                            name={name} 
                            ticker={ticker}
                            coinBalance={coinBalance}
                            price={Number(price)}
                            id={id}
                            showBalance={props.showBalance}
                            calculateBalance={props.calculateBalance}
                            handleRefresh={props.handleRefresh}
                            handleInfo={props.handleInfo}
                            handleTrade={props.handleTrade} />
                )
            }
            </tbody>
        </Table>
    )
}
