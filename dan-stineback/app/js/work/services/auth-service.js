'use strict';

module.exports = function(app) {
  app.factory('AuthService', function($http) {
    const service = {};
    let token;

    service.signIn = function(user) {
      let base64Auth = btoa(user.username + ':' + user.password);
      let authString = 'Basic ' + base64Auth;

      return $http({
        url: 'http://localhost:3000/signIn',
        method: 'POST',
        headers: {
          authorization: authString
        }
      }).then((res)=> {
        token = res.data.token;
        return res;
      });
    };

    service.getToken = function() {
      return token;
    };

    return service;
  });
};
