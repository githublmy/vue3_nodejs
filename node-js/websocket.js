var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Accept,Content-type");
  res.header("Access-Control-Allow-Credentials", true);
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8")
  if (req.method.toLowerCase() == 'options')
    res.sendStatus(200);  //让options尝试请求快速结束
  else
    next();
});
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

//使用app作为中间件开启WebSocket服务器，express框架的其他功能也都能使用
//必须用server监听端口，不会报错
// const http = require('http')
// const server = http.createServer(app);
// const io = require('socket.io')
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// 载入 ws 库
const WebSocketServer = require("ws")
// 引入定时器
const timers = require('timers');
// 创建一个 websocket 服务
const wss = new WebSocketServer.Server({ port: 9999 })

let timeIntervalHandle = null
let dataIndex = 0
let da = {
  name: "张三",
  age: 16,
  sex: "男"
}
let da1 = {
  name: "小红",
  age: 18,
  sex: "女"
}
// 创建连接
wss.on("connection", ws => {
  console.log("新客户端已连接")
  // 接收到 client 数据时
  ws.on("message", data => {
    console.log(JSON.stringify(data))
    console.log(`客户端返回信息: ${data}`);
    let receiveMessage = data.toString()
    switch (receiveMessage) {
      case 'start':
        console.log('inside switch case start');
        // timeIntervalHandle = timers.setInterval(() => {
        ws.send(JSON.stringify(da))
        //   dataIndex++
        //   // console.log(dataIndex)
        // }, 1000)
        break;
      case 'start1':
        ws.send(JSON.stringify(da1))
        break;
      case 'end':
        timers.clearInterval(timeIntervalHandle)
        timeIntervalHandle = null
        ws.send('已停止循环')
        break
    }

  })
  ws.on("close", () => {
    console.log("websocket server: 客户端已关闭连接")
  })
  ws.onerror = function () {
    console.log("websocket server: 出错了")
  }
})
console.log("websocket 服务已运行在端口 9999")

module.exports = app;
