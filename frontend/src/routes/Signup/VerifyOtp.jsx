import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { userVerifyOtp } from '../../store/slices/loginReducer';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyOtp = (props) => {


  const state = useSelector((state) => state.auth);


  const history = useHistory();

  const { show, user } = props;

  const dispatch = useDispatch();

  const [verifyUser, setVerifyUser] = useState({
    otp: '',
    userId: ''
  });
  console.log(verifyUser);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userVerifyOtp(verifyUser))
  }

  useEffect(() => {
    if (state?.user?.success && state?.isSuccess) {
      history.push('/')
      toast.success(state?.user?.message);
    }
  }, [state?.user, state?.isSuccess, history]);


  return (
    <Container style={show ? {
      display: 'block', position: 'absolute', top: 0, left: '50%',
      transform: 'translate(-50%, 0)',
      background: 'gray'
    } : { display: 'none' }} >
      <Row>
        <Col sm={12} className='d-flex flex-column justify-content-center align-items-center vh-100' >
          <input onChange={(e) => setVerifyUser({ otp: e.target.value, userId: user })} type="number" className='form-control w-25' placeholder='Please verify your otp....' />
          <Button variant='outline-primary' className='w-25 mt-3' onClick={submitHandler} >Submit</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default VerifyOtp