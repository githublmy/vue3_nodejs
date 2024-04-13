/**
 * @description: 防抖
 * @param {function} func 需要防抖的函数
 * @param {number} waitTime 防抖时间
 * @param {boolean} immediate 是否进入就立即执行
 *
 * @return {*}
 */
export function debounce(func: { (): void; apply?: any }, waitTime = 400, immediate = false) {
  let timer: NODEJS.Timeout | null = null, result: any
  function debounced(this: any) {
    let context = this,
      args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(function () {
        result = func.apply(context, args)
      }, waitTime)
      if (callNow) result = func.apply(context, args)
    } else {
      timer = setTimeout(function () {
        result = func.apply(context, args)
      }, waitTime)
    }
    return result
  }
  //取消防抖
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

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
  let val = from
  const start = Date.now()
  const speed = (to - from) / duration
  const run = () => {
    const t = Date.now() - start
    if (t >= duration) {
      val = to
      onProgress(val)
      return
    }
    val = from + speed * t
    onProgress(val)
    requestAnimationFrame(run)
  }
  run()
}
