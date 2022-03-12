import React, { useState } from 'react';
import './Coin.css';
import PropTypes from 'prop-types';

export default function Coin2(props) {
    const [name, setName ] = useState(); 
    const [ticker, setTicker ] = useState();
    const [price, setPrice ] = useState();

    return (
        <tr className="coin-row">
            <td>{this.props.name}</td>
            <td>{this.props.ticker}</td>
            <td>${this.state.price}</td>
            <td>
               <form action="#" method="POST">
                  <button onClick={this.handleClick}>Refresh</button>
               </form>
            </td>
        </tr>
    );
}