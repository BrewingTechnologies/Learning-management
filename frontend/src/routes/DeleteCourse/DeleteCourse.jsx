import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUserCourse } from '../../store/apis';
import { toast } from 'react-toastify';

const DeleteCourse = (props) => {


  const { deleteCourse, courseDelete } = props;

  const handleDelete=async()=>{
    const status = await deleteUserCourse(deleteCourse);
    if(status){
      toast.success('Course deleted successfully..!')
    }
    courseDelete(false,status)
  }


  const handleClose = () => {
    courseDelete(false)
  }

  return (
    <Modal show={!!deleteCourse} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure.? </Modal.Title>
      </Modal.Header>
      <Modal.Body>You can not undo this operation after delete.</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteCourse;