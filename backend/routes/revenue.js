
const revenueController = require('../controllers/revenue')

module.exports = [
  {
    method: 'GET',
    path: '/revenue/admin',
    handler: revenueController.adminRevenue,
    options: {
      description: 'Monthly Admin revenue',
      tags: ['api', 'revenue'],
      auth: { strategy: 'default', scope: ['ADMIN'] }
    }
  },
  {
    method: 'GET',
    path: '/revenue/instructor',
    handler: revenueController.instructorRevenue,
    options: {
      description: 'Monthly instructor revenue',
      tags: ['api', 'revenue'],
      auth: { strategy: 'default', scope: ['INSTRUCTOR'] }
    }
  }
]
