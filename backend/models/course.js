const mongoose = require('mongoose')

const { Schema } = mongoose

const courseSchema = new Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  thumbnail: String,
  instructor: String,
  bookmark: Boolean,
  startDate: Date,
  endDate: Date,
  isEnrolled: Boolean,
  intructor: { type: mongoose.Schema.Types.ObjectId, ref: 'student' }
})

module.exports = mongoose.model('course', courseSchema)
