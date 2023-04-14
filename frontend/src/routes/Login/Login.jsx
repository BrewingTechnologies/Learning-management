import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { userLogin, reset } from '../../store/slices/loginReducer';

const Login = () => {

  const { user, isLoading, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory()

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(userInfo))
  }

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (isSuccess || user) {
      history.push('/')
    }

    dispatch(reset())
  }, [user, isSuccess, message,, dispatch])


  return (
    <Form className='d-flex flex-column justify-content-center align-items-center vh-100' >
      <h3 className='mb-5' >Please Login here</h3>
      <Form.Group className="mb-3 w-25" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={handleChange} name='email' value={userInfo.email} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3 w-25" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleChange} name='password' value={userInfo.password} type="password" placeholder="Password" />
      </Form.Group>
      <Button className='w-25' onClick={loginHandler} variant="outline-primary">
        LOGIN
      </Button>

      <p className='mt-3 text-center'>New member..? please <Link to='/signup/:role'>signup</Link> here</p>
    </Form>
  )
}

export default Login;