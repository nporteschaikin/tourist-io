var express = require('express');

module.exports = (function (port, callback) {

  var app = express();

  require('./app')(app);
  require('./routes')(app);

  return app.listen(port,
    function () {
      if ('function' === typeof callback) {
        return callback(null, port);
      }
    }
  );

});
