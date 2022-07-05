import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
   border: 2px solid black;
   width: 20vh;
`

export default class Coin extends Component {
   // constructor(props) {
   //    super(props);
   //    this.handleClick = this.handleClick.bind(this);
   // }
  
   handleClick = (event) => {
      event.preventDefault();
      this.props.calculateBalance();
      this.props.handleRefresh(this.props.ticker);     
   }
     
   render() {
      return (
         <tr>
            <Td>{this.props.name}</Td>
            <Td>{this.props.ticker}</Td>
            <Td>${(this.props.price).toFixed(3)}</Td>
            {this.props.buttonState ? (<Td>{this.props.balance}</Td>) : (<Td>Hidden</Td>)}
            {/* <Td>{this.props.balance}</Td> */}
            <Td>
               <form action="#" method="POST">
                  <button onClick={this.handleClick}>Refresh</button>
               </form>
            </Td>
         </tr>
      );
   }
}

Coin.propTypes = {
   name: PropTypes.string.isRequired,
   ticker: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired 
}