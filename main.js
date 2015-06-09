//main.js
var app = require("app");
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var MenuItem = require('menu-item');
var mainWindow = null;
var menu = null;

app.on('window-all-closed', function() {
  app.quit();
});

var template = [
  {
    label: '&File',
    submenu: [
      {
        label: '&Open',
        accelerator: 'Ctrl+O',
      },
      {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click: function() { mainWindow.close(); }
      },
    ]
  },
  {
    label: '&View',
    submenu: [
      {
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click: function() { mainWindow.restart(); }
      },
      {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click: function() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); }
      },
      {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click: function() { mainWindow.toggleDevTools(); }
      },
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Learn More',
        click: function() { require('shell').openExternal('http://electron.atom.io') }
      },
      {
        label: 'Documentation',
        click: function() { require('shell').openExternal('https://github.com/atom/electron/tree/master/docs#readme') }
      },
      {
        label: 'Community Discussions',
        click: function() { require('shell').openExternal('https://discuss.atom.io/c/electron') }
      },
      {
        label: 'Search Issues',
        click: function() { require('shell').openExternal('https://github.com/atom/electron/issues') }
      }
    ]
  }
];

app.on("ready",function(argument) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    resizable: false,
    'auto-hide-menu-bar': false,
    'use-content-size': true,
  });

  menu = Menu.buildFromTemplate(template);
  mainWindow.setMenu(menu);
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.focus();

});
