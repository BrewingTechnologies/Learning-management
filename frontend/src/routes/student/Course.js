import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { handleLogout, userInfo } from "../../utils/authentication";
import { getCourseDetails } from "../../store/apis";

import { Container, Row, Col, Button } from 'react-bootstrap';

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
    <Container>
      <Row>
        <Col className="d-flex justify-content-around mt-3" >
          <h1>Welcome {userInfo.firstName}</h1>
          <Button variant="outline-primary" onClick={handleLogoutClick}>Logout</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {courseInfo?._id ? (
            <div>
              <div>Name : {courseInfo.name}</div>
              <div>Description : {courseInfo.description}</div>
              <div>Instructor : {courseInfo.instructor}</div>
              <div>Category: {courseInfo.category}</div>
            </div>
          ) : (
            <div>Course deatails not found</div>
          )}</Col>
      </Row>
    </Container>
  );
};

export default Course;
