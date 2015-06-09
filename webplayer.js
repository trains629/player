// webplayer.js
// 通过web去控制和设置界面player

var http = require('http');
var send = require('send');
var url = require('url');
var fs = require("fs");
var jade = require('jade');

function webPlayer(player) { // 播放器对象
  this.player = player;
  this.path = player.path;
  this.files = null;
  var self = this;
  fs.readdir(this.path,function (err,files) {
      console.log(err,files);
      if(err)return res.end("");
      self.files = files;
  });
  // 输出模板
  this.html = jade.compileFile(__dirname+'/template/playlist.jade');
}

webPlayer.prototype.queryPlay = function (uu,res) {
  res.writeHead(200, {'Content-Type': 'text/json'});
  var id = uu.query['id'];
  console.log(uu.query);
  var src = (id && this.files && id >0) ? this.path+'/'+this.files[id-1] : '';
  var data = {"name":"hello"};
  if(src != '')data['src'] = src;
  return res.end(JSON.stringify(data));
}

webPlayer.prototype.fileList = function (req,res) {
  // 处理操作命令
  var uu = url.parse(req.url,true);
  if(uu.pathname == '/cmd')return this.queryPlay(uu,res);
  res.writeHead(200, {'Content-Type': 'text/html'});
  console.log(uu);
  if(!this.files)return res.end("error!");
  res.write(this.html({"files":this.files}));
  res.end();
}

webPlayer.prototype.run = function (port) {
  var self = this;
  var app = http.createServer(function(req, res){
  function error(err) {
    res.statusCode = err.status || 500;
    res.end(err.message);
  }
  // your custom directory handling logic:
  function redirect() {
    console.log("redirect");
    res.statusCode = 301;
    res.setHeader('Location', req.url + '/');
    res.end('Redirecting to ' + req.url + '/');
  }
  var pathname = url.parse(req.url).pathname;
  console.log(pathname);
  if(pathname == '/' || pathname == '/cmd'){
    return self.fileList(req,res);
  }
  send(req, pathname, {root: __dirname + '/public'})
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
