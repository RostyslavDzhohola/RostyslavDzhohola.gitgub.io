import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
   border: 2px solid black;
   width: 20vh;
`

export default function Coin (props) {
   const handleClick = (event) => {
      event.preventDefault();
      props.calculateBalance();
      props.handleRefresh(props.id);    // this.props.key is the coin's id 
   }
   
   return (
      <tr>
         <Td>{props.name}</Td>
         <Td>{props.ticker}</Td>
         <Td>${parseFloat(Number(props.price).toFixed(3))}</Td>
         {props.showBalance ? (<Td>{props.balance}</Td>) : (<Td>Hidden</Td>)}
         {/* <Td>{this.props.balance}</Td> */}
         <Td>
            <form action="#" method="POST">
               <button onClick={handleClick}>Refresh</button>
            </form>
         </Td>
      </tr>
   );
}

Coin.propTypes = {
   name: PropTypes.string.isRequired,
   ticker: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired 
}