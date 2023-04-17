import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { handleLogout, userInfo } from "../../utils/authentication";
import { getCourseDetails } from "../../store/apis";

import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../Header/Header";
import Roles from "../../config/Roles";

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

  const enrollHandler = () => {};

  return (
    <>
      <Header />
      <Container>
        {Roles.student === userInfo.role && (
          <Row>
            <Col className='d-flex justify-content-end mt-3'>
              <Button onClick={enrollHandler} variant='outline-success'>
                Enroll
              </Button>
            </Col>
          </Row>
        )}

        <Row>
          <Col className='shadow-lg mt-3'>
            {courseInfo?._id ? (
              <div className='text-center mt-3'>
                <h4 className='text-primary'>Course Details</h4>
                {courseInfo.thumbnail && (
                  <img
                    height={300}
                    width={500}
                    className='rounded shadow-lg p-2'
                    src={courseInfo.thumbnail}
                    alt='Thumbnail'
                  />
                )}
                <div className='d-flex justify-content-evenly align-items-center align-content-center mt-3'>
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
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Course;
