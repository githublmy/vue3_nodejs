<template>
  <el-dialog title="富文本" v-model="dialogVisible" width="70%">
    <div id="basic-tinymce2"></div>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import tinymce from "tinymce";
const dialogVisible = ref(false);
const initParams = {
  selector: "#basic-tinymce2",
  license_key: "gpl",
  height: 400,
  width: "100%",
  promotion: false, //菜单右上角的链接
  branding: false, //右下角tinymce商标
  language: "zh_CN",
  // skin_url: "/skins/ui/tinymce-5", //手动引入
  //sliding
  toolbar_mode: "wrap",
  // editimage_cors_hosts: ["picsum.photos"],
  plugins:
    "preview indent2em importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
  menubar: "file edit view insert format tools help",
  toolbar:
    "undo redo | styleselect formatselect fontselect fontsizeselect removeformat | blocks fontfamily fontsize | bold italic underline strikethrough subscript superscript hr blockquote | forecolor backcolor | align numlist bullist | link image media | table | lineheight indent2em outdent indent | charmap emoticons | accordion accordionremove | code codesample | fullscreen preview | save print | pagebreak anchor  | ltr rtl",
  font_size_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
  font_family_formats:
    "默认字体=Helvetica,sans-serif;微软雅黑=Microsoft YaHei,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
  importcss_append: true, //显示额外功能
  // quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
  quickbars_selection_toolbar:
    "fontsize forecolor backcolor | bold italic underline | quicklink h2 h3",
  // quickbars_insert_toolbar: "quickimage quicktable | hr pagebreak",
  quickbars_insert_toolbar: false, //快速插入工具栏
  noneditable_class: "mceNonEditable",
  // contextmenu: "link image table",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  setup: (editor) => {
    editor.on("init", () => {
      // 当编辑器初始化时，将其内容设置为当前的 content
      editor.setContent(``);
    });
    editor.on("Change KeyUp", () => {
      // 当编辑器内容改变时，更新 content
      // this.content = editor.getContent();
      console.log(editor.getContent());
    });
  },
};
const open = () => {
  dialogVisible.value = true;
  nextTick(() => {
    tinymce.init(initParams);
  });
};
defineExpose({
  open,
});
</script>
