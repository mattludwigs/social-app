var ws = require("ws"),
    _ = require("lodash"),
    clients = [];

exports.connect = function (server) {
  var _ws = new ws.Server({server: server});
  _ws.on("connection", function (ws) {

    clients.push(ws);

    exports.broadcast("new client joined!");

    ws.on("close", function () {
      _.remove(clients, ws);
    });
  });
};

exports.broadcast = function (topic, data) {
  var i = 0;
  var json = JSON.stringify({topic: topic, data: data});

  for (i = 0; i < clients.length; i++) {
    clients[i].send(json);
  }

};