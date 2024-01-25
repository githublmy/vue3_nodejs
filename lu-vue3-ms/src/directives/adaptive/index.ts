/*
 * @Description: 自适应表格高度 使用方式 v-adaptive={ bottomOffset: 62 }
 */
import type { DirectiveBinding } from 'vue'
interface ExHTMLElement extends HTMLElement {
  resizeListener: EventListener
}
/**
 * 如何使用
 * <el-table height="100px" v-adaptive="{bottomOffset: 30}">...</el-table>
 * el-table height 必须设置
 *  bottomOffset: 62 (default)   //距离页面底部距离 62
 */
const doResize = (el: ExHTMLElement, binding: DirectiveBinding) => {
  const { value } = binding
  let bottomOffset = 0
  // const bottomOffset =
  //   (value && value.hasOwnProperty("toString") && value.bottomOffset) || 62;
  // console.log(bottomOffset);
  // console.log(value);
  if (!value) {
    bottomOffset = 62
  } else {
    bottomOffset = value.bottomOffset
  }
  //重新设置高度
  const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
  el.style.height = height + 'px'
}

export default {
  beforeMount(el: ExHTMLElement, binding: DirectiveBinding) {
    // console.log("挂载前测试", binding);
    el.resizeListener = () => {
      doResize(el, binding)
    }
    window.addEventListener('resize', el.resizeListener)
  },
  mounted(el: ExHTMLElement, binding: DirectiveBinding) {
    doResize(el, binding)
  },
  unmounted(el: ExHTMLElement) {
    // console.log("unmounted", "卸载自定义指令");
    window.removeEventListener('resize', el.resizeListener)
  }
}
