'use strict';
const angular = require('angular');

require('angular-mocks');
require('../app/js/client');

describe('controller tests', ()=>{

  let dogsctrl;
  let $httpBackend;

  it('should run a test', ()=>{
    expect(true).toBe(true);
  });

  beforeEach(()=>{
    angular.mock.module('CatDogApp');
    angular.mock.inject(function($controller, _$httpBackend_){
      dogsctrl = new $controller('AnimalController');
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should test your controller', ()=>{
    expect(Array.isArray(dogsctrl.dogs)).toBe(true);
  });

  // it('should get a list of dogs', () => {
  //   $httpBackend.expectGET('http://localhost:3000/dogs')
  //   .respond(200, {data: [{name: 'test dog'}]});
  //   dogsctrl.getDogs();
  //   $httpBackend.flush();

  // });
});
