import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    width: 50%;
    font: bold;
    font-size: 2.4rem;
    position: absolute;
    left: 15%;
    text-align: left;
    padding: 1.5 rem 0 1.5rem 5rem;
    border-bottom: 1px solid black;
`;

export default class AccountBalance extends Component {
    render() {
        return (
        <Section>
            Balance: ${this.props.amount}
        </Section>
        );
    }
}


AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
 }