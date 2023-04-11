const Boom = require('@hapi/boom');
const CoursesModel = require('../models/course');

const createCourse = async (req) => {
  try {
    return await CoursesModel.create(req.payload);
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
};


const courseDetails = async (req) => {
  try {
    return await CoursesModel.findOne({ _id: req.params.courseId });
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
};

const getAllCourses = async () => {
  try {
    return await CoursesModel.find();
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
}

const findCourseByInstructor = async (req) => {
  try {
    return await CoursesModel.findOne({ instructor: req.params.name })
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
}

const updateCourseDetails = async (req) => {
  try {
    const course = await CoursesModel.findOne({ _id: req.params.courseId });

    if (!course) {
      return Boom.notFound("Course with this id doesn't exists");
    }

    return await CoursesModel.updateOne({ _id: req.params.courseId }, req.payload);
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }

}

const deleteCourse = async (req) => {
  try {

    const course = await CoursesModel.findOne({ _id: req.params.courseId });

    if (!course) {
      return Boom.notFound("Course with this id doesn't exists");
    };

    return await CoursesModel.deleteOne({ _id: req.params.courseId });
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
}


const courseWishList = async (req) => {
  try {
    return await CoursesModel.find({ _id: req.params.userId, bookmark: true });
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
}

const studentEnrolledCourses = async (req) => {
  try {
    return await CoursesModel.find({ _id: req.params.userId, isEnrolled: true });
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
}

module.exports = { createCourse, courseDetails, getAllCourses, findCourseByInstructor, updateCourseDetails, deleteCourse, courseWishList, studentEnrolledCourses };