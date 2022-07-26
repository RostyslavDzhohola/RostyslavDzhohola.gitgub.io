import logo from './Egg.png';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  background-color: #282c34;
  min-height: 20vh;
  align-items: space-between;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
`
// const H1 = styled.h1`
//   font-size: 5rem;
// `
const Img = styled.img`
  height: 8rem;
  pointer-events: none;
`

const Section = styled.section`
  display: flex;
  flex-direction: raw;
  justify-content: space-between;
  width: 18rem;
  font: bold;
  font-size: 1.2rem;
    ${'' /* width: 50%;
    position: absolute;
    left: 15%;
    text-align: left;
    padding: 1.5 rem 0 1.5rem 5rem;
    border-bottom: 1px solid black; */}
`;

const Button = styled.button`
    ${'' /* background-color: #A6FFB5;
    font-weight: bold;
    font-size: 1rem;
    position: absolute;
    margin-top: 1.5rem;
    left: 100%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    align: right; */}
    

`;
export default function AccountBalanceHeader(props) {
  const handleClick = (event) => {
    event.preventDefault();
    props.handleHide();       
  }

  const handleAirdrop = (event) => {
    event.preventDefault();
    props.handleAirdrop();
  }

  const buttonText = props.showBalance ? 'Hide' : 'Show';
  
  return (
      <Header>
        <Img src={logo} alt="My logo"/>
        <Section>
          <>Total Balance: </>
          {props.showBalance && (<> ${(props.amount).toFixed(2)}</>)}
          <Button onClick={handleClick}>{buttonText}</Button>
          <Button onClick={handleAirdrop}>Airdrop</Button>
        </Section>
      </Header>
      
  )
  
}
