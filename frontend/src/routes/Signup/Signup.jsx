import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux'
import { userSignup, reset } from '../../store/slices/loginReducer';
import { ToastContainer, toast } from 'react-toastify';
import VerifyOtp from './VerifyOtp';
import { Spinner, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../logo.png'


const Signup = () => {

  const { user, isLoading, isSuccess, message, isError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const [signup, setSignup] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  })

  const handleChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value
    })
  }


  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(userSignup(signup))
  }


  const userId = user ? user : localStorage.getItem('user');

  useEffect(() => {

    if (user && isSuccess) {
      setShow(true);
      toast.success('Please check your email for OTP....')
    }

    if (isError && message) {
      toast.error(message)
    };
  }, [user, isSuccess, isError, message])


  if (isLoading) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center vh-100' >
        <Spinner />
        <h4 className='mt-3'> Loading.... </h4>
      </div>
    )
  }

  return (
    <>
      <div style={show ? { filter: 'blur(2px)', backgroundColor: "gray" } : { display: '' }} >
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
        </Container >
        <Form className='d-flex flex-column justify-content-center align-items-center vh-100' >
          <h3 className='mb-5' >Please signup here</h3>
          <Form.Group className="mb-3 w-25 " controlId="firstname">
            <Form.Label>First name</Form.Label>
            <Form.Control value={signup.firstName} name='firstName' onChange={handleChange} type="text" placeholder="Enter first name" />
          </Form.Group>

          <Form.Group className="mb-3 w-25 " controlId="lastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control value={signup.lastName} name='lastName' onChange={handleChange} type="text" placeholder="Enter Last name" />
          </Form.Group>

          <Form.Group className="mb-3 w-25 " controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control value={signup.email} name='email' onChange={handleChange} type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3 w-25 " controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control value={signup.password} name='password' onChange={handleChange} type="password" placeholder="Enter password" />
          </Form.Group>

          <Form.Select onChange={handleChange} name='role' value={signup.role} className='w-25 mb-3'>
            <option >Select your role</option>
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>

          <Button className='w-25' onClick={clickHandler} variant="outline-primary">
            SIGNUP
          </Button>
        </Form>
      </div >
      <VerifyOtp show={show} userId={userId?._id} />
      <ToastContainer />
    </>
  )
}

export default Signup;