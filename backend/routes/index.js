const users = require('./user')
const courses = require('./course')
const serveStatic = require('../routes/staticFile')

module.exports = [
  ...users,
  ...courses,
  ...serveStatic
]
