//client.js

var info;

window.onload = function () {
  info = document.querySelector("#info");
}

function player(id) {
  // 那需要一个处理ajax的函数库
  console.log(id);
  $.get("cmd?id="+id,function (data) {
    console.log(data);
    if(!info)return;
    info.innerHTML = JSON.stringify(data);
  })
}
