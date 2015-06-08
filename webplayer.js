// webplayer.js
// 通过web去控制和设置界面player

var http = require('http');
var send = require('send');
var url = require('url');
var fs = require("fs");

function webPlayer(player) { // 播放器对象
  this.player = player;
  this.path = player.path;
}

webPlayer.prototype.fileList = function (req,res) {
  // 显示文件列表,可以调用jade模板
  var header = "<!DOCTYPE html>\n<html>\n<head>\n<link href=\"bootstrap.min.css\" rel=\"stylesheet\">\n<meta charset=\"utf-8\">\n<title>文件列表</title></head>\n";
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readdir(path || this.path,function (err,files) {
      console.log(err,files);
      if(err)return res.end("");
      var str = '<div class="list-group">\n';
      for (var i = 0; i < files.length; i++) {
        str += '<a href="#" class="list-group-item">' + files[i] + '</a>\n'
      }
      str += '</div>';
      res.write(header);
      res.write('<body>' + str + '</body></html>');
      res.end();
  });
}

webPlayer.prototype.run = function (port) {
  var self = this;
  var app = http.createServer(function(req, res){
  console.log(req.url);
  function error(err) {
      console.log(err);
      // 在这里按参数返回需要的内容
      self.fileList(req,res);
  }
  // your custom directory handling logic:
  function redirect() {
    console.log("redirect");
    res.statusCode = 301;
    res.setHeader('Location', req.url + '/');
    res.end('Redirecting to ' + req.url + '/');
  }
  send(req, url.parse(req.url).pathname, {root: __dirname + '/public'})
  .on("error",error)
  .on('directory', redirect)
  .pipe(res);
  });
  app.listen(port);
}

exports.run = function(player,port) {
  var wp = new webPlayer(player);
  wp.run(port);
  return wp
}
