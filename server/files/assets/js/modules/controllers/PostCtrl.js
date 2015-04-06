angular.module("app")

  .controller("PostCtrl", function ($scope, $location, PostService, UserService) {
    var count = 0;

    PostService.fetch()
      .success(function (posts) {
        $scope.posts = posts;
      });

    $scope.addPost = function () {

      if ($scope.postBody) {

        $scope.posts.unshift({
          username: UserService.currentUser,
          body: $scope.postBody
        });

        PostService.create({
          username: UserService.currentUser,
          body: $scope.postBody
        })
          .success(function () {
            $scope.postBody = null;
          })
          .error(function () {
            $scope.error = true;
          });
      }

      //$scope.$on('ws:newPost', function (_, post) {
      //  $scope.$apply(function () {
      //    $scope.posts.unshift(post)
      //  })
      //});


    }
  });