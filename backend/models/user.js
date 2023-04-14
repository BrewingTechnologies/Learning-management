const mongoose = require('mongoose')

const { Schema } = mongoose

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  authToken: String,
  OTP: Number,
  verified: Boolean,
  profilePhoto: String,
  role: {
    type: String,
    enum: ['STUDENT', 'ADMIN', 'INSTRUCTOR']
  }
})

module.exports = mongoose.model('student', studentSchema)
