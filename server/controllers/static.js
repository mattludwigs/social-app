var express = require("express"),
    router = express.Router(),
    path = require("path");

var filePath = path.join(__dirname + "/../files");

router.use(express.static(filePath + "/assets"));

router.get("/", function (req, res) {
  res.sendFile(filePath + "/index.html");
});

module.exports = router;