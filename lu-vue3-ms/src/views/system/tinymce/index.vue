<template>
  <!-- <Editor
    api-key="aawnz0o8kigy7ia1ztfgziay1bsnneafniczu0c571v20cmz"
    :init="tinymceInit"
  /> -->

  <div id="basic-tinymce">你好啊</div>
</template>
<script setup>
// import Editor from "@tinymce/tinymce-vue";
import tinymce from "tinymce";
// const tinymceInit = {
//   selector: "#tinymce",
//   height: 300,
//   license_key: "gpl",
//   branding: false,
//   menubar: false,
//   // resize: true,
//   language: "zh_CN",
//   // skin_url: "/skins/ui/tinymce-5", //手动引入
//   // content_css: "/skins/content/default/content.css", //手动引入
//   // toolbar_mode: "wrap",
//   // menubar: "file edit view insert format tools table help",
//   // plugins: [
//   //   "advlist autolink lists link image charmap print preview anchor",
//   //   "searchreplace visualblocks code fullscreen",
//   //   "insertdatetime media table paste code help wordcount",
//   // ],
//   // toolbar:
//   //   "undo redo | formatselect | " +
//   //   "bold italic backcolor | alignleft aligncenter " +
//   //   "alignright alignjustify | bullist numlist outdent indent | " +
//   //   "removeformat | help",
// };

onMounted(() => {
  // tinymce.addI18n("zh_CN", {
  //   // Redo: "重做",
  //   // Undo: "撤销",
  //   // Cut: "剪切",
  //   // Copy: "复制",
  //   // Paste: "粘贴",
  //   // "Select all": "全选",
  //   // "New document": "新建文档",
  //   // Bold: "加粗",
  //   // Italic: "斜体",
  //   // Underline: "下划线",
  //   // Strikethrough: "删除线",
  //   // Superscript: "上标",
  //   // Subscript: "下标",
  //   // "Clear formatting": "清除格式",
  //   // "Align left": "左对齐",
  //   // "Align center": "居中对齐",
  //   // "Align right": "右对齐",
  //   // Justify: "两端对齐",
  //   // "Bullet list": "项目符号列表",
  //   // "Numbered list": "编号列表",
  //   // "Decrease indent": "减少缩进",
  //   // "Increase indent": "增加缩进",
  //   // "Insert/edit link": "插入/编辑链接",
  //   // "Remove link": "移除链接",
  //   // "Insert/edit image": "插入/编辑图片",
  //   // "Insert table": "插入表格",
  //   // "Insert accordion": "插入手风琴",
  //   // "Table properties": "表格属性",
  //   // "Delete table": "删除表格",
  //   // Cell: "单元格",
  //   // Row: "行",
  //   // Column: "列",
  //   // "Merge cells": "合并单元格",
  //   // "Split cell": "拆分单元格",
  //   // "Insert row before": "在上方插入行",
  //   // "Insert row after": "在下方插入行",
  //   // "Delete row": "删除行",
  //   // "Insert column before": "在左侧插入列",
  //   // "Insert column after": "在右侧插入列",
  //   // "Delete column": "删除列",
  //   // Document: "文档",
  //   // "Visual aids": "视觉辅助",
  //   // "Visual blocks": "可视块",
  //   // Preview: "预览",
  //   // Print: "打印",
  //   // "Full screen": "全屏",
  //   // "Insert/edit video": "插入/编辑视频",
  //   // Media: "媒体",
  //   // Template: "模板",
  //   // Help: "帮助",
  //   // 其他翻译
  // });
  tinymce.init({
    selector: "#basic-tinymce",
    license_key: "gpl",
    height: 400,
    width: "100%",
    // branding: true,
    // menubar: true,
    // resize: true,
    language: "zh_CN",
    // language_url: "/custom_zh_CN.js", // 替换为你自己的语言文件路径

    skin_url: "/skins/ui/tinymce-5", //手动引入
    content_css: "/skins/content/default/content.css", //手动引入
    toolbar_mode: "wrap",
    // editimage_cors_hosts: ['picsum.photos'],
    plugins:
      "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
    toolbar:
      "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
    font_size_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
    // font_formats:
    //   "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    setup: (editor) => {
      console.log(editor);
      editor.ui.registry.addButton("Insert accordion", {
        text: "折叠",
        onAction: () => {
          editor.insertContent("<div>折叠</div>");
        },
      });
      // editor.ui.registry.addButton("bold", {
      //   text: "B",
      //   onAction: function () {
      //     editor.execCommand("bold");
      //   },
      //   tooltip: "我提示了", // 设置bold按钮的tooltip
      // });
    },
  });
  console.log(tinymce.i18n.getCode());
});
</script>

<style scoped></style>
