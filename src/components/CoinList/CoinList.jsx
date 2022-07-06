import React, { Component } from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table`
    margin: 50px auto 50px auto;
    display: inline-block;
    font-size: 1.5rem;
`

export default class CoinList extends Component {
    render() {
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
                    this.props.coinData.map(({key, name, ticker, price, balance}) => 
                        <Coin   key={key} 
                                name={name} 
                                ticker={ticker}
                                balance={balance}
                                price={price}
                                buttonState={this.props.buttonState}
                                calculateBalance={this.props.calculateBalance}
                                handleRefresh={this.props.handleRefresh} />
                    )
                }
                </tbody>
            </Table>
        )
  }
}
