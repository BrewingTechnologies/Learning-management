import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { handleLogout, userInfo } from "../../utils/authentication";
import { getCourseDetails } from "../../store/apis";

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
    <div>
      <div className='d-flex justify-content-between m-25'>
        <h1>Welcom {userInfo.firstName}</h1>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
      {courseInfo?._id ? (
        <div>
          <div>{courseInfo.name}</div>
          <div>{courseInfo.description}</div>
          <div>{courseInfo.instructor}</div>
          <div>{courseInfo.category}</div>
        </div>
      ) : (
        <div>Course deatails not found</div>
      )}
    </div>
  );
};

export default Course;
