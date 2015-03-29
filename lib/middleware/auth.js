var utils = require('./../utils');

module.exports = (function () {

  var auth = function (request, response, next) {
    var token = request.query.token;
    return utils.auth(token).then(
      function (user) {
        if (user) request.user = user;
        return next();
      }
    ).catch(
      function () {
        return next();
      }
    )
  }

  auth.verify = function (request, response, next) {
    if (!request.user) return response.status(400).end();
    return next();
  };

  return auth;

}());
