const WS_URL = import.meta.env.VITE_APP_WEBSOCKET_URL; // 获取环境变量中的websocket地址
let websock = null;
//断线重连后，延迟5秒重新创建WebSocket连接  rec用来存储延迟请求的代码
let rec;
//连接标识 避免重复连接
let isConnect = false;
//心跳发送/返回的信息 服务器和客户端收到的信息内容如果如下 就识别为心跳信息 不要做业务处理
const checkMsg = "heartbeat";
//定义外部接收数据的回调函数
let globalCallback = function (e) {
  console.log(e, "接收数据socket.js")
};

const createWebSocket = () => {
  try {
    initWebSocket(); //初始化websocket连接
  } catch (e) {
    console.log("尝试创建连接失败");
    reConnect(); //如果无法连接上webSocket 那么重新连接！可能会因为服务器重新部署，或者短暂断网等导致无法创建连接
  }
};

//定义重连函数
const reConnect = () => {
  console.log("尝试重新连接");
  if (isConnect) return; //如果已经连上就不在重连了
  rec && clearTimeout(rec);
  rec = setTimeout(function () { // 延迟5秒重连  避免过多次过频繁请求重连
    createWebSocket();
  }, 5000);
};
//设置关闭连接
const closeWebSocket = () => {
  websock.close();
  console.log("关闭websocket");
};
//心跳设置
const heartCheck = {
  timeout: 20000, //每段时间发送一次心跳包 这里设置为20s
  timeoutObj: null, //延时发送消息对象（启动心跳新建这个对象，收到消息后重置对象）

  start: function () {
    this.timeoutObj = setTimeout(function () {
      if (isConnect) websock.send(checkMsg);
    }, this.timeout);
  },

  reset: function () {
    clearTimeout(this.timeoutObj);
    this.start();
  }
};

// 初始化websocket
function initWebSocket() {
  websock = new WebSocket(WS_URL)
  websock.onmessage = function (e) {
    websocketonmessage(e)
  }
  websock.onclose = function (e) {
    websocketclose(e)
  }
  websock.onopen = function () {
    isConnect = true; //连接成功后修改标识
    websocketOpen()
  }

  // 连接发生错误的回调方法
  websock.onerror = function () {
    console.log('WebSocket连接失败')
    isConnect = false; //连接断开修改标识
    reConnect(); //连接错误 需要重连
  }
}

// 实际调用的方法
function sendSock(agentData) {
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData)
    }, 1000)
  }
}

function getSock(callback) {
  // console.log(callback, "callback");
  globalCallback = callback
  // console.log(globalCallback, "globalCallbackgetSock");
}
// 数据接收
function websocketonmessage(e) {
  // console.log(e)
  const O_o = JSON.parse(e.data)

  if (!O_o) {
    heartCheck.reset();
  } else {
    globalCallback(O_o);
  }
}

// 数据发送
function websocketsend(agentData) {
  console.log(JSON.stringify(agentData))
  websock.send(JSON.stringify(agentData))
}

// 关闭
function websocketclose(e) {
  console.log(e, "关闭")
  isConnect = false; //断开后修改标识
}

// 创建 websocket 连接
function websocketOpen(e) {
  console.log('连接成功')
}
// 是否连接
function isConnected(callback) {
  // console.log(websock, "websock存在就是连接过，连接标识")
  if (websock) {
    callback(true)
  } else {
    callback(false)
  }
}

// 将方法暴露出去
export default {
  sendSock,
  getSock,
  isConnected,
  createWebSocket,
  closeWebSocket
}

