module.exports = function(app) {
  require('./controller')(app);
  require('./directives')(app);
  require('./services')(app);
};
