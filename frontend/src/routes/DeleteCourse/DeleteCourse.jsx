import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteCourse = (props) => {


  const { deleteCourse, courseDelete } = props;


  const handleClose = () => {
    courseDelete(false)
  }

  return (
    <Modal show={deleteCourse} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure.? </Modal.Title>
      </Modal.Header>
      <Modal.Body>You can not undo this operation after delete.</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteCourse;