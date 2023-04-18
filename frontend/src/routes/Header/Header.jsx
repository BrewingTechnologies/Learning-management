import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import Logo from '../../logo.png'
import { userInfo, handleLogout } from '../../utils/authentication'
import { useHistory } from 'react-router-dom'

const Header = () => {


  const history = useHistory();

  const handleLogoutClick = async () => {
    const url = await handleLogout();
    history.replace(url);
  };

  return (
    <Container fluid>
      <Row>
        <Col className='bg-success text-center' >
          <div className='d-flex justify-content-around align-items-center align-content-center p-3 text-white'>
            <div className='d-flex align-items-center' >
              <img height={60} src={Logo} alt="Logo" />
              <h5 className='text-white'>Learning Management</h5>
            </div>
            <h3>Welcome {userInfo.firstName}</h3>
            <Button variant='btn btn-outline-light' onClick={handleLogoutClick}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container >
  )
}

export default Header