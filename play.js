// play.js

var http = require('http');
var send = require('send');
var url = require('url');
var fs = require("fs");
var wp = require("./webplayer");

function Player(path,port) {
  this.path = path || __dirname;
  this.port = port || 8629;
  this.player = document.querySelector("#player");
  this.files = {};
}

Player.prototype.bindPort = function (port) {
  var webplayer = wp.run(this,port);
}

Player.prototype.fileListGroup = function (path,fn) {
  fs.readdir(path || this.path,function (err,files) {
    console.log(err,files);
    if(err)return;
    var str = '<ul class="list-group">\n';
    for (var i = 0; i < files.length; i++) {
      str += '<li class="list-group-item">' + files[i] + '</li>\n'
    }
    str += '</ul>';
    if(fn)fn(str,files);
  });
}

// 控制播放
Player.prototype.play = function (path) {
  if (path) {
    this.player.src = path;
  }
  this.player.play();
}

Player.prototype.info = function () {
  return [];
}

Player.prototype.initList = function (path) {
  this.lister = document.querySelector("#lister");
  console.log(this.lister);
  if(!this.lister)return;
  // 在这里插入列表
  var self = this;
  this.fileListGroup(path,function (str,files) {
    console.log(str);
    self.files = files;
    self.lister.innerHTML = str;
  });
}

window.onload = function () {
  var player1 = new Player();
  player1.initList();
  player1.bindPort(1337);
}
