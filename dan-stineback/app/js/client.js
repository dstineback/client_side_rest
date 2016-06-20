'use strict';

const angular = require('angular');
const app = angular.module('CatDogApp', []);

app.controller('CatsController', ['$http', CatsController]);
app.controller('DogsController', ['$http', DogsController]);

//Cats controller
function CatsController($http){
  this.catTitle = 'Make a new Cat';
  this.$http = $http;
  this.cats = [];

}

CatsController.prototype.getCats = function() {
  this.$http.get('http://localhost:3000/cats')
    .then((res) => {
      this.cats = res.data;

    }, (err) => {
      console.log(err);
    });
};

CatsController.prototype.addCat = function() {
  this.$http.post('http://localhost:3000/cats', this.newCat)
    .then((res) => {
      this.cats.push(res.data);
      this.newCat = null;
    }, (err) => {
      console.log(err);
    });
};

CatsController.prototype.deleteCat = function(cat) {
  this.$http.delete('http://localhost:3000/cats/' + cat._id)
    .then(() => {
      let index = this.cats.indexOf(cat);
      this.cats.splice(index, 1);
    }, (err) => {
      console.log(err);
    });
};

CatsController.prototype.updateCat = function(cat, updatedCat) {
  cat.name = updatedCat.name;

  this.$http.put('http://localhost:3000/cats', cat)
    .then(() => {
      this.cats = this.cats.map(n => {
        return n._id === cat._id ? cat : n;
      });
    }, (err) => {
      console.log(err);
    });
};

//Dogs controller
function DogsController($http){
  this.dogTitle = 'Make a new Dog';
  this.$http = $http;
  this.dogs = [];

}

DogsController.prototype.getDogs = function() {
  this.$http.get('http://localhost:3000/dogs')
    .then((res) => {
      this.dogs = res.data;
    }, (err) => {
      console.log(err);
    });
};

DogsController.prototype.addDog = function() {
  this.$http.post('http://localhost:3000/dogs', this.newDog)
    .then((res) => {
      this.dogs.push(res.data);
      this.newDog = null;
    }, (err) => {
      console.log(err);
    });
};

DogsController.prototype.deleteDog = function(dog) {
  this.$http.delete('http://localhost:3000/dogs/' + dog._id)
    .then(() => {
      let index = this.dogs.indexOf(dog);
      this.dogs.splice(index, 1);
    }, (err) => {
      console.log(err);
    });
};

DogsController.prototype.updateDog = function(dog, updatedDog) {
  dog.name = updatedDog.name;

  this.$http.put('http://localhost:3000/dogs', dog)
    .then(() => {
      this.dogs = this.dogs.map(n => {
        return n._id === dog._id ? dog : n;
      });
    }, (err) => {
      console.log(err);
    });
};
