import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRole, handleLogout, userInfo } from "../../../utils/authentication";
import { fetchAllCourses, fetchInstructorCourses } from "../../../store/apis";
import Roles from "../../../config/Roles";

const Dashboard = (props) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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

  const displayCourse = (course) => {
    return (
      <div
        role='presentation'
        onClick={() => {
          history.push(`/app/${course._id}`);
        }}
        key={`${course._id}`}
        style={{ border: "1px solid black", margin: 12, padding: 12 }}
      >
        <div>{course.name}</div>
        <div>{course.description}</div>
        <div>{course.instructor}</div>
        <div>{course.category}</div>
      </div>
    );
  };

  return (
    <div>
      <div className='d-flex justify-content-between m-25'>
        <h1>Welcom {userInfo.firstName}</h1>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
      {!loading && (
        <div className='d-flex'>
          {courses.map((course) => displayCourse(course))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
