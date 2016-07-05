'use strict';

module.exports = function(app) {
  app.controller('AnimalController', function($http, ErrorService){
    this.catTitle = 'Make a new Cat';
    // this.$http = $http;
    this.cats = [];

    this.getCats = function() {
      $http.get('http://localhost:3000/cats')
        .then((res) => {
          this.cats = res.data;

        }, ErrorService.logErorr('Error No Cats'));
    };

    this.addCat = function(cat) {
      $http.post('http://localhost:3000/cats', cat)
        .then((res) => {
          this.cats.push(res.data);
          this.cat = null;
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

    this.deleteCat = function(cat) {
      $http.delete('http://localhost:3000/cats/' + cat._id)
        .then(() => {
          let index = this.cats.indexOf(cat);
          this.cats.splice(index, 1);
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

    this.updateCat = function(cat) {
      // cat.name = updatedCat.name;

      $http.put('http://localhost:3000/cats', cat)
        .then(() => {
          this.cats = this.cats.map(n => {
            return n._id === cat._id ? cat : n;
          });
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

// dog controller

    this.dogTitle = 'Make a new Dog';
    this.dogs = [];

    this.getDogs = function() {
      $http.get('http://localhost:3000/dogs')
        .then((res) => {
          this.dogs = res.data;
        }, (err) => {
          console.log(err);
        });
    };

    this.addDog = function(dog) {
      $http.post('http://localhost:3000/dogs', dog)
        .then((res) => {
          this.dogs.push(res.data);
          this.newDog = null;
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

    this.deleteDog = function(dog) {
      $http.delete('http://localhost:3000/dogs/' + dog._id)
        .then(() => {
          let index = this.dogs.indexOf(dog);
          this.dogs.splice(index, 1);
        }, (err) => {
          console.log(err);
        });
    }.bind(this);


    this.updateDog = function(dog) {
      // dog.name = updatedDog.name;

      $http.put('http://localhost:3000/dogs', dog)
        .then(() => {
          this.dogs = this.dogs.map(n => {
            return n._id === dog._id ? dog : n;
          });
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

  });
};
