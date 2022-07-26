import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import info from  './info.png';

const Td = styled.td`
   border: 2px solid black;
   width: 25vh;
`
const Div = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`
const Img = styled.img`
   height: 1.5rem;
   border-radius: 1rem;
   &:hover {
      transform: scale(1.1);
      background-color: green;
   }
   
`
const Button = styled.button`
`
const Form = styled.form`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`
const ImgGraph = styled.img`
`

export default function Coin (props) {
   const handleClick = (event) => {
      event.preventDefault();
      props.calculateBalance();
      props.handleRefresh(props.id);    // this.props.key is the coin's id 
   }
   const handleInfoClick = (event) => {
      event.preventDefault();
      props.handleInfo(props.name);
   }
   
   return (
      <tr>
         <Td>
            <Div>
               <>{props.name}</>
               <Img src={info} alt="info" onClick={handleInfoClick}/>
            </Div>
         </Td>
         <Td>{props.ticker}</Td>
         <Td>${parseFloat(Number(props.price).toFixed(3))}</Td>
         <Td><ImgGraph alt="graph"/></Td>

         {props.showBalance ? (<Td>{props.balance}</Td>) : (<Td>Hidden</Td>)}

         <Td>
            <Form action="#" method="POST">
               <Button onClick={handleClick}>Buy</Button>
               $
               <input  type="number" min="0" placeholder={0} name="price"/>
               <Button onClick={handleClick}>Sell</Button>
            </Form>
         </Td>
      </tr>
   );
}

Coin.propTypes = {
   name: PropTypes.string.isRequired,
   ticker: PropTypes.string.isRequired,
   price: PropTypes.number.isRequired 
}