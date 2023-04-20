import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { userInfo } from "../../utils/authentication";
import { ToastContainer, toast } from "react-toastify";
import {
  enrollCourse,
  getCourseDetails,
  sendMessage,
  uploadFile,
} from "../../store/apis";

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
    const { status, data } = await getCourseDetails(courseId);
    const isEnrolled = !!(data.enrolledStudents || []).find(
      (x) => x.isEnrolled && x.userId === userInfo._id
    );
    setCourseInfo({ ...data, isEnrolled });
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const enrollHandler = async () => {
    const { status, data } = await enrollCourse(
      courseId,
      !courseInfo.isEnrolled
    );
    if (status) {
      setCourseInfo({ ...courseInfo, isEnrolled: !courseInfo.isEnrolled });
      toast.success(
        `Course ${
          courseInfo.isEnrolled ? "withdrawn" : "enrolled"
        } successfully..!`
      );
    } else {
      toast.error(data);
    }
  };

  const handleSendMessage = async () => {
    const { status, data } = await sendMessage(courseId, message);
    if (status) {
      courseInfo.faq.push({ text: message, userId: userInfo._id });
      setCourseInfo({ ...courseInfo });
      setMessage("");
    } else {
      toast.error(data);
    }
  };

  const handleFileUpload = async (e, isFile) => {
    const file = e.target.files[0];
    const fileInfo = new FormData();
    fileInfo.append("file", file);
    const { status, data } = await uploadFile({
      courseId: courseInfo._id,
      isFile,
      file: fileInfo,
    });
    if (status) {
      toast.success("File uploaded successfully..!");
    } else {
      toast.error(data);
    }
  };

  return (
    <>
      <Header />
      <Container>
        {courseInfo?._id && (
          <Row>
            <Col className='d-flex justify-content-end mt-3'>
              {Roles.student === userInfo.role ? (
                <Button onClick={enrollHandler} variant='outline-success'>
                  {courseInfo.isEnrolled ? "Withdraw" : "Enroll"}
                </Button>
              ) : (
                <>
                  <label htmlFor='uploadFiles'>
                    <input
                      style={{ display: "none" }}
                      type='file'
                      accept={".pdf"}
                      id='uploadFiles'
                      onChange={(e) => handleFileUpload(e, true)}
                    />
                    <Button
                      style={{ "pointer-events": "none", margin: "0px 8px" }}
                    >
                      Upload Files
                    </Button>
                  </label>
                  <label htmlFor='thumbnail'>
                    <input
                      style={{ display: "none" }}
                      type='file'
                      accept='image/png, image/gif, image/jpeg'
                      id='thumbnail'
                      onChange={(e) => handleFileUpload(e, false)}
                    />
                    <Button
                      style={{ "pointer-events": "none", margin: "0px 8px" }}
                    >
                      Upload Thumbnail
                    </Button>
                  </label>
                </>
              )}
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
                  <div className='p-3 rounded-2 shadow-lg m-3'>
                    <p>{que.text}</p>
                    <p style={{ color: "gray" }}> {que.userId?.firstName} </p>
                  </div>
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
