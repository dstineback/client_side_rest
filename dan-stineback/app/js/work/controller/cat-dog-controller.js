'use strict';

module.exports = function(app) {
  app.controller('AnimalController', ['$http', 'ErrorService', 'AuthService', AnimalController]);

  function AnimalController($http, ErrorService, AuthService, $location){

    this.$http = $http;
    this.catTitle = 'Make a new Cat';
    // this.$http = $http;
    this.cats = [];

    this.getCats = function() {
      $http.get('http://localhost:3000/cats')
        .then((res) => {
          this.cats = res.data;

        }, ErrorService.logError('Error No Cats'));
    };

    this.addCat = function(cat) {
      $http.post('http://localhost:3000/cats', cat)
        .then((res) => {
          this.cats.push(res.data);
          this.cat = null;
        }, ErrorService.logError('Error could not make a Cat'));
    }.bind(this);

    this.deleteCat = function(cat) {
      $http.delete('http://localhost:3000/cats/' + cat._id)
        .then(() => {
          let index = this.cats.indexOf(cat);
          this.cats.splice(index, 1);
        }, ErrorService.logError('Error Could not Delete Cat'));
    }.bind(this);

    this.updateCat = function(cat) {
      // cat.name = updatedCat.name;

      $http.put('http://localhost:3000/cats', cat)
        .then(() => {
          this.cats = this.cats.map(n => {
            return n._id === cat._id ? cat : n;
          });
        }, ErrorService.logError('Error could not update Cat'));
    }.bind(this);

// dog controller
    const urlDog = 'http://localhost:3000/dogs';
    this.dogTitle = 'Make a new Dog';
    this.dogs = [];

    this.getDogs = function() {
      $http.get('http://localhost:3000/dogs')
        .then((res) => {
          this.dogs = res.data;
        }, ErrorService.logError('Error could not find Dog'));
    };

    this.addDog = function(dog) {
      $http({
        method: 'POST',
        data: dog,
        headers: {
          token: AuthService.getToken()
        },
        urlDog
      })
        .then((res) => {
          this.dogs.push(res.data);
          this.newDog = null;
        }, ErrorService.logError('Error could not make a Dog', ()=> {
          $location.url('/');
        }));
    }.bind(this);

    this.deleteDog = function(dog) {
      $http.delete('http://localhost:3000/dogs/' + dog._id)
        .then(() => {
          let index = this.dogs.indexOf(dog);
          this.dogs.splice(index, 1);
        }, ErrorService.logError('Error could not delete Dog'));
    }.bind(this);


    this.updateDog = function(dog) {
      // dog.name = updatedDog.name;

      $http.put('http://localhost:3000/dogs', dog)
        .then(() => {
          this.dogs = this.dogs.map(n => {
            return n._id === dog._id ? dog : n;
          });
        }, ErrorService.logError('Error could not update Dog'));
    }.bind(this);

  }

  app.controller('SigninController', function($location, AuthService) {
    this.goHome = function() {
      $location.url('/');
    };
    this.signUp = function(user) {
      AuthService.signUp(user)
      .then((res) => {
        console.log(res, 'back in controller');
      });
    };
    this.signIn = function(user) {
      AuthService.signIn(user)
      .then((res)=>{
        console.log(res);
      });
    };
  });
};
