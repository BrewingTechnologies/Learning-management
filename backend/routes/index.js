const users = require('./user')
const courses = require('./course')
const serveStatic = require('../routes/staticFile')
const revenue = require('./revenue')

module.exports = [
  ...users,
  ...courses,
  ...serveStatic,
  ...revenue
]
