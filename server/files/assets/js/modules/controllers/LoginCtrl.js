angular.module("app")

  .controller("LoginCtrl", function ($scope, UserService, $location) {
    $scope.login = function (username, password) {

      UserService.login(username, password)
        .then(function (res) {
          $scope.$emit("login", res.data);
          UserService.currentUser = res.data.username;
          $location.path("/");
        })

    };
  });