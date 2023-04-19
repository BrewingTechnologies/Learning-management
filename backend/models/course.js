const mongoose = require('mongoose')

const { Schema } = mongoose

const courseSchema = new Schema(
  {
    name: String,
    category: String,
    description: String,
    price: Number,
    thumbnail: String,
    bookmark: Boolean,
    duration: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
    file: String,
    enrolledStudents: [{ isEnrolled: Boolean, userId: { type: mongoose.Schema.Types.ObjectId, ref: 'student' } }],
    faq: [
      {
        text: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },
        _id: false
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('course', courseSchema)
