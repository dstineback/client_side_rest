'use strict';
module.exports = function(app) {
  require('./cat-controller')(app);
  require('./dog-controller')(app);
};
