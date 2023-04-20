import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRole, userInfo } from "../../../utils/authentication";
import {
  fetchAllCourses,
  fetchInstructorCourses,
  deleteUserCourse,
  updateUserBookmark,
} from "../../../store/apis";
import Roles from "../../../config/Roles";
import AddCourse from "../../AddCourse/AddCourse";
import Header from "../../Header/Header";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import DeleteCourse from "../../DeleteCourse/DeleteCourse";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import AddStudent from "../../addStudent/AddStudent";
import GraphCharts from "../../graphCharts/GraphCharts";

const Dashboard = (props) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const [addCourse, setAddCourse] = useState(false);
  const [deleteCourse, setDeleteCourse] = useState(false);

  const [student, setStudent] = useState(false);

  const [revenue, setRevenue] = useState(false);

  const fetchCourses = async () => {
    const role = getRole();
    setLoading(true);
    let dataa = [];
    if (role === Roles.instructor) {
      const { status, data } = await fetchInstructorCourses(userInfo._id);
      if (status) dataa = data;
    } else {
      const { status, data } = await fetchAllCourses();
      if (status) {
        dataa = data;
      }
    }
    dataa.sort(
      (a, b) =>
        a.enrolledStudents?.length || 0 > a.enrolledStudents?.length || 0
    );
    setCourses([...dataa]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deletePopUp = async (courseId, isDeleted) => {
    if (isDeleted) {
      setCourses([...courses.filter((course) => course._id !== deleteCourse)]);
    }
    setDeleteCourse(courseId);
  };

  const handleUpdateBookmark = async ({ courseId, bookmarked }) => {
    const { status } = await updateUserBookmark({
      courseId,
      bookmark: !bookmarked,
    });
    if (status) {
      const index = courses.findIndex((course) => course._id === courseId);
      courses[index].bookmark = !bookmarked;
      setCourses([...courses]);
    }
  };

  const displayCourse = (course) => {
    return (
      <div key={`${course?._id}`}>
        <Card style={{ width: "25rem", margin: "16px" }}>
          <Card.Body>
            <div className='d-flex justify-content-evenly align-items-center'>
              <Card.Title className='text-primary text-center p-2'>
                {course?.name}
              </Card.Title>
              <Card.Title>
                {course?.bookmark ? (
                  <AiFillStar
                    onClick={() => {
                      handleUpdateBookmark({
                        courseId: course?._id,
                        bookmarked: course?.bookmark,
                      });
                    }}
                  />
                ) : (
                  <AiOutlineStar
                    onClick={() =>
                      handleUpdateBookmark({
                        courseId: course?._id,
                        bookmarked: course?.bookmark,
                      })
                    }
                  />
                )}
              </Card.Title>
            </div>
            <Card.Text>Description : {course?.description}</Card.Text>
            <Card.Text>Instructor: {course?.user?.firstName}</Card.Text>
            <Card.Text>Category: {course?.category}</Card.Text>
            {[Roles.admin, Roles.instructor].includes(userInfo.role) && (
              <Card.Text>
                Enrolled: {course.enrolledStudents?.length || 0}
              </Card.Text>
            )}
            <div className='text-center d-flex justify-content-around'>
              <Button
                variant='success'
                onClick={() => {
                  history.push(`/app/${course?._id}`);
                }}
              >
                View Course
              </Button>
              {[Roles.admin, Roles.instructor].includes(userInfo.role) && (
                <Button
                  onClick={() => deletePopUp(course?._id)}
                  variant='danger'
                >
                  Delete Course
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const handlerClose = (isAdd, courseData) => {
    setAddCourse(isAdd);
    if (courseData) {
      setCourses([...courses, courseData]);
    }
  };

  const handlerCloseAddStudent = (data) => {
    setStudent(data);
  };

  const closeGraphBar = (data) => {
    setRevenue(false);
  };

  return (
    <>
      <Header />
      <Container
        style={
          addCourse
            ? { filter: "blur(5px)", backgroundColor: "gray" }
            : student
            ? { filter: "blur(5px)", backgroundColor: "gray" }
            : revenue
            ? { filter: "blur(5px)", backgroundColor: "white" }
            : {}
        }
        fluid
      >
        <Row>
          <Col>
            <div
              className='d-flex  justify-content-end align-items-center mt-3'
              style={{ paddingRight: "10%" }}
            >
              <div className='m-2'>
                {[Roles.admin, Roles.instructor].includes(userInfo.role) && (
                  <Button
                    onClick={() => setAddCourse(true)}
                    variant='outline-primary'
                  >
                    Add Course
                  </Button>
                )}
              </div>
              {Roles.admin === userInfo.role && (
                <Button
                  onClick={() => setStudent(true)}
                  variant='outline-success'
                >
                  {" "}
                  Add Student
                </Button>
              )}
              {[Roles.admin, Roles.instructor].includes(userInfo.role) && (
                <Button
                  className='m-2'
                  variant='outline-info'
                  onClick={() => setRevenue(!revenue)}
                >
                  {" "}
                  View Revenue{" "}
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {!loading && (
              <div className='d-flex  flex-wrap m-5'>
                {courses.map((course) => displayCourse(course))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      {addCourse && <AddCourse handlerClose={handlerClose} />}
      {deleteCourse && (
        <DeleteCourse deleteCourse={deleteCourse} courseDelete={deletePopUp} />
      )}
      {student && (
        <AddStudent handlerCloseAddStudent={handlerCloseAddStudent} />
      )}
      <ToastContainer />
      <div>{revenue && <GraphCharts closeGraphBar={closeGraphBar} />}</div>
    </>
  );
};

export default Dashboard;
