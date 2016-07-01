'use strict';
module.exports = function(app) {
  app.directive('catList', function() {
    return {
      scope: {
        cats: '='
      },
      templateUrl: './templates/animal/cat-list.html'
    };
  });
};
