//client.js

var infor;

window.onload = function () {
  infor = document.querySelector("#infor");
}

function player(id) {
  // 那需要一个处理ajax的函数库
  console.log(id);
  $.get("cmd?id="+id,function (data) {
    console.log(data,infor);
    if(!infor)return;
    infor.innerHTML = JSON.stringify(data);
  })
}
