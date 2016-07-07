'use strict';
module.exports = function(app) {
  require('./error-services')(app);
  require('./auth-service')(app);
};
