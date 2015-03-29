exports.params = function (request) {
  var body = request.body
    , user = request.user;
  return {
    user: user._id,
    name: body.name,
    pins: body.pins,
    description: body.description
  }
};
