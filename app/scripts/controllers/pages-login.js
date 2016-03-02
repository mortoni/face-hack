'use strict';

/**
 * @ngdoc function
 * @name minovateApp.controller:PagesLoginCtrl
 * @description
 * # PagesLoginCtrl
 * Controller of the minovateApp
 */
app
  .controller('LoginCtrl', function ($rootScope, $scope, $state) {
    $scope.login = function() {
      $rootScope.user = 'ab';
      $state.go('app.dashboard');
    };
  });
