const users = require('./user');
const courses = require('./course');

module.exports = [
  ...users,
  ...courses,
];
