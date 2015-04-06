var router = require("express").Router(),
    bcrypt = require("bcrypt"),
    jwt = require("jwt-simple"),
    User = require("../../db/models/users"),
    config = require("../../serverConf");


router.get("/api/users", function (req, res, next) {

  if (!req.headers['x-auth']) {
    return res.send(401);
  }
  var auth = jwt.decode(req.headers["x-auth"], config.secret);
  User.findOne({username: auth.username}, function (err, user) {
    if (err) {
      return next(err);
    }
    res.json(user);
  })

});

router.post("/api/users", function (req, res, next) {
  var user = new User({username: req.body.username});
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.sendStatus(201);
    })
  })

});

module.exports = router;
