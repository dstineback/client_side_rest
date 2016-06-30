'use strict';

module.exports = function(app) {
  app.controller('DogsController',function($http){

    this.dogTitle = 'Make a new Dog';
    this.$http = $http;
    this.dogs = [];

    this.getDogs = function() {
      this.$http.get('http://localhost:3000/dogs')
        .then((res) => {
          this.dogs = res.data;
        }, (err) => {
          console.log(err);
        });
    };

    this.addDog = function() {
      this.$http.post('http://localhost:3000/dogs', this.newDog)
        .then((res) => {
          this.dogs.push(res.data);
          this.newDog = null;
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

    this.deleteDog = function(dog) {
      this.$http.delete('http://localhost:3000/dogs/' + dog._id)
        .then(() => {
          let index = this.dogs.indexOf(dog);
          this.dogs.splice(index, 1);
        }, (err) => {
          console.log(err);
        });
    }.bind(this);


    this.updateDog = function(dog, updatedDog) {
      dog.name = updatedDog.name;

      this.$http.put('http://localhost:3000/dogs', dog)
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
