var utils = require('./../utils')
  , User = require('./../models').User
  , Promise = require('bluebird');
  
module.exports = (function (token) {
  return new Promise(
    function (resolve, reject) {
      return utils.session.get(token,
        function (error, id) {
          if (error || !id) return reject(error);
          return User.findOne({_id: id}).exec(
            function (error, user) {
              if (error) return reject(error);
              return resolve(user);
            }
          )
        }
      )
    }
  )
});
