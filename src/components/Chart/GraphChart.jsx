import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto';
import { historyOptions } from './ChartConfigs';

export default function GraphChart({data}) {       // data is an array of objects with t and y properties
  const chartRef = useRef();                  // this is the reference to the chart
  const day = data; 

  useEffect(() => {                           // useEffect is called when the component is mounted
    if (chartRef && chartRef.current) {       // if the chartRef is defined and has a current value
      new Chart(chartRef.current, {         // create a new Chartjs object
        type: 'line',                        // set the type to line chart
        data: {                              // set the data
          datasets: [{                       // set the datasets
            lable: 'Price',                  // set the label
            data: day,                       // set the data
            borderWidth: 1,                  // set the border width
            borderColor: '#777',             // set the border color
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
      <canvas ref={chartRef} id='myChart' width={125} height={30} />
    </div>
  )
}
