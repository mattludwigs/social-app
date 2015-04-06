var User = require("../../db/models/users"),
    bcrypt = require("bcrypt"),
    jwt = require("jwt-simple"),
    config = require("../../serverConf"),
    router = require("express").Router();

router.post("/api/sessions", function (req, res, next) {
  User.findOne({username: req.body.username})
    .select("password").select("username")
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.sendStatus(401);
      }

      bcrypt.compare(req.body.password, user.password, function (err, valid) {
        if (err) {
          return next(err);
        }

        if (!valid) {
          return res.send(401);
        }

        var token = jwt.encode({username: user.username}, config.secret);
        res.send(token);
      });
    })
});

module.exports = router;