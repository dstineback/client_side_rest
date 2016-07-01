'use strict';
module.exports = function(app) {
  app.directive('dogList', function() {
    return {
      scope: {
        dogs: '='
      },
      templateUrl: './templates/animal/dog-list.html'
    };
  });
};
