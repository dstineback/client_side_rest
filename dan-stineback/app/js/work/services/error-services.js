
'use strict';

module.exports = function(app) {
  app.factory('ErrorService', function() {
    const errors = [];
    const service = {};

    service.logErorr = function(message) {
      return function(err) {
        errors.push(message);
        console.log(err);

      };
    };
    service.getErrors = function() {
      return errors;
    };
    return service;
  });
};
