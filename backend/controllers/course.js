const Boom = require('@hapi/boom')
const CoursesModel = require('../models/course')

const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true
})

const createCourse = async (req) => {
  try {
    const data = await CoursesModel.create(req.payload)
    return data.populate('user')
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const courseDetails = async (req) => {
  try {
    return await CoursesModel.findOne({ _id: req.params.courseId }).populate(
      'user'
    ).populate({
      path: 'faq',
      populate: {
        path: 'userId',
        model: 'student'
      }
    })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const getAllCourses = async () => {
  try {
    return await CoursesModel.find().populate('user')
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

    return await CoursesModel.updateOne(
      { _id: req.params.courseId },
      req.payload
    )
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
    }

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
    return await CoursesModel.find({
      enrolledStudent: req.params.userId
    }).populate('enrolledStudent')
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
    return await CoursesModel.find({ user: req.params.instructorId }).populate(
      'user'
    )
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const updateCourseEnrollmentOfStundet = async (req) => {
  try {
    const stundet = await CoursesModel.findOne({ _id: req.params.courseId })

    if (!stundet) {
      return Boom.notFound("Student with this id doesn't exists")
    }

    if (req.query.isEnrolled) {
      return await CoursesModel.updateOne(
        { _id: req.params.courseId },
        { $push: { enrolledStudents: { userId: req.params.userId, isEnrolled: true } } }
      )
    }
    return await CoursesModel.updateOne(
      { _id: req.params.courseId },
      { $pull: { enrolledStudents: { userId: req.params.userId } } }
    )
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const addFAQ = async (req) => {
  try {
    return await CoursesModel.findOneAndUpdate(
      { _id: req.params.courseId },
      { $push: { faq: req.payload.data } }
    )
  } catch (error) {
    return Boom.badRequest(error.message)
  }
}

const courseBookmarks = async (req) => {
  try {
    const { isFav } = req.query

    const stundet = await CoursesModel.findOne({ _id: req.params.courseId })

    if (!stundet) {
      return Boom.notFound("Course with this id doesn't exists")
    }

    if (isFav) {
      return await CoursesModel.updateOne(
        { _id: req.params.courseId },
        { enrolledStudent: req.params.userId, bookmark: true }
      )
    }
    return await CoursesModel.updateOne(
      { _id: req.params.courseId },
      { enrolledStudent: req.params.userId, bookmark: false }
    )
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
      folder: 'course-profile'
    }

    const { file } = req.query

    const user = await CoursesModel.findOne({ _id: req.params.courseId })
    if (!user) {
      return Boom.notFound("Course with this Id doesn't exists")
    }

    if (file) {
      return await cloudinary.uploader
        .upload_stream(options, async function (_error, result) {
          await CoursesModel.findByIdAndUpdate(
            { _id: user._id },
            { file: result.url },
            { new: true }
          )
        })
        .end(req?.payload?.file?._data)
    }

    return await cloudinary.uploader
      .upload_stream(options, async function (_error, result) {
        await CoursesModel.findByIdAndUpdate(
          { _id: user._id },
          { thumbnail: result.url },
          { new: true }
        )
      })
      .end(req?.payload?.file?._data)
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

module.exports = {
  createCourse,
  courseDetails,
  getAllCourses,
  findCourseByInstructor,
  updateCourseDetails,
  deleteCourse,
  courseWishList,
  studentEnrolledCourses,
  coursesByCategory,
  getCoursesOfInstructor,
  updateCourseEnrollmentOfStundet,
  courseBookmarks,
  uploadThumbNail,
  addFAQ
}
