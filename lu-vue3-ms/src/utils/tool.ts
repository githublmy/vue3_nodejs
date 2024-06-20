/**
 * @description: 防抖
 * @param {function} func 需要防抖的函数
 * @param {number} waitTime 防抖时间
 * @param {boolean} immediate 是否进入就立即执行
 *
 * @return {*}
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitTime = 400,
  immediate = false
) {
  let timer: NodeJS.Timeout | null = null,
    result: ReturnType<T>;
  function debounced(this: ThisParameterType<T>, ...argsFunc: Parameters<T>) {
    let context = this;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(function () {
        result = func.apply(context, argsFunc);
      }, waitTime);
      if (callNow) result = func.apply(context, argsFunc);
    } else {
      timer = setTimeout(function () {
        result = func.apply(context, argsFunc);
      }, waitTime);
    }
    return result;
  }
  //取消防抖
  debounced.cancel = function () {
    timer && clearTimeout(timer);
    timer = null;
  };
  return debounced;
}
// 第二个
// 定义一个泛型类型，表示传入的函数及其参数和返回值
type DebounceFunction<T extends (...args: any[]) => any> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void;
// 防抖函数实现
export function debounce2<T extends (...args: any[]) => any>(
  func: T, // 原始需要防抖处理的函数
  waitTime = 400, // 防抖等待时间，默认为400毫秒
  immediate = false // 是否在延迟开始前立即执行，默认为false
): DebounceFunction<T> & { cancel: () => void } {
  // 存储定时器引用
  let timer: NodeJS.Timeout | null = null;
  // 标记是否已完成立即执行
  let isImmediateCallDone = false;
  // 创建内部防抖函数
  function debounced(this: ThisParameterType<T>, ...args: Parameters<T>): void {
    // 清除已有的定时器
    if (timer) clearTimeout(timer);
    // 执行函数的封装，确保只在适当的时候调用原始函数
    const execute = () => {
      func.apply(this, args);
      isImmediateCallDone = false;
    };
    // 如果设置了immediate，并且还没有完成立即执行
    if (immediate && !isImmediateCallDone) {
      // 立即执行函数
      execute();
      isImmediateCallDone = true;
    } else {
      // 否则，设置新的定时器，在等待时间过后执行函数
      timer = setTimeout(execute, waitTime);
    }
  }
  // 添加取消防抖的方法
  debounced.cancel = function () {
    // 清除当前定时器
    timer && clearTimeout(timer);
    // 重置定时器引用和立即执行标记
    timer = null;
    isImmediateCallDone = false;
  };
  // 返回经过防抖处理的函数和其附加的cancel方法
  return debounced as DebounceFunction<T> & { cancel: () => void };
}

// 节流
// 定义节流选项类型
type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
};

// 定义节流函数类型
type ThrottleFunction<T extends (...args: any[]) => any> = {
  (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T>;
  cancel: () => void;
};
// 节流函数实现
export function throttle<T extends (...args: any[]) => any>(
  // 需要节流的原始函数
  func: T,
  // 节流间隔时间（单位：毫秒）
  waitTime: number,
  // 节流选项，默认开启leading 首次执行和trailing结束执行
  options: ThrottleOptions = { leading: true, trailing: true }
): ThrottleFunction<T> & { cancel: () => void } {
  // 用于保存定时器ID
  let timeoutId: NodeJS.Timeout | null = null;
  // 用于记录最后一次调用的时间戳
  let lastCallTimestamp: number | null = null;
  // 使用闭包封装 lastArgs 和 lastThis
  let state = {
    lastArgs: undefined as any,
    lastThis: null as ThisParameterType<T> | null,
  };

  // 定义延时执行函数
  const later = () => {
    lastCallTimestamp = null;
    // 如果开启了trailing选项，并且有保存的参数和上下文，则执行原始函数
    if (options.trailing && state.lastArgs && state.lastThis) {
      func.apply(state.lastThis, state.lastArgs);
    }
  };

  // 创建节流后的函数
  const throttled = function (this: ThisParameterType<T>, 
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    const now = Date.now();

    // 判断是否满足节流条件
    if (!lastCallTimestamp || now - lastCallTimestamp >= waitTime) {
      // 清除已存在的定时器
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // 如果开启了leading选项，或者这是第一次调用，立即执行函数
      if (options.leading || !lastCallTimestamp) {
        func.apply(this, args);
        // 更新状态
        state.lastThis = this;
        state.lastArgs = args;
        lastCallTimestamp = now;

        // 如果不启用trailing，重置状态
        if (!options.trailing) {
          state.lastArgs = undefined;
          state.lastThis = null;
        }
      }

      // 如果开启了trailing选项，更新状态并设置新的定时器
      if (options.trailing) {
        state.lastThis = this;
        state.lastArgs = args;
      }

      // 设置定时器
      timeoutId = setTimeout(later, waitTime);
    }

    // 节流函数本身无返回值
    return undefined;
  };

  // 添加取消节流的方法
  throttled.cancel = function () {
    timeoutId && clearTimeout(timeoutId);
    // 清除定时器和相关状态
    lastCallTimestamp = null;
    state.lastArgs = undefined;
    state.lastThis = null;
  };

  // 返回节流函数和取消方法
  return throttled as ThrottleFunction<T>;
}

// 无需在外部初始化 lastArgs 和 lastThis，因为它们已在闭包内封装管理

/**
 * @description 数字动画
 * @param duration 动画持续时间
 * @param from 动画起始值
 * @param to 动画结束值
 * @param onProgress 动画进行中回调
 */
export function animationForCount(
  duration: number,
  from: number,
  to: number,
  onProgress: { (v: number): void }
) {
  let val = from;
  const start = Date.now();
  const speed = (to - from) / duration;
  const run = () => {
    const t = Date.now() - start;
    if (t >= duration) {
      val = to;
      onProgress(val);
      return;
    }
    val = from + speed * t;
    onProgress(val);
    requestAnimationFrame(run);
  };
  run();
}


// 数组转树形
export function arrayToTree(arr: string | any[]) {
  let map: any = {},
    node,
    roots = [];
  for (let i = 0; i < arr.length; i += 1) {
    node = arr[i];
    node.children = [];
    map[node.classificationCode] = i;
    if (node.parentCode !== null) {
      arr[map[node.parentCode]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
