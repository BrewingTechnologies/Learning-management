import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Logo from '../../logo.png'

const Header = () => {
  return (
    <Container fluid>
      <Row>
        <Col className='bg-success text-center' >
          <div>
            <img height={60} src={Logo} alt="Logo" />
            <h4 className='text-white' >Learning Management</h4>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Header