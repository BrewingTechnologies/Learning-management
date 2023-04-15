import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { userVerifyOtp } from '../../store/slices/loginReducer';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyOtp = (props) => {


  const state = useSelector((state) => state.auth);


  const history = useHistory();

  const { show, userId } = props;


  const dispatch = useDispatch();

  const [verifyUser, setVerifyUser] = useState({
    otp: '',
    userId: ''
  });
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userVerifyOtp(verifyUser))
  }

  useEffect(() => {
    if (state?.user?.success && state?.isSuccess) {
      history.push('/dashboard')
      toast.success(state?.user?.message);
    }
  }, [state?.user, state?.isSuccess, history]);


  return (
    <Container style={show ? styles : { display: 'none' }} >
      <Row>
        <Col sm={12} className='d-flex flex-column justify-content-evenly align-items-center' >
          <h4 className='text-white mb-4' >Verify otp</h4>
          <input onChange={(e) => setVerifyUser({ otp: e.target.value, userId })} type="number" className='form-control' placeholder='Please verify your otp....' />
          <Button variant='outline-success' className='w-100 mt-3' onClick={submitHandler} >Submit</Button>
        </Col>
      </Row>
    </Container>
  )
}

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  height: '400px',
  width: '800px',
  borderRadius: '20px',
  backgroundColor: '#21122e',
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, 0)',
}


export default VerifyOtp