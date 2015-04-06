angular.module("app")

  .controller("RegisterCtrl", function ($scope, UserService, $location) {

    $scope.login = function (username, password) {
      UserService.createUser(username, password)
        .success(function () {
          UserService.login(username, password)
            .then(function (res) {
              $scope.$emit("login", res.data);
              UserService.currentUser = res.data.username;
              $location.path("/");
            })
        });
    }

  });