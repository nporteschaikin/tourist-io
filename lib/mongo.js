var config = require('./config').mongo
  , mongoose = require('mongoose');

module.exports = (function () {

  var connection = mongoose.createConnection(config.url);
  connection.on('error',
    function (error) {
      return console.log(error);
    }
  );

  return connection;

})();
