import React from 'react'
import BarChart from 'react-bar-chart';

const GraphCharts = () => {

  const data = [
    { text: 'Jan', value: 100 },
    { text: 'Feb', value: 300 },
    { text: 'Mar', value: 250 },
    { text: 'Apr', value: 450 },
    { text: 'May', value: 150 },
    { text: 'Jun', value: 100 },
    { text: 'Jul', value: 350 },
    { text: 'Aug', value: 100 },
    { text: 'Sep', value: 85 },
    { text: 'Oct', value: 260 },
    { text: 'Nav', value: 320 },
    { text: 'Dec', value: 480 },
  ];


  const margin = { top: 20, right: 20, bottom: 30, left: 40 };


  return (
    <div  >
      <h4>Graphs</h4>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <BarChart ylabel='Revenue'
          width={500}
          height={500}
          margin={margin}
          data={data}
        />
      </div>
    </div>
  )
}

export default GraphCharts;