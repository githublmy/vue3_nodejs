<template>
  <div ref="editor" class="code-mirror-editor"></div>
</template>

<script>
import { ref, onMounted } from "vue";
// import {basicSetup, EditorView} from "codemirror"
// import {javascript} from "@codemirror/lang-javascript"

// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/xml/xml'; // 引入 XML 模式以支持 HTML
// import 'codemirror/theme/material.css'; // 选择主题

export default {
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const editor = ref(null);

    onMounted(() => {
      console.log("弹窗");

      // const cm = CodeMirror(editor.value, {
      //   value: props.code,
      //   mode: 'text/html',
      //   theme: 'material',
      //   lineNumbers: true,
      //   lineWrapping: true
      // });

      // // 监听变化
      // cm.on('change', (instance) => {
      //   const newCode = instance.getValue();
      //   // Emit an event to parent component with new code
      //   this.$emit('update:code', newCode);
      // });
    });

    return { editor };
  },
};
</script>

<style scoped>
.code-mirror-editor {
  height: 300px; /* 自定义高度 */
}
</style>
