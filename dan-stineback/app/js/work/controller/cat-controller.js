'use strict';

module.exports = function(app) {
  app.controller('CatsController', function($http){
    this.catTitle = 'Make a new Cat';
    this.$http = $http;
    this.cats = [];

    this.getCats = function() {
      this.$http.get('http://localhost:3000/cats')
        .then((res) => {
          this.cats = res.data;

        }, (err) => {
          console.log(err);
        });
    };

    this.addCat = function() {
      this.$http.post('http://localhost:3000/cats', this.newCat)
        .then((res) => {
          this.cats.push(res.data);
          this.newCat = null;
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

    this.deleteCat = function(cat) {
      this.$http.delete('http://localhost:3000/cats/' + cat._id)
        .then(() => {
          let index = this.cats.indexOf(cat);
          this.cats.splice(index, 1);
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

    this.updateCat = function(cat, updatedCat) {
      cat.name = updatedCat.name;

      this.$http.put('http://localhost:3000/cats', cat)
        .then(() => {
          this.cats = this.cats.map(n => {
            return n._id === cat._id ? cat : n;
          });
        }, (err) => {
          console.log(err);
        });
    }.bind(this);
  });
};
