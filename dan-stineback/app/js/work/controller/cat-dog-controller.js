'use strict';

module.exports = function(app) {
  app.controller('AnimalController', ['$http', 'ErrorService', 'AuthService','$location', AnimalController]);

  function AnimalController($http, ErrorService, AuthService, $location){

    this.$http = $http;
    this.catTitle = 'Make a new Cat';
    // this.$http = $http;
    this.cats = [];
    const urlCat = 'http://localhost:3000/cats/';

    this.getCats = function() {
      $http.get('http://localhost:3000/cats')
        .then((res) => {
          this.cats = res.data;

        }, ErrorService.logError('Error No Cats'));
    };

    this.addCat = function(cat) {
      $http({
        method: 'POST',
        data: cat,
        headers: {
          token: AuthService.getToken()
        },
        url: urlCat
      })
        .then((res) => {
          this.cats.push(res.data);
          this.cat = null;
        }, (err) => {
          $location.url('/signin');
          console.log(err);
        });
    }.bind(this);

    this.deleteCat = function(cat) {
      $http({
        method: 'DELETE',
        data: cat,
        headers: {
          token: AuthService.getToken()
        },
        url: 'http://localhost:3000/cats/' + cat._id
      })
        .then(() => {
          let index = this.cats.indexOf(cat);
          this.cats.splice(index, 1);
        }, (err) => {
          $location.url('/signin');
          console.log(err);
        });
    }.bind(this);

    this.updateCat = function(cat) {
      // cat.name = updatedCat.name;

      $http({
        method: 'PUT',
        data: cat,
        headers: {
          token: AuthService.getToken()
        },
        url: urlCat
      })
        .then(() => {
          this.cats = this.cats.map(n => {
            return n._id === cat._id ? cat : n;
          });
        }, (err) => {
          $location.url('/signin');
          console.log(err);
        });
    }.bind(this);

// dog controller
    const urlDog = 'http://localhost:3000/dogs/';
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
        url: urlDog
      })
        .then((res) => {
          this.dogs.push(res.data);
          this.newDog = null;
        }, (err) => {
          $location.url('/signin');
          console.log(err);
        });
    }.bind(this);

    this.deleteDog = function(dog) {
      $http({
        method: 'DELETE',
        data: dog,
        headers: {
          token: AuthService.getToken()
        },
        url: urlDog + dog._id
      })
        .then(() => {
          let index = this.dogs.indexOf(dog);
          this.dogs.splice(index, 1);
        }, (err) => {
          $location.url('/signin');
          console.log(err);
        });
    }.bind(this);


    this.updateDog = function(dog) {
      // dog.name = updatedDog.name;

      $http({
        method: 'PUT',
        data: dog,
        headers: {
          token: AuthService.getToken()
        },
        url: urlDog
      })
        .then(() => {
          this.dogs = this.dogs.map(n => {
            return n._id === dog._id ? dog : n;
          });
        }, (err) => {
          $location.url('/signin');
          console.log(err);
        });
    }.bind(this);
  }

  app.controller('SigninController', function($location, AuthService) {

    this.goHome = function() {
      $location.url('/cats');
    };
    this.goLogIn = function() {
      $location.url('/signin');
    };
    this.goSignIn = function() {
      $location.url('/signup');
    };
    this.signUp = function(user) {
      AuthService.signUp(user)
      .then((res) => {
        console.log(res, 'back in controller');
        $location.path('/cats');
      });
    };
    this.signIn = function(user) {
      AuthService.signIn(user)
      .then((res)=>{
        console.log(res);
        $location.path('/cats');
      })
      .catch((err) =>{
        console.log(err);
        $location.path('/signup');
      });
    };
    this.signOut = function() {
      AuthService.signOut()
      .then((res) =>{
        console.log(res);
        $location.path('/signin');
      })
        .catch((err)=>{
          console.log(err);
        });
    };
  });
};
