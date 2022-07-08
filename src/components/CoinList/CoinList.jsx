import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table`
    margin: 50px auto 50px auto;
    display: inline-block;
    font-size: 1.5rem;
`

export default function CoinList(props) {
    return (
        <Table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Price</th>
                <th>Balance</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            { 
                props.coinData.map(({key, name, ticker, id, price, balance}) => 
                    <Coin   key={key} 
                            name={name} 
                            ticker={ticker}
                            balance={balance}
                            price={price}
                            id={id}
                            showBalance={props.showBalance}
                            calculateBalance={props.calculateBalance}
                            handleRefresh={props.handleRefresh} />
                )
            }
            </tbody>
        </Table>
    )
}
