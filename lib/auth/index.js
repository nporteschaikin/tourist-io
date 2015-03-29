var facebook = require('./facebook')
  , session = require('./session')
  , Models = require('./../models')
  , utils = require('./../utils')
  , _ = require('lodash');

exports.facebook = function (accessToken, response) {
  return facebook(accessToken, authCallback(response), onError(response));
};

exports.session = function (sessionToken, response) {
  return session(sessionToken, authCallback(response), onError(response));
};

var authCallback = function (response) {
  return function (attributes, updateAttributes) {
    return Models.User.findOne(attributes).exec(
      function (error, user) {
        if (!user) {
          if (attributes._id) return utils.response.unauthorized(response);
          return Models.User.create(_.merge(attributes, updateAttributes),
            function (error, user) {
              return onAuth(user, response);
            }
          );
        }
        return user.set(attributes).save(
          function (error, user) {
            return onAuth(user, response);
          }
        );
      }
    )
  }
}

var onAuth = function (user, response) {
  return utils.session.set(user._id,
    function (error, key) {
      return response.status(200).send({
        sessionToken: key,
        user: user
      });
    }
  );
}

var onError = function (response) {
  return function () {
    return utils.response.unauthorized(response);
  }
}
