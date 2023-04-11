const Joi = require('joi')
const studentController = require('../controllers/user')

const studentJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('STUDENT', 'ADMIN', 'PROFESSOR')
})

module.exports = [
  {
    method: 'POST',
    path: '/users/user',
    handler: studentController.createStudent,
    options: {
      description: 'Create a user based on role',
      tags: ['api', 'users'],
      validate: {
        payload: studentJoiSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/users/user/{userId}',
    handler: studentController.getStudentDetails,
    options: {
      description: 'Get user details',
      tags: ['api', 'users'],
      auth: { strategy: 'default', scope: ['ADMIN', 'STUDENT', 'PROFESSOR'] },
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/users',
    handler: studentController.getAllStudents,
    options: {
      description: 'Get all users details',
      tags: ['api', 'users'],
      auth: { strategy: 'default', scope: ['ADMIN'] }
    }
  },
  {
    method: 'PUT',
    path: '/users/user/{userId}',
    handler: studentController.updateStudentDetails,
    options: {
      description: 'Update student details',
      tags: ['api', 'users'],
      auth: { strategy: 'default', scope: ['ADMIN', 'STUDENT', 'PROFESSOR'] },
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        }),
        payload: Joi.object({
          firstName: Joi.string(),
          lastName: Joi.string(),
          email: Joi.string(),
          password: Joi.string().min(6)
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/users/user/{userId}',
    handler: studentController.deleteStudent,
    options: {
      description: 'Delete student',
      tags: ['api', 'users'],
      auth: { strategy: 'default', scope: ['ADMIN'] },
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/users/login',
    handler: studentController.studentLogin,
    options: {
      description: 'User login based on role',
      tags: ['api', 'users'],
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/{userId}/verify-otp',
    handler: studentController.verifyOtp,
    options: {
      description: 'Verify user',
      tags: ['api', 'users'],
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        }),
        payload: Joi.object({
          OTP: Joi.number().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/resend-otp/{userId}',
    handler: studentController.resendOtp,
    options: {
      description: 'Re-send OTP',
      tags: ['api', 'users'],
      validate: {
        params: Joi.object({
          userId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/forgot-password-otp',
    handler: studentController.sendOtpForForgotPassword,
    options: {
      description: 'forgot password OTP',
      tags: ['api', 'users'],
      validate: {
        payload: Joi.object({
          email: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/update-password',
    handler: studentController.updateNewPassword,
    options: {
      description: 'update new password',
      tags: ['api', 'users'],
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
          OTP: Joi.number().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/users/guest-login',
    handler: studentController.guestLogin,
    options: {
      description: 'guest user login',
      tags: ['api', 'users']
    }
  }
]
