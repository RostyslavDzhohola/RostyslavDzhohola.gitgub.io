import React, { useEffect, useState } from 'react';
import GraphChart from './GraphChart';
import axios from 'axios';


export default function ChartData(props) {
  const [chartData, setChartData] = useState([]);  // this is the data that will be displayed on the chart
  const [isLoading, setIsLoading] = useState(true); // this is the loading indicator

  const formatData = (data) => { // format data for Chart.js
    return data.map(el => { // el is each element in the array
      return {
        t: el[0], // timestamp
        y: el[1]  // price
      }
    })
  }

  
  
  useEffect(() => { // useEffect is called when the component is mounted

    const getChartData = async () => {          // get the data from the server
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart/`, { 
        params: {                       // pass the parameters
          vs_currency: 'usd',
          days: '1',
        },
      });
      setChartData(formatData(response.data.prices)); // set the data for the chart
      setIsLoading(false); // set the loading indicator to false
    }

    getChartData(); // get the data from the server
  }, [props.id]); // useEffect is called when the component is mounted if props.id changes


  return (
    <>
    { isLoading 
      ? ( <div>Loading...</div> )
      : ( <GraphChart data={chartData}/> ) 
    }
    </>
  )
}
