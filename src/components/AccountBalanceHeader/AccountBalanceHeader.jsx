import logo from './Egg.png';
import styled from 'styled-components';
import HideToggle from './HideToggle';

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
  width: 33rem;
  font: bold;
  font-size: 1.2rem;
    ${'' /* width: 50%;
    position: absolute;
    left: 15%;
    text-align: left;
    padding: 1.5 rem 0 1.5rem 5rem;
    border-bottom: 1px solid black; */}
`;


export default function AccountBalanceHeader(props) {
  const handleAirdrop = (event) => {
    event.preventDefault();
    props.handleAirdrop();
  }
  
  return (
      <Header  className='px-10 bg-gradient-to-r from-cyan-500 to-blue-700'>
        <a href="https://www.boredelonunicorn.club/" target="_blank" rel="noreferrer">
          <Img src={logo} alt="My logo" ></Img>
        </a>
        <Section>
          <div className='px-5'>
            Crypto Balance
            <div>
              {props.showBalance ? 
                ( <>${Number(props.cryptoBalance).toFixed(2)} </>)
                : 
                ( <>Hidden</>)
              }
            </div>

          </div>
          <div className='px-5'>
            <div>Cash Balance </div>
            <div>
              
              {props.showBalance ?
                (<> ${Number(props.amount).toFixed(2)}</>)
                : 
                ( <>Hidden</>) 
              }
            </div>
          </div>
          <div className='flex flex-col justify-around'>
            <HideToggle handleHide={props.handleHide}/>
          </div>
          <div className='flex flex-col justify-around'>
            <button 
              type='button'
              onClick={handleAirdrop}
              className="inline-flex items-center rounded border border-cyan-300   select-none bg-emerald-500 px-2.5 py-1.5 h-6 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 hover:scale-110 active:scale-100" >Airdrop</button>
          </div>
        </Section>
      </Header>
      
  )
  
}
