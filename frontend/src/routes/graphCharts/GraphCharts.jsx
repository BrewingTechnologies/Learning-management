import React from 'react'
import BarChart from 'react-bar-chart';
import { Button } from 'react-bootstrap';


const GraphCharts = (props) => {

  const { closeGraphBar } = props;

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


  const closeHandler = () => {
    closeGraphBar();
  }

  return (
    <div style={styles} >
      <h4>Graphs</h4>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <BarChart ylabel='Revenue'
          width={700}
          height={500}
          margin={margin}
          data={data}
        />
      </div>
      <Button variant='outline-danger' onClick={closeHandler} >Close</Button>
    </div>
  )
}


const styles = {
  borderRadius: '20px',
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  textAlign: 'center',
  backgroundColor:'#f0f0f0',
  padding: '6rem',
}

export default GraphCharts;