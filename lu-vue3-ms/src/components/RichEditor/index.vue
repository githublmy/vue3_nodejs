<template>
  <div class="editor">
    <el-button type="primary" size="default" @click="gethtml"
      >获取html</el-button
    >
    <!-- Create toolbar container -->
    <div id="toolbar">
      <!-- Add font size dropdown -->
      <select class="ql-size">
        <option value="small"></option>
        <!-- Note a missing, thus falsy value, is used to reset to default -->
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
      <!-- Add a bold button -->
      <button class="ql-bold"></button>
      <!-- Add subscript and superscript buttons -->
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
    </div>
    <QuillEditor
      ref="quillRef"
      v-model:content="content"
      theme="snow"
      :toolbar="toolbar"
      :options="options"
      contentType="html"
      @ready="onEditorReady($event)"
    >
    </QuillEditor>
  </div>
</template>

<script lang="ts" setup>
import { Quill, QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { ToolbarConfig } from "./config";
// <div style="color: red; font-size: 30px; margin-top: 10px">
//     <p style="text-align: center; font-size: 20px; color: blueviolet;">你啊水电费</p>
//   </div>
const quillRef = ref();
const toolbar = ref("full");
const content = ref(``);
content.value = `<span>我是</span><p style="text-align: center; font-size: 20px; color: blueviolet;">你啊水电费</p>`;
const onEditorReady = (e: Quill) => {
  console.log("editor ready!", e);
  for (let item of ToolbarConfig) {
    let tip = document.querySelector(".ql-toolbar " + item.Choice);
    if (!tip) continue;
    tip.setAttribute("title", item.title);
  }
};

const gethtml = () => {
  console.log(content.value);
  console.log(quillRef.value);
  quillRef.value.setHTML(`<div>我是好人</div>`);
};

const options = ref({
  theme: "snow",
  // bounds: document.body,
  // debug: "warn",
  modules: {
    // 工具栏配置
    toolbar: [
      ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
      ["blockquote", "code-block"], // 引用  代码块
      [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
      [{ indent: "-1" }, { indent: "+1" }], // 缩进
      // [{ size: ["small", false, "large", "huge"] }], // 字体大小
      [{ size: ["12", "14", "16", "18", "20", "22", "24", "28", "32", "36"] }], // 字体大小
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
      [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
      [{ align: [] }], // 对齐方式
      ["clean"], // 清除文本格式
      ["link", "image", "video"], // 链接、图片、视频
    ],
  },
  placeholder: "请输入内容",
});
</script>
<style lang="scss">
.editor {
  .ql-editor {
    height: calc(100vh - 80px - 42px - 40px) !important;
  }
}
.editor,
.ql-toolbar {
  white-space: pre-wrap !important;
  line-height: normal !important;
}
.quill-img {
  display: none;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.ql-tooltip {
  left: 0 !important;
}
.ql-snow .ql-tooltip::before {
  content: "查看链接";
}
.ql-snow .ql-tooltip a.ql-action::after {
  content: "编辑";
}
.ql-snow .ql-tooltip a.ql-remove::before {
  content: "移除";
}
</style>
