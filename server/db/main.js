var mongoose = require("mongoose");

console.log("mongoose connecting....");

mongoose.connect("mongodb://localhost/social-app", function () {
  console.log("mongoose connected");
});

module.exports = mongoose;
