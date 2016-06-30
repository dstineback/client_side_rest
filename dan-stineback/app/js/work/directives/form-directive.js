'use strict';
module.exports = function(app) {
  app.directive('newAnimalForm', function() {
    return {
      scope: {
        type: '@',
        animal: '=',
        species: '@'
      },
      templateUrl: './templates/animal/new-animal-form.html',
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        console.log(controller);

        let configMethods = {
          cats: function($scope) {
            $scope.delete = controller.deleteCat;
            $scope.update = controller.updateCat;
            $scope.submit = $scope.type === 'new' ? controller.addCat : controller.updateCat;
            $scope.formMessage = $scope.type === 'new' ? 'Add new Cat' : 'Update player';

          },
          dogs: function($scope) {
            $scope.delete = controller.deleteDog;
            $scope.update = controller.updateDog;
            $scope.submit = $scope.type === 'new' ? controller.addDog : controller.updateDog;
            $scope.formMessage = $scope.type === 'new' ? 'Add new Dog' : 'Update player';

          }
        };
        configMethods[$scope.species]($scope);
      }
    };
  });
};
