import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { handleLogout, userInfo } from "../../utils/authentication";
import { ToastContainer, toast } from "react-toastify";
import { enrollCourse, getCourseDetails, sendMessage } from "../../store/apis";

import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../Header/Header";
import Roles from "../../config/Roles";

const Course = (props) => {
  const history = useHistory();
  const match = useRouteMatch("/app/:courseId");
  const { courseId } = match.params;
  const [courseInfo, setCourseInfo] = useState();
  const [message, setMessage] = useState("");

  const fetchCourseDetails = async () => {
    const data = await getCourseDetails(courseId);
    setCourseInfo(data);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const enrollHandler = async () => {
    const status = await enrollCourse(courseId, !courseInfo.isEnrolled);
    if (status) {
      setCourseInfo({ ...courseInfo, isEnrolled: !courseInfo.isEnrolled });
      toast.success(
        `Course ${
          courseInfo.isEnrolled ? "withdrawn" : "enrolled"
        } successfully..!`
      );
    } else {
      toast.error("Try Again");
    }
  };

  const handleSendMessage = async () => {
    const status = await sendMessage(courseId, message);
    if (status) {
      courseInfo.faq.push({ text: message, userId: userInfo._id });
      setCourseInfo({ ...courseInfo });
      setMessage("");
    } else {
      toast.error("Try Again");
    }
  };

  return (
    <>
      <Header />
      <Container>
        {Roles.student === userInfo.role && courseInfo?._id && (
          <Row>
            <Col className='d-flex justify-content-end mt-3'>
              <Button onClick={enrollHandler} variant='outline-success'>
                {courseInfo.isEnrolled ? "Withdraw" : "Enroll"}
              </Button>
            </Col>
          </Row>
        )}

        <Row>
          <Col className='shadow-lg mt-3 mb-3'>
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
          {courseInfo?._id &&
            (courseInfo.isEnrolled || Roles.student !== userInfo.role) && (
              <Col className='shadow-lg m-3 p-3'>
                <h3>FAQ</h3>
                {courseInfo.faq.map((que) => (
                  <div className='p-3 rounded-2 shadow-lg m-3'>{que.text}</div>
                ))}
                <div className='form-group d-flex align-items-end justify-content-between m-3'>
                  <textarea
                    className='form-control rounded-1 m3'
                    id='exampleFormControlTextarea2'
                    rows='3'
                    cols='10'
                    value={message || ""}
                    placeholder='Type your query here...'
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></textarea>
                  <Button
                    className='m-3'
                    disabled={(message || "").trim().length < 5}
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </div>
              </Col>
            )}
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Course;
