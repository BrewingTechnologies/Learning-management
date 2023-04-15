const mongoose = require('mongoose')

const { Schema } = mongoose

const courseSchema = new Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  thumbnail: String,
  bookmark: Boolean,
  duration: String,
  isEnrolled: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'student' }
}, {
  timestamps: true
})

module.exports = mongoose.model('course', courseSchema)
