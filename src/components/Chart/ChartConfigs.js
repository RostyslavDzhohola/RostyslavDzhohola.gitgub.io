export const historyOptions = {

  legend: {
          display: false,
  },
  
  gridLines: {
      display: false,
  },

  maintainAspectRatio: false,
  responsive: false,
  hover: false,

  scales: {
      xAxes: [
          {
          type: 'time',
          distribution: 'linear',
          display: false,
          }
      ],
      yAxes: [
          {
          display: false,
          }
      ]
  },
}