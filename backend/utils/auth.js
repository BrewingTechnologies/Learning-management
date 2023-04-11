const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');

const checkAccess = () => {
  return {
    authenticate: async function (request, h) {
      const authorization = request?.headers?.authorization;
      if (!authorization) {
        throw Boom.unauthorized("Authorization token is missing");
      }
      const decodeToken = jwt.decode(authorization);
      const user = await UserModel.findOne({ _id: decodeToken.user });
      if (!user) {
        return Boom.notFound("User with this id user id doesn't exists");
      }
      const currentTime = Date.now();
      const expiryTime = decodeToken.exp * 1000;
      const isValid = expiryTime > currentTime;
      if (!isValid) {
        return Boom.unauthorized('Token Expired');
      }
      return h.authenticated({ credentials: { isValid, scope: [user.role] } });
    }
  }
};
module.exports = { checkAccess };
