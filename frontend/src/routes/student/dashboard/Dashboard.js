import React, { useEffect, useState } from "react";
import { userInfo } from "../../../utils/authentication";
import { fetchAllCourses } from "../../../store/apis";

const Dashboard = (props) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    const data = await fetchAllCourses();
    setCourses([...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const displayCourse = (course) => {
    return <div>{course.name}</div>;
  };

  return (
    <div>
      <div className='d-flex justify-content-between m-25'>
        <h1>Welcom {userInfo.firstName}</h1>
        <button>Logout</button>
      </div>
      {!loading && <div>{courses.map((course) => displayCourse(course))}</div>}
    </div>
  );
};

export default Dashboard;
