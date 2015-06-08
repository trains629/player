// play.js

var http = require('http');
var send = require('send');
var url = require('url');
var fs = require("fs");

function Player(path,port) {
  this.path = path || __dirname;
  this.port = port || 8629;
  this.player = document.querySelector("#player");
}

Player.prototype.bindPort = function (port) {
  var self = this; 
  var app = http.createServer(function(req, res){
  console.log(url.parse(req.url).pathname);
  send(req, url.parse(req.url).pathname, {root: './public'}).pipe(res);
  });
  app.listen(port || this.port);
}

Player.prototype.initList = function (path) {
  this.lister = document.querySelector("#lister");
  console.log(this.lister);
  if(!this.lister)return;
  // 在这里插入列表
  var self = this;
  fs.readdir(path || this.path,function (err,files) {
    console.log(err,files);
    if(err)return;
    console.log(files);
    var str = '<ul class="list-group">\n';
    for (var i = 0; i < files.length; i++) {
      str += '<li class="list-group-item">' + files[i] + '</li>\n'
    }
    str += '</ul>';
    console.log(str);
    self.lister.innerHTML = str;
  });
}
//

window.onload = function () {
  var player1 = new Player();
  player1.initList();
  player1.bindPort(1337);
}
