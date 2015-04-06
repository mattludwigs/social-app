var app = angular.module("app", [
  "ngRoute"
]);

app.config(function ($routeProvider) {

  $routeProvider

    .when("/", {
      controller: "PostCtrl",
      templateUrl: "templates/posts.html"
    })

    .when("/register",  {
      controller: "RegisterCtrl",
      templateUrl: "templates/register.html"
    })

    .when("/login", {
      controller: "LoginCtrl",
      templateUrl: "templates/login.html"
    });

});


app.run(function ($rootScope) {
  var url = "ws://localhost:3000",
      connection = new WebSocket(url);

  connection.onopen = function () {
    console.log("WS connected");
  };

  connection.onmessage = function (e) {
    var playLoad = JSON.parse(e.data);
    $rootScope.$broadcast("ws:" + playLoad.topic, playLoad.data);
  }
});