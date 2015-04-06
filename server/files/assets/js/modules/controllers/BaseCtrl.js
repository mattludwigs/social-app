angular.module("app")

  .controller("BaseCtrl", function ($scope) {
    $scope.$on("login", function (event, user) {
      $scope.currentUser = user;
    });
  });