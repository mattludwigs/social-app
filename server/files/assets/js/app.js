var app=angular.module("app",["ngRoute"]);app.config(["$routeProvider",function(e){e.when("/",{controller:"PostCtrl",templateUrl:"templates/posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"templates/register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"templates/login.html"})}]),app.run(["$rootScope",function(e){var t="ws://localhost:3000",n=new WebSocket(t);n.onopen=function(){console.log("WS connected")},n.onmessage=function(t){var n=JSON.parse(t.data);e.$broadcast("ws:"+n.topic,n.data)}}]),angular.module("app").controller("BaseCtrl",["$scope",function(e){e.$on("login",function(t,n){e.currentUser=n})}]),angular.module("app").controller("LoginCtrl",["$scope","UserService","$location",function(e,t,n){e.login=function(o,r){t.login(o,r).then(function(o){e.$emit("login",o.data),t.currentUser=o.data.username,n.path("/")})}}]),angular.module("app").controller("PostCtrl",["$scope","$location","PostService","UserService",function(e,t,n,o){n.fetch().success(function(t){e.posts=t}),e.addPost=function(){e.postBody&&(e.posts.unshift({username:o.currentUser,body:e.postBody}),n.create({username:o.currentUser,body:e.postBody}).success(function(){e.postBody=null}).error(function(){e.error=!0}))}}]),angular.module("app").controller("RegisterCtrl",["$scope","UserService","$location",function(e,t,n){e.login=function(o,r){t.createUser(o,r).success(function(){t.login(o,r).then(function(o){e.$emit("login",o.data),t.currentUser=o.data.username,n.path("/")})})}}]),angular.module("app").service("PostService",["$http",function(e){var t="/api/posts";this.fetch=function(){return e.get(t)},this.create=function(n){return e.post(t,n)}}]),angular.module("app").service("UserService",["$http",function(e){var t=this;this.getUser=function(){return e.get("/api/users",{headers:{"X-Auth":this.token}})},this.login=function(n,o){return e.post("/api/sessions",{username:n,password:o}).then(function(n){return t.token=n.data,e.defaults.headers.common["X-Auth"]=n.data,t.getUser()})},this.createUser=function(t,n){return e.post("/api/users",{username:t,password:n})},this.currentUser=""}]);