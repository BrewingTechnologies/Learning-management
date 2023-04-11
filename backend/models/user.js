const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  authToken: String,
  OTP: Number,
  verified: Boolean,
  role: {
    type: String,
    enum: ['STUDENT', 'ADMIN', 'PROFESSOR'],
  },
});

module.exports = mongoose.model('student', studentSchema);
