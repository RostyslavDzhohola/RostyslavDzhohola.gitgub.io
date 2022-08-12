import React, { useEffect, useRef } from 'react'
import Chartjs from 'chart.js';
import { historyOptions } from './ChartConfigs';

export default function GraphChart({data}) {       // data is an array of objects with t and y properties
  const chartRef = useRef();                  // this is the reference to the chart
  const day = data; 
  // console.log("day is", day);
  // console.log("chartRef is", chartRef);

  useEffect(() => {                           // useEffect is called when the component is mounted
    if (chartRef && chartRef.current) {       // if the chartRef is defined and has a current value
      new Chartjs(chartRef.current, {         // create a new Chartjs object
        type: 'line',                        // set the type to line chart
        data: {                              // set the data
          datasets: [{                       // set the datasets
            lable: '# of Votes',             // set the label
            data: day,                       // set the data
            borderWidth: 1,                  // set the border width
            borderColor: 'rgba(101, 0, 255, 0.8)', // set the border color
            backgroundColor: 'rgba(101, 0, 255, 0.2)', // set the background color
            pointradius: 0,                  // set the point radius
            hover: false,                    // set the hover to false
          }],
        },
        options: historyOptions,            // set the options
      });
    }
  }, [day]);                      // useEffect is called when the component is mounted if data changes


  return (
    <div>
      <canvas ref={chartRef} id='myChart' width={125} height={30}></canvas>
    </div>
  )
}
