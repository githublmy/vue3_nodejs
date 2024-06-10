// 连接地址
const uuid = "/uuid" + new Date().getTime();
export let ws_params = {
  back_url: "ws",
};
const WS_URL =
  import.meta.env.VITE_APP_WEBSOCKET_URL + "/" + ws_params.back_url;
// console.log(WS_URL);
let websocket = null;
//断线重连后，延迟5秒重新创建WebSocket连接  rec用来存储延迟请求的代码
let rec;
//连接标识 避免重复连接
let isConnect = false;
//心跳发送/返回的信息 服务器和客户端收到的信息内容如果如下 就识别为心跳信息 不要做业务处理
let checkMsg = "heartbeat";
//定义外部接收数据的回调函数
let globalCallback = function (e) {
  console.log(e, "接收数据");
};
//定义是否连接成功的回调函数
let isConCallback = function (e) {
  console.log(e, "连接了？");
};
//定义外部错误信息的回调函数
let reConnectWsCallback = function (e) {
  console.log(e, "连接了？");
};

const createWebSocket = () => {
  try {
    initWebSocket(); //初始化websocket连接
  } catch (e) {
    console.log("尝试创建连接失败");
    //如果无法连接上webSocket 那么重新连接！可能会因为服务器重新部署，或者短暂断网等导致无法创建连接
    reConnect();
  }
};

//定义重连函数
let reConnect = () => {
  console.log("尝试重新连接");
  if (isConnect) return; //如果已经连上就不在重连了
  rec && clearTimeout(rec);
  rec = setTimeout(function () {
    // 延迟5秒重连  避免过多次过频繁请求重连
    createWebSocket();
  }, 2000);
};
//设置关闭连接
let closeWebSocket = () => {
  console.log("关闭websocket");
  websocket.close();
};
//心跳设置
const heartCheck = {
  timeout: 20000, //每段时间发送一次心跳包 这里设置为20s
  timeoutObj: null, //延时发送消息对象（启动心跳新建这个对象，收到消息后重置对象）

  start: function () {
    this.timeoutObj = setTimeout(function () {
      if (isConnect) websocket.send(checkMsg);
    }, this.timeout);
  },

  reset: function () {
    clearTimeout(this.timeoutObj);
    this.start();
  },
};

// 初始化websocket
function initWebSocket() {
  console.log(ws_params);
  const ws_u =
    import.meta.env.VITE_APP_WEBSOCKET_URL + "/" + ws_params.back_url;
  console.log(ws_u, "websocket地址");
  websocket = new WebSocket(ws_u);
  websocket.onmessage = function (e) {
    websocketOnmessage(e);
  };
  websocket.onclose = function () {
    websocketClose();
  };
  websocket.onopen = function () {
    // console.log(e, "连接成功666666666666666666");
    isConnect = true; //连接成功后修改标识
    websocketOpen();
  };
  // 连接发生错误的回调方法
  websocket.onerror = function (e) {
    console.log("WebSocket连接发生错误");
    isConnect = false; //连接断开修改标识
    websocketError();
    reConnect(); //连接错误 需要重连
  };
}

// 实际调用的方法
function sendSock(agentData) {
  if (websocket.readyState === websocket.OPEN) {
    // console.log("直接发送数据", websocket);
    // 若是ws开启状态
    websocketSend(agentData);
  } else if (websocket.readyState === websocket.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    // console.log("等待100ms", websocket);
    setTimeout(function () {
      sendSock(agentData);
    }, 100);
  } else {
    // console.log("重新发");
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData);
    }, 100);
  }
}

function getSock(callback) {
  // console.log(callback, "callback");
  globalCallback = callback;
}
// 数据接收
function websocketOnmessage(e) {
  // console.log(e)
  let O_o = JSON.parse(e.data);

  if (!O_o) {
    heartCheck.reset();
  } else {
    // console.log(O_o);
    // console.log(globalCallback, "globalCallback传输局");
    globalCallback(O_o);
  }
}

// 数据发送
function websocketSend(agentData) {
  // console.log(agentData, "发送");
  websocket.send(JSON.stringify(agentData));
}

// 关闭
function websocketClose() {
  isConnect = false; //断开后修改标识
  reConnect();
}
// 是否连接
function isConnected(callback) {
  isConCallback = callback;
}
// 创建 websocket 连接
function websocketOpen() {
  isConCallback(isConnect);
}

// 重连 websocket 连接, 连接失败
function connectError(callback) {
  reConnectWsCallback = callback;
}
// 创建 websocket 重连连接
function websocketError() {
  reConnectWsCallback("连接失败，正在重新连接......");
}

// 将方法暴露出去
export default {
  sendSock,
  getSock,
  isConnected,
  createWebSocket,
  closeWebSocket,
  connectError,
};
