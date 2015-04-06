var Post = require("../../db/models/posts"),
    ws = require("../../middle-ware/websockets"),
    router = require("express").Router();

router.get("/api/posts", function (req, res, next) {

  Post.find().sort("-date")
    .exec(function (err, posts) {
      if (err) {
        return next(err);
      }

      res.status(200).json(posts);
    });
});

router.post("/api/posts", function (req, res, next) {

  var _post = new Post({
    username: req.auth.username,
    body: req.body.body
  });

  _post.save(function (err, post) {
    if (err) {
      return next(err);
    }

    ws.broadcast("newPost", post);
    res.status(201).json(post);
  });
});

module.exports = router;