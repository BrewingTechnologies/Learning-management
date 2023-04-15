import React, { useState, } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../store/apis';
import ResetPassword from '../ResetPassword/ResetPassword';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from '../../logo.png'


const Login = () => {


  //const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const loginHandler = async (e) => {
    e.preventDefault();
    const status = await loginUser(userInfo)
    if (status) {
      //history.push('/app/dashboard')
    }
  }

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
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
            <Link className='text-white text-decoration-none' to='/signup/:role'>SIGNUP</Link>
          </Col>
        </Row>
      </Container>
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
        <div className='d-flex flex-column justify-content-center align-items-center' >
          <p className='mt-3 text-center' >Fogot password..? <Link to='/resetpassword/:role' > Click here </Link> </p>
          {/* <p className='mt-3 text-center'>New member..? please  here</p> */}
        </div>
      </Form>
    </>
  )
}

export default Login;