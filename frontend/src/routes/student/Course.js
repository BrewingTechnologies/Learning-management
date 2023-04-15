import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { handleLogout, userInfo } from "../../utils/authentication";
import { getCourseDetails } from "../../store/apis";

import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../Header/Header';

const Course = (props) => {
  const history = useHistory();
  const match = useRouteMatch("/app/:courseId");
  const { courseId } = match.params;
  const [courseInfo, setCourseInfo] = useState();

  const fetchCourseDetails = async () => {
    const data = await getCourseDetails(courseId);
    setCourseInfo(data);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const handleLogoutClick = async () => {
    const url = await handleLogout();
    history.replace(url);
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col className="d-flex justify-content-around mt-3" >
            <h4>Welcome {userInfo.firstName}</h4>
            <Button variant="outline-danger" onClick={handleLogoutClick}>Logout</Button>
          </Col>
        </Row>
        <Row>
          <Col className="shadow-lg mt-3" >
            {courseInfo?._id ? (
              <div className="text-center mt-3" >
                <h4 className="text-primary" >Course Details</h4>
                <img height={600} width={1200} className="rounded shadow-lg p-2" src={courseInfo.thumbnail} alt='Image' />
                <div className="d-flex justify-content-evenly align-items-center align-content-center mt-3"  >
                  <div>
                    <p>Name : {courseInfo.name}</p>
                    <p>Description : {courseInfo.description}</p>
                  </div>
                  <div>
                    <p>Instructor : {courseInfo.user?.firstName}</p>
                    <p>Category: {courseInfo.category}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>Course deatails not found</div>
            )}</Col>
        </Row>
      </Container>
    </>
  );
};

export default Course;
