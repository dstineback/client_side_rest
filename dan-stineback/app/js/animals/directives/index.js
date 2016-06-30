'use strict';
module.exports = function(app) {
  require('./form-directive')(app);
  require('./dog-list-directive')(app);
  require('./cat-list-directive')(app);
};
