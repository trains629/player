使用Electron作为基础开发一个桌面版，媒体播放程序，只支持html5支持的格式。兼容mac os ，windows等系统  
支持两种控制模式：  
1. 通过键盘控制播放  
2. 通过http页面控制播放。  
程序启动时可以传入两个参数  
1. 媒体库路径，默认当前位置  
2. 服务器端口号，默认为8629 应该是默认不启动  

程序启动后，列表出指定目录下的支持播放的媒体，默认不显示此列表，
只在http控制端显示。
只显示一个空的video标签，占满整个页面，默认显示控制器，各种操作都通过键盘去实现，
或是http控制界面
