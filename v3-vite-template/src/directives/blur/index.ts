/*
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
