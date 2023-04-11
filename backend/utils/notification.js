const Boom = require('@hapi/boom')
const nodemailer = require('nodemailer');

const sendOTP = async (payload) => {
  try {

    const { email, subject, text } = payload;

    const mailDetails = {
      from: process.env.MAIL,
      to: email,
      subject,
      text
    };
    return await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
      }, tls: {
        rejectUnAuthorized: true
      }
    }).sendMail(mailDetails);
  } catch (error) {
    console.log(error.message);
    return Boom.badRequest(error.message)
  }
};

module.exports = { sendOTP };