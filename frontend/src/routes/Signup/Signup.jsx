import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux'
import { userSignup, reset } from '../../store/slices/loginReducer';


const Signup = () => {

  const { user, isLoading, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();


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


  return (
    <Form className='d-flex flex-column justify-content-center align-items-center vh-100' >
      <h3 className='mb-5' >Pleas signup here</h3>
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
  )
}

export default Signup;