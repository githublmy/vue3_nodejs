/*
 * @Author: lu
 * @LastEditors: Please set LastEditors
 * @Date: 2023-05-26 11:25:03
 * @LastEditTime: 2023-09-05 09:06:08
 * @Description: 失去焦点 使用 v-blur
 */
const fun = (evt: any) => {
  let target = evt.target;
  if (target.nodeName === "SPAN" || target.nodeName === "I") {
    target = evt.target.parentNode;
  }
  target.blur();
};

export default {
  mounted(el: HTMLElement) {
    // console.log(el, binding);
    el.addEventListener("focus", fun);
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener("focus", fun);
  },
};
