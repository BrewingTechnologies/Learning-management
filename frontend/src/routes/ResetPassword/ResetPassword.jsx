import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Logo from '../../logo.png'
import { resetForgotPassword, updatePassword } from '../../store/apis';
import { ToastContainer, toast } from 'react-toastify';

const ResetPassword = () => {

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    OTP: null,
  });

  const history = useHistory();

  const [submit, setSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  const verifyHandler = async () => {
    setLoading(true)
    const status = await resetForgotPassword(userData.email);
    if (status) {
      toast.success('Password reset OTP sent to your email please check your email...')
      setSubmit(true);
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    toast.success('Your password updated successfully')
    history.push('/')
    await updatePassword(userData);
  }

  if (loading) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center vh-100' >
        <Spinner />
        <h4 className='mt-3'> Loading.... </h4>
      </div>
    )
  }


  const changeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }


  return (
    <>
      <Container fluid >
        <Row>
          <Col className='bg-success text-center p-1 d-flex justify-content-evenly align-items-center align-content-center' >
            <div>
              <img height={60} src={Logo} alt="Logo" />
              <h4 className='text-white' >Learning Management</h4>
            </div>
            <Link className='text-white text-decoration-none' to='/login/:role'>LOGIN</Link>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex flex-column justify-content-center align-items-center align-content-center vh-100' >
            <h4>Enter your registered email</h4>
            <input type="email" disabled={submit} className='form-control w-25 mb-3' onChange={changeHandler} name='email' value={userData.email} placeholder='Enter email...' />
            {submit ? <div>
              <p>Enter your new password and otp</p>
              <input type="number" className='form-control w-100 mb-3' onChange={changeHandler} name='OTP' value={userData.OTP} placeholder='Enter otp...' />
              <input type="password" className='form-control w-100 mb-3' onChange={changeHandler} name='password' value={userData.password} placeholder='Enter new password...' />
            </div> : ''}
            {submit ? <Button variant='outline-primary w-25 mt-3' onClick={handleSubmit} >Submit</Button> : <Button variant='outline-primary w-25 mt-3' onClick={verifyHandler} >Verify</Button>}
          </Col>
        </Row>
      </Container >
      <ToastContainer />
    </>
  )
}

export default ResetPassword