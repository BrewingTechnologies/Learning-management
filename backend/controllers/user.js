const Boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const randomOtp = require('random-otp-generator')
const StudentsModel = require('../models/user')
const cloudinary = require('cloudinary').v2

const { sendOTP } = require('../utils/notification')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true
})

const createStudent = async (req) => {
  try {
    const existingUser = await StudentsModel.findOne({ email: req.payload.email })

    if (existingUser && !existingUser.verified) {
      const err = Boom.conflict('User with this email already exists..!')
      err.output.payload._id = existingUser._id
      return err
    }

    const user = new StudentsModel(req.payload)
    const encryptedPassword = await bcrypt.hash(req.payload.password, 10)
    user.password = encryptedPassword
    const otp = randomOtp()

    const { email } = req.payload

    const subject = 'VERIFY YOUR OTP'

    const text = `
    Please verify your one time password(OTP).
    Your OTP is : ${otp}. Do not share with anyone.
    `
    const mailResponse = await sendOTP({ email, subject, text })
    if (mailResponse.accepted) {
      user.OTP = otp
      return await user.save()
    }
    return mailResponse
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const getStudentDetails = async (req) => {
  try {
    return await StudentsModel.findById(req.params.userId)
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const getAllStudents = async () => StudentsModel.find()

const updateStudentDetails = async (req) => {
  try {
    return await StudentsModel.findOneAndUpdate({ _id: req.params.userId }, req.payload)
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const deleteStudent = async (req) => {
  try {
    return await StudentsModel.findOneAndDelete({ _id: req.params.userId })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const studentLogin = async (req) => {
  try {
    const { email, password } = req.payload
    const student = await StudentsModel.findOne({ email: req.payload.email })

    if (!student) {
      return Boom.forbidden("User with this email doesn't exists")
    }
    if (student.email === email && await bcrypt.compare(password, student.password)) {
      const token = jwt.sign({ user: student._id }, 'secret', { expiresIn: '1d' })
      return await StudentsModel.findOneAndUpdate({ _id: student._id }, { authToken: token }, { new: true }).select(['-OTP', '-password', '-verified', '-__v'])
    }
    return Boom.notAcceptable('Oops.!! Invalid Credentials, Please provide the valid details')
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const verifyOtp = async (req) => {
  try {
    let user
    user = await StudentsModel.findOne({ _id: req.params.userId })
    if (!user) {
      return Boom.notFound("User with this user id doesn't exists")
    }
    user = JSON.parse(JSON.stringify(user))
    if (user.OTP === req.payload.OTP) {
      if (user.verified) {
        return Boom.notAcceptable('You are already verified your OTP')
      }
      await StudentsModel.updateOne({ _id: req.params.userId }, { verified: true })
      return { success: true, message: 'OTP Verified successfully' }
    }

    return Boom.notAcceptable('Invalid OTP, Please enter valid OTP to continue..!')
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const resendOtp = async (req) => {
  try {
    let user
    user = await StudentsModel.findOne({ _id: req.params.userId })
    if (user.verified === true) {
      const err = Boom.conflict('User with this email already verified.!')
      err.output.payload.status = user.verified
      return err
    }
    user = JSON.parse(JSON.stringify(user))

    const otp = randomOtp()

    const subject = 'VERIFY YOUR OTP'

    const text = `
    Please verify your one time password(OTP).
    Your OTP is : ${otp}. Do not share with anyone.
    `

    const response = await sendOTP({ email: req.payload.email, subject, text })

    if (response.accepted) {
      return await StudentsModel.findByIdAndUpdate({ _id: user._id }, { OTP: otp }, { new: true })
    };
    return { success: false, message: 'Unable to resend OTP, Please try again' }
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const sendOtpForForgotPassword = async (req) => {
  try {
    const user = await StudentsModel.findOne({ email: req.payload.email })
    if (!user) {
      return Boom.notFound('User with this email not found')
    }

    const otp = randomOtp()

    const { email } = req.payload

    const subject = 'VERIFY YOUR OTP'

    const text = `
    Please verify your one time password(OTP).
    Your OTP is : ${otp}. Do not share with anyone.
    `
    const mailResponse = await sendOTP({ email, subject, text })
    if (mailResponse.accepted) {
      return StudentsModel.updateOne({ email: req.payload.email }, { OTP: otp })
    }
    return { success: false, message: 'Failed to send an OTP' }
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const updateNewPassword = async (req) => {
  try {
    const user = await StudentsModel.findOne({ email: req.payload.email })
    if (!user) {
      return Boom.notFound('User with this email not found')
    }

    if (user.OTP === req.payload.OTP) {
      const encryptedPassword = await bcrypt.hash(req.payload.password, 10)
      return await StudentsModel.updateOne({ _id: user._id }, { password: encryptedPassword })
    }
    return { success: false, message: 'Invalid OTP , Please enter valid OTP.' }
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const guestLogin = async (req) => {
  try {
    const token = jwt.sign({ user: 'GUEST' }, 'secret', { expiresIn: '30m' })
    return { role: 'GUEST', token }
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const addStudentByAdmin = async (req) => {
  try {
    const student = await StudentsModel.findOne({ email: req.payload.email })

    if (student) {
      return Boom.conflict('Student with this email already exists')
    }

    if (req.payload.role !== 'STUDENT') {
      return Boom.notAcceptable('You dont have access to create another user')
    }
    return await createStudent({ payload: req.payload })
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const uploadUserProfilePic = async (req) => {
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'user-profile'
    }

    const user = await StudentsModel.findOne({ _id: req.params.userId })
    if (!user) {
      return Boom.notFound("User with this Id doesn't exists")
    }
    return await cloudinary.uploader.upload_stream(options, async (_err, image) => {
      await StudentsModel.findByIdAndUpdate({ _id: user._id }, { profilePhoto: image.url }, { new: true })
    }).end(req?.payload?.file?._data)
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

module.exports = {
  createStudent, getStudentDetails, updateStudentDetails, deleteStudent, getAllStudents, studentLogin, verifyOtp, resendOtp, sendOtpForForgotPassword, updateNewPassword, guestLogin, addStudentByAdmin, uploadUserProfilePic
}
