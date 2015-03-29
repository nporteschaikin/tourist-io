var Models = require('./../models')
  , redis = require('./../redis')
  , middleware = require('./../middleware')
  , utils = require('./../utils');

module.exports = (function (app) {

  app.get('/tours',
    function (request, response) {
      return Models.Tour.find()
        .populate('user')
        .exec(utils.response.onCompletion(response));
    }
  )

  app.get('/tours/near',
    function (request, response) {
      return Models.Tour.findNear(request.query.latitude, request.query.longitude, 30 * 1609.34)
        .populate('user')
        .exec(utils.response.onCompletion(response));
    }
  )

  app.post('/tours', middleware.auth, middleware.auth.verify,
    function (request, response) {
      return Models.Tour.create(utils.tours.params(request),
        utils.response.onCompletion(response));
    }
  )

});
