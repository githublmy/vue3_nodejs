type WsEventListener = (event: Event, id: string) => void;

/**
 * WebSocketWrapper 配置选项
 */
interface WebSocketWrapperOptions {
  /**
   * 重连间隔时间，单位为毫秒
   * @default 5000
   */
  reconnectInterval?: number;
  /**
   * 最大重连次数，-1 表示无限重连
   * @default 10
   */
  maxReconnectAttempts?: number;
  /**
   * 心跳包间隔时间，单位为毫秒
   * @default 10000
   */
  heartbeatInterval?: number;
  /**
   * 如果连接未打开，是否将消息加入发送队列
   * @default false
   */
  enqueueIfClosed?: boolean;
  /**
   * WebSocket 实例的唯一标识符
   */
  id?: string;
  /**
   * WebSocket 子协议，可以是字符串或字符串数组
   */
  protocols?: string | string[];
}

/**
 * 封装的 WebSocket 类，包含断线重连、心跳包等功能
 */
class WebSocketWrapper {
  private url: string; // WebSocket 服务器的 URL
  private protocols?: string[]; // WebSocket 子协议数组
  private reconnectInterval: number; // 重连间隔时间
  private maxReconnectAttempts: number; // 最大重连次数
  private heartbeatInterval: number; // 心跳包间隔时间
  private enqueueIfClosed: boolean; // 如果连接未打开，是否将消息加入发送队列
  private id: string; // WebSocket 实例的唯一标识符
  private ws!: WebSocket; // WebSocket 实例
  private reconnectAttempts: number; // 当前重连尝试次数
  private isClosedManually: boolean; // 是否手动关闭的标记
  private eventListeners: Map<string, WsEventListener[]>; // 事件监听器
  private sendQueue: string[]; // 发送队列
  private heartbeatTimer?: number; // 心跳包定时器

  /**
   * WebSocketWrapper 构造函数
   * @param {string} url - WebSocket服务器的URL
   * @param {WebSocketWrapperOptions} [options] - 配置选项
   */
  constructor(url: string, options: WebSocketWrapperOptions = {}) {
    this.id = options.id || ""; // WebSocket实例的唯一标识符
    this.url = url; // WebSocket服务器的URL
    this.protocols = Array.isArray(options.protocols)
      ? options.protocols
      : options.protocols
      ? [options.protocols]
      : undefined; // 子协议数组或单个协议名，若未定义则不传递
    this.reconnectInterval = options.reconnectInterval ?? 5000; // 重连间隔时间
    this.maxReconnectAttempts = options.maxReconnectAttempts ?? 10; // 最大重连次数，-1表示无限重连
    this.heartbeatInterval = options.heartbeatInterval ?? 10000; // 心跳包间隔时间
    this.enqueueIfClosed = options.enqueueIfClosed ?? false; // 连接未打开时是否加入发送队列，默认值为 false
    this.reconnectAttempts = 0; // 当前重连尝试次数
    this.isClosedManually = false; // 是否手动关闭的标记
    this.eventListeners = new Map<string, WsEventListener[]>([
      ["open", []],
      ["close", []],
      ["message", []],
      ["error", []],
    ]); // 事件监听器
    this.sendQueue = []; // 发送队列
    this.init(); // 初始化WebSocket连接
  }

  // 初始化WebSocket连接
  private init() {
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
  private handleOpen(event: Event) {
    this.reconnectAttempts = 0; // 重置重连尝试次数
    this.flushSendQueue(); // 发送队列中的消息
    this.dispatchEvent("open", event); // 触发事件监听器
  }

  // 处理close事件
  private handleClose(event: CloseEvent) {
    this.stopHeartbeat(); // 停止心跳机制
    if (
      !this.isClosedManually &&
      (this.maxReconnectAttempts === -1 ||
        this.reconnectAttempts < this.maxReconnectAttempts)
    ) {
      setTimeout(() => this.reconnect(), this.reconnectInterval); // 触发重连机制，使用固定的重连间隔时间
    }
    this.dispatchEvent("close", event); // 触发事件监听器
  }

  // 处理message事件
  private handleMessage(event: MessageEvent) {
    this.dispatchEvent("message", event); // 触发事件监听器
  }

  // 处理error事件
  private handleError(event: Event) {
    this.dispatchEvent("error", event); // 触发事件监听器
  }

  // 重连逻辑
  private reconnect() {
    if (
      this.maxReconnectAttempts === -1 ||
      this.reconnectAttempts < this.maxReconnectAttempts
    ) {
      this.reconnectAttempts++; // 增加重连尝试次数
      this.init(); // 重新初始化WebSocket连接
    } else {
      console.warn(`WebSocket ${this.id} 达到最大重连次数，停止重连。`);
    }
  }

  /**
   * 发送数据，如果连接未打开，则根据参数判断是否加入发送队列
   * @param data 要发送的数据，JSON格式
   * @param enqueueIfClosed 如果连接未打开，是否将消息加入发送队列，默认false
   */
  public send(data: string, enqueueIfClosed: boolean = this.enqueueIfClosed) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else if (enqueueIfClosed) {
      this.sendQueue.push(data); // 如果连接未打开，将数据加入发送队列
    } else {
      console.error(`WebSocket ${this.id} 连接未打开，无法发送数据。`);
    }
  }

  // 发送队列中的数据
  private flushSendQueue() {
    while (this.sendQueue.length > 0 && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(this.sendQueue.shift()!);
    }
  }

  /**
   * 添加事件监听器，支持以下事件：
   * - open：连接建立时触发
   * - close：连接关闭时触发
   * - message：接收到消息时触发
   * - error：发生错误时触发
   */
  public addEventListener(event: string, callback: WsEventListener) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event)!.push(callback);
    } else {
      console.error(`事件 ${event} 不支持.`);
    }
  }
  /**
   * 移除事件监听器，支持以下事件：
   * - open：连接建立时触发
   * - close：连接关闭时触发
   * - message：接收到消息时触发
   * - error：发生错误时触发
   */
  public removeEventListener(event: string, callback: WsEventListener) {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event)!;
      this.eventListeners.set(
        event,
        listeners.filter((cb) => cb !== callback)
      );
    } else {
      console.error(`事件 ${event} 不支持.`);
    }
  }

  // 触发事件监听器
  private dispatchEvent(eventType: string, event: Event) {
    if (this.eventListeners.has(eventType)) {
      this.eventListeners
        .get(eventType)!
        .forEach((callback) => callback(event, this.id)); // 传递实例ID
    }
  }

  // 启动心跳机制
  private startHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = window.setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "heartbeat" }));
      }
    }, this.heartbeatInterval);
  }

  // 停止心跳机制
  private stopHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
  }

  /**
   * 手动关闭 WebSocket 连接
   */
  public close() {
    this.isClosedManually = true; // 标记为手动关闭
    this.stopHeartbeat(); // 停止心跳机制
    this.ws.close(); // 关闭WebSocket连接
    this.removeAllEventListeners(); // 移除所有事件监听器
  }

  // 移除所有事件监听器
  private removeAllEventListeners() {
    this.eventListeners.forEach((_, eventType) => {
      this.eventListeners.set(eventType, []);
    });
  }

  /**
   * 获取 WebSocket 连接状态
   * 
   *        0           1        2         3
   * 
   *  ["CONNECTING", "OPEN", "CLOSING", "CLOSED"]
   * @returns {number} WebSocket 的 readyState 属性值
   */
  public getStatus(): string {
    const states = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    return states[this.ws.readyState];
  }
}

export default WebSocketWrapper;
