'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');
const app = angular.module('CatDogApp', [ngRoute]);

require('./work')(app);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './templates/animal/signin.html',
    controller: 'SigninController',
    controllerAs: 'singinctrl'
  })
  .when('/signup', {
    templateUrl: './templates/animal/signUp.html',
    controller: 'SigninController',
    controllerAs: 'signinctrl'
  })
  .when('/cats', {
    templateUrl: './templates/animal/home.html',
    controller: 'AnimalController',
    controllerAs: 'catsctrl'
  })
  .when('/dogs', {
    templateUrl: './templates/animal/home.html',
    controller: 'AnimalController',
    controllerAs: 'dogsctrl'
  })
  .when('/signout', {
    templateUrl: './templates/animal/signout.html',
    controller: 'SigninController',
    controllerAs: 'signinctrl'
  })
  .when('/signin', {
    templateUrl:'./templates/animal/signin.html',
    controller: 'SigninController',
    controllerAs: 'signinctrl'
  });
});
