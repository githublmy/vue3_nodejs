/**
 * @description: 防抖
 * @param {function} func 需要防抖的函数
 * @param {number} waitTime 防抖时间
 * @param {boolean} immediate 是否进入就立即执行
 *
 * @return {*}
 */
export function debounce(
  func: { (): void; apply?: any },
  waitTime = 400,
  immediate = false
) {
  let timer: any, result: any;
  console.log(666);
  function debounced(this: any) {
    let context = this,
      args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(function () {
        result = func.apply(context, args);
      }, waitTime);
      if (callNow) result = func.apply(context, args);
    } else {
      timer = setTimeout(function () {
        result = func.apply(context, args);
      }, waitTime);
    }
    return result;
  }
  //取消防抖
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}
