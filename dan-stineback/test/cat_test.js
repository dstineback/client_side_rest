'use strict';
const angular = require('angular');

require('angular-mocks');
require('../app/js/client');

describe('controller tests', ()=>{

  let catsctrl;
  let $httpBackend;

  it('should run a test', ()=>{
    expect(true).toBe(true);
  });

  beforeEach(()=>{
    angular.mock.module('CatDogApp');
    angular.mock.inject(function($controller, _$httpBackend_){
      catsctrl = new $controller('AnimalController');
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should test your controller', ()=>{
    expect(Array.isArray(catsctrl.cats)).toBe(true);
  });

  // it('should get a list of cats', () => {
  //   $httpBackend.expectGET('http://localhost:3000/cats')
  //   .respond(200, {data: [{name: 'test cat'}]});
  //   catsctrl.getCats();
  //   $httpBackend.flush();
  //
  // });
});
