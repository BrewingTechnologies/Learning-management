import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify'
import { addStudentByAdmin } from '../../store/apis';

const AddStudent = (props) => {

  const { handlerCloseAddStudent } = props;

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STUDENT'
  })

  const submitHandler = async () => {
    const status = await addStudentByAdmin(student);

    if (status) {
      toast.success('student added successfully..!!')
      handlerCloseAddStudent(false)
    }
  }


  const changeHandler = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }
  const closeHandler = () => {
    handlerCloseAddStudent(false);
  }


  return (
    <Form style={styles} className='d-flex flex-column justify-content-center align-items-center' >
      <h4 className='text-center text-primary'>Add Student</h4>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First name</Form.Label>
        <Form.Control onChange={changeHandler} type="text" value={student.firstName} name='firstName' placeholder="Enter first name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control onChange={changeHandler} name='lastName' type="text" value={student.lastName} placeholder="Enter last name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={changeHandler} name='email' type="email" value={student.email} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={changeHandler} name='password' type="password" value={student.password} placeholder="Enter password" />
      </Form.Group>

      <div>
        <Button variant="outline-success" onClick={submitHandler}>
          Add
        </Button>
        <Button className='m-2' variant="outline-danger" onClick={closeHandler}>
          Close
        </Button>
      </div>
      <ToastContainer />
    </Form>
  )
}


const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  height: '550px',
  width: '800px',
  borderRadius: '20px',
  backgroundColor: '#461057',
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  color: '#fff'
}

export default AddStudent;