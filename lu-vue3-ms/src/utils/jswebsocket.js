class WebSocketWrapper {
  /**
   * WebSocketWrapper 构造函数
   * @param {string} url - WebSocket服务器的URL
   * @param {object} options - 配置选项
   * @param {number} [options.reconnectInterval = 5000] - 重连间隔时间
   * @param {number} [options.maxReconnectAttempts = -1] - 最大重连次数，-1表示无限重连
   * @param {number} [options.heartbeatInterval = 10000] - 心跳包间隔时间
   * @param {boolean} [options.enqueueIfClosed = false] - 连接未打开时是否加入发送队列
   * @param {string} [options.id=''] - WebSocket实例的唯一标识符
   * @param {string|string[]} [options.protocols] - 子协议数组或单个协议名
   */
  constructor(url, options = {}) {
    this.id = options.id || ''; // WebSocket实例的唯一标识符
    this.url = url; // WebSocket服务器的URL
    this.protocols = Array.isArray(options.protocols) ? options.protocols : (options.protocols ? [options.protocols] : undefined); // 子协议数组或单个协议名，若未定义则不传递
    this.reconnectInterval = options.reconnectInterval ?? 5000; // 重连间隔时间
    this.maxReconnectAttempts = options.maxReconnectAttempts ?? -1; // 最大重连次数，-1表示无限重连
    this.heartbeatInterval = options.heartbeatInterval ?? 10000; // 心跳包间隔时间
    this.enqueueIfClosed = options.enqueueIfClosed ?? false; // 连接未打开时是否加入发送队列，默认值为 false
    this.reconnectAttempts = 0; // 当前重连尝试次数
    this.isClosedManually = false; // 是否手动关闭的标记
    this.eventListeners = new Map([
      ['open', []],
      ['close', []],
      ['message', []],
      ['error', []],
    ]); // 事件监听器
    this.sendQueue = []; // 发送队列
    this.init(); // 初始化WebSocket连接
  }

  // 初始化WebSocket连接
  init() {
    if (this.protocols) {
      this.ws = new WebSocket(this.url, this.protocols);
    } else {
      this.ws = new WebSocket(this.url);
    }
    this.ws.onopen = this.handleOpen.bind(this);
    this.ws.onclose = this.handleClose.bind(this);
    this.ws.onmessage = this.handleMessage.bind(this);
    this.ws.onerror = this.handleError.bind(this);
    this.startHeartbeat(); // 启动心跳机制
  }

  // 处理open事件
  handleOpen(event) {
    this.reconnectAttempts = 0; // 重置重连尝试次数
    this.flushSendQueue(); // 发送队列中的消息
    this.dispatchEvent('open', event); // 触发事件监听器
  }

  // 处理close事件
  handleClose(event) {
    this.stopHeartbeat(); // 停止心跳机制
    if (!this.isClosedManually && (this.maxReconnectAttempts === -1 || this.reconnectAttempts < this.maxReconnectAttempts)) {
      setTimeout(() => this.reconnect(), this.reconnectInterval); // 触发重连机制，使用固定的重连间隔时间
    }
    this.dispatchEvent('close', event); // 触发事件监听器
  }

  // 处理message事件
  handleMessage(event) {
    this.dispatchEvent('message', event); // 触发事件监听器
  }

  // 处理error事件
  handleError(event) {
    this.dispatchEvent('error', event); // 触发事件监听器
  }

  // 重连逻辑
  reconnect() {
    if (this.maxReconnectAttempts === -1 || this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++; // 增加重连尝试次数
      this.init(); // 重新初始化WebSocket连接
    } else {
      console.warn(`WebSocket ${this.id} 达到最大重连次数，停止重连。`);
    }
  }

  // 发送数据，如果连接未打开，则根据参数判断是否加入发送队列
  send(data, enqueueIfClosed = this.enqueueIfClosed) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else if (enqueueIfClosed) {
      this.sendQueue.push(data); // 如果连接未打开，将数据加入发送队列
    } else {
      console.error(`WebSocket ${this.id} 连接未打开，无法发送数据。`);
    }
  }

  // 发送队列中的数据
  flushSendQueue() {
    while (this.sendQueue.length > 0 && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(this.sendQueue.shift());
    }
  }

  // 添加事件监听器
  addEventListener(event, callback) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).push(callback);
    } else {
      console.error(`事件 ${event} 不支持.`);
    }
  }

  // 移除事件监听器
  removeEventListener(event, callback) {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event);
      this.eventListeners.set(event, listeners.filter(cb => cb !== callback));
    } else {
      console.error(`事件 ${event} 不支持.`);
    }
  }

  // 触发事件监听器
  dispatchEvent(eventType, event) {
    if (this.eventListeners.has(eventType)) {
      this.eventListeners.get(eventType).forEach(callback => callback(event, this.id)); // 传递实例ID
    }
  }

  // 启动心跳机制
  startHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'heartbeat' }));
      }
    }, this.heartbeatInterval);
  }

  // 停止心跳机制
  stopHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
  }

  // 关闭WebSocket连接
  close() {
    this.isClosedManually = true; // 标记为手动关闭
    this.stopHeartbeat(); // 停止心跳机制
    this.ws.close(); // 关闭WebSocket连接
    this.removeAllEventListeners(); // 移除所有事件监听器
  }

  // 移除所有事件监听器
  removeAllEventListeners() {
    this.eventListeners.forEach((_, eventType) => {
      this.eventListeners.set(eventType, []);
    });
  }

  // 获取WebSocket当前状态
  getStatus() {
    const states = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
    return states[this.ws.readyState];
  }
}

export default WebSocketWrapper;
