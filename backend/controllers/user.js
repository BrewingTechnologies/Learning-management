const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomOtp = require('random-otp-generator');
const StudentsModel = require('../models/user');

const { sendOTP } = require('../utils/notification');

const createStudent = async (req) => {
  try {
    const user = new StudentsModel(req.payload);
    const encryptedPassword = await bcrypt.hash(req.payload.password, 10);
    user.password = encryptedPassword
    const otp = randomOtp();

    const { email } = req.payload;

    const subject = `VERIFY YOUR OTP`;

    const text = `
    Please verify your one time password(OTP).
    Your OTP is : ${otp}. Do not share with anyone.
    `
    const mailResponse = await sendOTP({ email, subject, text });
    if (mailResponse.accepted) {
      user.OTP = otp;
      return await user.save();
    }
    return mailResponse;
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
};

const getStudentDetails = async (req) => {
  try {
    return await StudentsModel.findById(req.params.userId);
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
};

const getAllStudents = async () => StudentsModel.find();

const updateStudentDetails = async (req) => {
  try {
    return await StudentsModel.findOneAndUpdate({ _id: req.params.userId }, req.payload);
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
};

const deleteStudent = async (req) => {
  try {
    return await StudentsModel.findOneAndDelete({ _id: req.params.userId });
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
};

const studentLogin = async (req) => {
  try {
    const { email, password } = req.payload;
    const student = await StudentsModel.findOne({ email: req.payload.email });

    if (!student) {
      return Boom.forbidden("User with this email doesn't exists");
    }
    if (student.email === email && await bcrypt.compare(password, student.password)) {
      const token = jwt.sign({ user: student._id }, 'secret', { expiresIn: '1d' });
      return await StudentsModel.findByIdAndUpdate({ _id: student._id }, { authToken: token }, { new: true });
    }
    return Boom.notAcceptable('Oops.!! Invalid Credentials, Please provide the valid details');
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
};

const verifyOtp = async (req) => {
  try {
    let user;
    user = await StudentsModel.findOne({ _id: req.params.userId });
    if (!user) {
      return Boom.notFound("User with this user id doesn't exists");
    }
    user = JSON.parse(JSON.stringify(user));
    if (user.OTP === req.payload.OTP) {
      await StudentsModel.updateOne({ _id: req.params.studentId }, { verified: true });
      return { success: true, message: 'OTP Verified successfully' }

    }
    return Boom.notAcceptable("Invalid OTP, Please enter valid OTP to continue..!");
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message);
  }
};


const resendOtp = async (req) => {
  try {
    let user;
    user = await StudentsModel.findOne({ email: req.payload.email });
    if (user.verified === true) {
      const err = Boom.conflict("User with this email already registered.!");
      err.output.payload.status = user.verified
      return err;
    }
    user = JSON.parse(JSON.stringify(user));

    const otp = randomOtp();

    const subject = `VERIFY YOUR OTP`;

    const text = `
    Please verify your one time password(OTP).
    Your OTP is : ${otp}. Do not share with anyone.
    `

    const response = await sendOTP({ email: req.payload.email, subject, text })

    if (response.accepted) {
      return await StudentsModel.findByIdAndUpdate({ _id: user._id }, { OTP: otp }, { new: true });
    };
    return { success: false, message: 'Unable to resend OTP, Please try again' }
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message)
  }
};


module.exports = {
  createStudent, getStudentDetails, updateStudentDetails, deleteStudent, getAllStudents, studentLogin, verifyOtp, resendOtp
};
