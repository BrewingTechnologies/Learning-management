const Boom = require('@hapi/boom')
const CoursesModel = require('../models/course')

const cloudinary = require('cloudinary')

const createCourse = async (req) => {
  try {
    return await CoursesModel.create(req.payload)
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const courseDetails = async (req) => {
  try {
    return await CoursesModel.findOne({ _id: req.params.courseId })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const getAllCourses = async () => {
  try {
    return await CoursesModel.find()
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const findCourseByInstructor = async (req) => {
  try {
    return await CoursesModel.findOne({ user: req.params.name })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const updateCourseDetails = async (req) => {
  try {
    const course = await CoursesModel.findOne({ _id: req.params.courseId })

    if (!course) {
      return Boom.notFound("Course with this id doesn't exists")
    }

    return await CoursesModel.updateOne({ _id: req.params.courseId }, req.payload)
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const deleteCourse = async (req) => {
  try {
    const course = await CoursesModel.findOne({ _id: req.params.courseId })

    if (!course) {
      return Boom.notFound("Course with this id doesn't exists")
    };

    return await CoursesModel.deleteOne({ _id: req.params.courseId })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const courseWishList = async (req) => {
  try {
    return await CoursesModel.find({ user: req.params.userId, bookmark: true })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const studentEnrolledCourses = async (req) => {
  try {
    return await CoursesModel.find({ user: req.params.userId, isEnrolled: true })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const coursesByCategory = async (req) => {
  try {
    return await CoursesModel.find({ category: req.payload.category })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const getCoursesOfInstructor = async (req) => {
  try {
    return await CoursesModel.find({ user: req.params.instructorId }).populate('user')
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const updateCourseEnrollmentOfStundet = async (req) => {
  try {
    const { isEnrolled } = req.query

    const stundet = await CoursesModel.findOne({ user: req.params.userId })

    if (!stundet) {
      return Boom.notFound("Student with this id doesn't exists")
    }

    if (isEnrolled) {
      return await CoursesModel.updateOne({ user: req.params.userId }, { isEnrolled: true })
    }
    return await CoursesModel.updateOne({ user: req.params.userId }, { isEnrolled: false })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const courseBookmarks = async (req) => {
  try {
    const { isfav } = req.query

    const stundet = await CoursesModel.findOne({ user: req.params.userId })

    if (!stundet) {
      return Boom.notFound("Student with this id doesn't exists")
    }

    if (isfav) {
      return await CoursesModel.updateOne({ user: req.params.userId }, { bookmark: true })
    }
    return await CoursesModel.updateOne({ user: req.params.userId }, { bookmark: false })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const uploadThumbNail = async (req) => {
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'course'
    }

    let fileData
    const course = await CoursesModel.findOne({ _id: req.params.courseId })
    if (!course) {
      return Boom.notFound("User with this Id doesn't exists")
    }

    await cloudinary.uploader.upload_stream(options, async (_err, image) => {
      fileData = await CoursesModel.findByIdAndUpdate({ _id: course._id }, { thumbnail: image.url }, { new: true })
    }).end(req?.payload?.file?._data)
    return fileData
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

module.exports = { createCourse, courseDetails, getAllCourses, findCourseByInstructor, updateCourseDetails, deleteCourse, courseWishList, studentEnrolledCourses, coursesByCategory, getCoursesOfInstructor, updateCourseEnrollmentOfStundet, courseBookmarks, uploadThumbNail }
