angular.module("app")

  .service("UserService", function ($http) {

    var _service = this;

    this.getUser = function () {
      return $http.get("/api/users", {
        headers: {"X-Auth": this.token}
      })
    };

    this.login = function (username, password) {
      return $http.post("/api/sessions", {
        username: username,
        password: password
      }).then(function (val) {
        _service.token = val.data;
        $http.defaults.headers.common['X-Auth'] = val.data;
        return _service.getUser();
      });
    };

    this.createUser = function (username, password) {
      return $http.post("/api/users", {
        username: username,
        password: password
      });
    };

    this.currentUser = "";
  });