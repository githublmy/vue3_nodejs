import { createVNode, render } from "vue";
export function showDialog(message: string, _type?: undefined) {
  // 创建一个VNode
  const vnode = createVNode(
    "div",
    {
      class: "dialog",
    },
    [
      createVNode("p", { class: "message" }, message),
      // createVNode("button", { class: "close", onClick: closeDialog }, "关闭"),
      // createVNode("button", { class: "confirm", onClick: closeDialog }, "确认"),
    ]
  );
  console.log(vnode);
  render(vnode, document.body);
}
