import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddCourse = (props) => {

  const { handlerClose } = props

  const [course, setCourse] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    user: '',
    duration: '',
  })


  const submitHandler = () => {
    console.log(course);
  }


  const changeHandler = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    })
  }


  const closeHandler = () => {
    handlerClose(false);
  }


  return (
    <Form style={styles} className='d-flex flex-column justify-content-center align-items-center' >
      <h4 className='text-center text-primary'>Add Course</h4>
      <Form.Group className="mb-3" controlId="courseName">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={changeHandler} type="text" value={course.name} name='name' placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control onChange={changeHandler} name='category' type="text" value={course.category} placeholder="Enter category" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control onChange={changeHandler} name='description' type="text" value={course.description} placeholder="Enter description" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control onChange={changeHandler} name='price' type="number" value={course.price} placeholder="Enter price" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="duration">
        <Form.Label>Duration</Form.Label>
        <Form.Control onChange={changeHandler} name='duration' type="text" value={course.duration} placeholder="Enter duration" />
      </Form.Group>

      <div>
        <Button variant="outline-success" onClick={submitHandler}>
          Add
        </Button>
        <Button className='m-2' variant="outline-danger" onClick={closeHandler}>
          Close
        </Button>
      </div>
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


export default AddCourse