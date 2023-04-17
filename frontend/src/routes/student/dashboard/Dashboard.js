import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRole, userInfo } from "../../../utils/authentication";
import {
  fetchAllCourses,
  fetchInstructorCourses,
  deleteUserCourse,
  updateUserBookmark
} from "../../../store/apis";
import Roles from "../../../config/Roles";
import AddCourse from "../../AddCourse/AddCourse";
import Header from "../../Header/Header";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import DeleteCourse from "../../DeleteCourse/DeleteCourse";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Dashboard = (props) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const [addCourse, setAddCourse] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState(false);

  const fetchCourses = async () => {
    const role = getRole();
    setLoading(true);
    let data = [];
    if (role === Roles.instructor) {
      data = await fetchInstructorCourses(userInfo._id);
    } else {
      data = await fetchAllCourses();
    }
    setCourses([...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deletePopUp = async () => {
    setDeleteCourse(true);
    // await deleteCourse();
  };

  const handleUpdateBookmark = async ({ courseId, bookmarked }) => {
    await updateUserBookmark({ courseId, bookmark: !bookmarked })
  }

  const displayCourse = (course) => {
    return (
      <div key={`${course._id}`}>
        <Card style={{ width: "25rem", margin: "16px" }}>
          <Card.Body>
            <div className="d-flex justify-content-evenly align-items-center" >
              <Card.Title className='text-primary text-center p-2'>
                {course.name}
              </Card.Title>
              <Card.Title>
                {course.bookmark ? <AiFillStar onClick={() => { handleUpdateBookmark({ courseId: course._id, bookmarked: course.bookmark }) }} /> : <AiOutlineStar onClick={() => handleUpdateBookmark({ courseId: course._id, bookmarked: course.bookmark })} />}
              </Card.Title>
            </div>
            <Card.Text>Description : {course.description}</Card.Text>
            <Card.Text>Instructor: {course.user?.firstName}</Card.Text>
            <Card.Text>Category: {course.category}</Card.Text>
            <div className='text-center d-flex justify-content-around'>
              <Button
                variant='success'
                onClick={() => {
                  history.push(`/app/${course._id}`);
                }}
              >
                View Course
              </Button>
              {[Roles.admin, Roles.instructor].includes(userInfo.role) && (
                <Button onClick={deletePopUp} variant='danger'>
                  Delete Course
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const handlerClose = (data) => {
    setAddCourse(data);
  };

  const courseDelete = (data) => {
    setDeleteCourse(data);
  };

  return (
    <>
      <Header />
      <Container
        style={
          addCourse ? { filter: "blur(5px)", backgroundColor: "gray" } : {}
        }
        fluid
      >
        <Row>
          <div className='text-end'>
            {[Roles.admin, Roles.instructor].includes(userInfo.role) && (
              <Button
                className='m-5'
                onClick={() => setAddCourse(true)}
                variant='outline-primary'
              >
                Add Course
              </Button>
            )}
          </div>
        </Row>
        <Row>
          <Col>
            {!loading && (
              <div className='d-flex justify-content-center flex-wrap'>
                {courses.map((course) => displayCourse(course))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      {addCourse && <AddCourse handlerClose={handlerClose} />}
      {deleteCourse && (
        <DeleteCourse deleteCourse={deleteCourse} courseDelete={courseDelete} />
      )}
    </>
  );
};

export default Dashboard;
