import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRole, handleLogout, userInfo } from "../../../utils/authentication";
import { fetchAllCourses, fetchInstructorCourses, deleteCourse } from "../../../store/apis";
import Roles from "../../../config/Roles";
import AddCourse from "../../AddCourse/AddCourse";
import Header from '../../Header/Header';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import DeleteCourse from "../../DeleteCourse/DeleteCourse";



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

  const handleLogoutClick = async () => {
    const url = await handleLogout();
    history.replace(url);
  };

  const deletePopUp = () => {
    setDeleteCourse(true);
  }

  const displayCourse = (course) => {
    return (
      <div
        role='presentation'
        onClick={() => {
          history.push(`/app/${course._id}`);
        }}
        key={`${course._id}`}
      >
        <Card style={{ width: '25rem', marginTop: '10px' }}>
          <Card.Body>
            <Card.Title className="text-primary text-center p-2" >Course Details</Card.Title>
            <Card.Text>Name: {course.name}</Card.Text>
            <Card.Text>Description : {course.description}</Card.Text>
            <Card.Text>Instructor:  {course.user?.firstName}</Card.Text>
            <Card.Text>Category:  {course.category}</Card.Text>
            <div className="text-center d-flex justify-content-around" >
              <Button variant="success">View Course</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const handlerClose = (data) => {
    setAddCourse(data);
  }

  const courseDelete = (data) => {
    setDeleteCourse(data);
  }



  return (
    <>
      <Header />
      <Container style={addCourse ? { filter: 'blur(5px)', backgroundColor: "gray" } : {}} fluid >
        <Row>
          <Col>
            <div className='d-flex justify-content-around align-items-center align-content-center'>
              <h4 className="mt-3" >Welcome {userInfo.firstName}</h4>
              <Button variant="outline-danger" onClick={handleLogoutClick}>Logout</Button>
            </div>
          </Col>
          <div className="text-center" >
            <Button className="m-5" onClick={() => setAddCourse(true)} variant="outline-primary">Add Course</Button>
            <Button onClick={deletePopUp} variant="danger">Delete Course</Button>
          </div>
        </Row>
        <Row>
          <Col>
            {!loading && (
              <div className="d-flex justify-content-around flex-wrap" >
                {courses.map((course) => displayCourse(course))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      {addCourse && <AddCourse handlerClose={handlerClose} />}
      {deleteCourse && <DeleteCourse deleteCourse={deleteCourse} courseDelete={courseDelete} />}
    </>
  );
};

export default Dashboard;
