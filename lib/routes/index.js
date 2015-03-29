module.exports = (function (app) {

  require('./auth')(app);
  require('./tours')(app);

});
