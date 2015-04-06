angular.module("app")

  .service("PostService", function ($http) {

    var api = "/api/posts";

    this.fetch = function () {
      return $http.get(api);
    };

    this.create = function (post) {
      return $http.post(api, post);
    };

  });
