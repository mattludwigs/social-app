var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    port = process.env.PORT || 3000;


var Post = require("./db/models/posts");

app.use(bodyParser.json());
app.use(require("./auth"));
app.use(require("./controllers/api/posts"));
app.use(require("./controllers/api/sessions"));
app.use(require("./controllers/api/users"));
app.use(require("./controllers/static"));

var server = app.listen(port, function () {
  console.log("Server listening on", "3000");
});

require("./middle-ware/websockets").connect(server);
