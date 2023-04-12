const Boom = require('@hapi/boom')

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const adminRevenue = () => {
  try {
    return randomIntFromInterval(50, 500)
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

const instructorRevenue = async () => {
  try {
    return randomIntFromInterval(100, 1000)
  } catch (error) {
    console.log(error.message)
    return Boom.badRequest(error.message)
  }
}

module.exports = { instructorRevenue, adminRevenue }
