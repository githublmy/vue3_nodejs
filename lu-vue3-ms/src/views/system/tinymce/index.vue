<template>
  <div class="baseStyle">
    <el-button type="primary" size="default" @click="getData"
      >获取数据</el-button
    >
    <el-button type="primary" size="default" @click="getIniteData"
      >获取实例</el-button
    >
    <el-button type="primary" size="default" @click="open">打开弹窗</el-button>
    <Editor
      ref="editorRef"
      v-model="content"
      :disabled="false"
      api-key="aawnz0o8kigy7ia1ztfgziay1bsnneafniczu0c571v20cmz"
      :init="tinymceConfig"
    ></Editor>
    <Test ref="testRef" />
  </div>
</template>

<script setup>
import { uploadFiles } from "@/api/index";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/tinymce";
import Test from "./components/test.vue";
const editorRef = ref();
const testRef = ref();
const getData = () => {
  console.log("获取数据", content.value);
};
const open = () => {
  testRef.value.open();
};
const getIniteData = () => {
  console.log("获取实例", editorRef.value.getEditor().get());
};
const content = ref("");

const image_upload_handler = (blobInfo, progress) =>
  new Promise((resolve, reject) => {
    console.log(blobInfo.blob());
    // console.log(progress);
    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());
    // formData.append("bucket", "test");
    // formData.append("project", "");
    fetch("http://localhost:3000/files/upload", {
      method: "post",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        if (json.status === 404) {
          reject({ message: "HTTP Error: " + json.status, remove: true });
          return;
        }
        const obj = {
          location: json.url,
        };
        resolve(json.url);
      })
      .catch((error) => {
        console.dir(error, "错误");
        // const { message } = error;
        let msg = "";
        // if (
        //   message.indexOf(
        //     "Cannot read properties of undefined (reading 'url')"
        //   ) > -1
        // ) {
        //   msg = "上传失败，接口404";
        // }
        reject(msg || "上传失败，未知错误！");
      });
  });

const tinymceConfig = {
  selector: "#basic-tinymce",
  license_key: "gpl",
  height: 500,
  width: "100%",
  placeholder: "请输入内容",
  promotion: false, //菜单右上角的链接
  branding: false, //右下角tinymce商标
  language: "zh_CN",
  // // true 默认（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
  // resize: true,
  skin_url: "/skins/ui/tinymce-5", //手动引入
  // 附件大小
  attachment_max_size: 100 * 1024 * 1024 * 1024,
  //图标路径
  attachment_assets_path: "/plugins/attachment/icons",
  // 自定义css
  content_css: "/skins/custom/content.css",
  // customUploadFunction: async (file, progressCallback, successCallback) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   try {
  //     const res = await uploadFiles(formData, (e) => {
  //       console.log(e);
  //       const progress = (((e.loaded / e.total) * 100) | 0) + "%";
  //       progressCallback(progress);
  //     });
  //     successCallback(res.url);
  //   } catch (error) {}
  // },
  attachment_upload_handler: async function (
    file,
    successCallback,
    failureCallback,
    progressCallback
  ) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await uploadFiles(formData, (e) => {
        console.log(e);
        const progress = (((e.loaded / e.total) * 100) | 0) + "%";
        progressCallback(progress);
      });
      successCallback(res.url);
    } catch (error) {
      failureCallback(`上传失败:${error}`);
    }
  },
  // //sliding
  toolbar_mode: "wrap",
  // toolbar_sticky: false, //粘性菜单, 当设置为true，页面多个富文本，并且有滚动条的时候会只显示一个工具栏
  // // editimage_cors_hosts: ["picsum.photos"],
  plugins: `preview indent2em importcss searchreplace autolink autosave save directionality
     code visualblocks visualchars fullscreen image link media codesample table charmap
     pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help
     quickbars emoticons accordion attachment`,
  menubar: "file edit view insert format tools table help",
  toolbar: `undo redo | styleselect formatselect fontselect fontsizeselect removeformat |
     blocks fontfamily fontsize | bold italic underline strikethrough subscript superscript hr blockquote |
     forecolor backcolor | align numlist bullist | link image media | table | lineheight indent2em outdent indent |
     charmap emoticons | accordion accordionremove | code codesample | fullscreen preview | save print |
     pagebreak anchor | ltr rtl | wordcount attachment`,
  line_height_formats: "1 1.1 1.2 1.3 1.4 1.5 2 3 4 5 6", //行高列表
  font_size_input_default_unit: "px", //默认字体单位
  font_size_formats:
    "12px 14px 16px 18px 20px 21px 22px 24px 26px 28px 30px 32px 34px 36px 48px 56px 72px",
  font_family_formats:
    "默认字体=Helvetica,sans-serif;微软雅黑=Microsoft YaHei,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
  importcss_append: true, //显示额外功能
  quickbars_image_toolbar: "alignleft aligncenter alignright | imageoptions",
  quickbars_selection_toolbar:
    "fontsize forecolor backcolor | align bold italic underline | quicklink h2 h3",
  // // quickbars_insert_toolbar: "quickimage quicktable | hr pagebreak",
  quickbars_insert_toolbar: false, //快速插入工具栏
  // noneditable_class: "mceNonEditable", //不可编辑的class类
  // // contextmenu: "link image table",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img {max-width:100%;} video {max-width:100%;} ",
  // // setup: (editor) => {
  // //   editor.on("init", () => {
  // //     // 当编辑器初始化时，将其内容设置为当前的 content
  // //     editor.setContent(``);
  // //   });
  // //   editor.on("Change KeyUp", () => {
  // //     // 当编辑器内容改变时，更新 content
  // //     console.log(editor.getContent());
  // //     content.value = editor.getContent();
  // //   });
  // // },

  // // images_upload_url: "http://localhost:3000/files/upload",
  // // 图片处理方法
  images_reuse_filename: true, //固定名称
  image_title: true, //显示标题
  images_upload_handler: image_upload_handler,
  file_picker_types: "media image",
  // // automatic_uploads: true,//自动上传，默认true
  // media_dimensions: true, //显示视频宽高控件
  file_picker_callback: function (callback, value, meta) {
    if (meta.filetype === "media") {
      var input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "video/*"); // 仅接受视频文件

      input.onchange = function () {
        var file = this.files[0];
        console.log(file);
        if (file) {
          const formData = new FormData();
          // console.log(blobInfo.filename());
          formData.append("file", file);
          fetch("http://localhost:3000/files/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              callback(result.url, { title: file.name });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
      input.click();
    }

    if (meta.filetype === "image") {
      var input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*"); // 仅接受视频文件

      input.onchange = function () {
        var file = this.files[0];
        console.log(file);
        if (file) {
          const formData = new FormData();
          // console.log(blobInfo.filename());
          formData.append("file", file);
          fetch("http://localhost:3000/files/upload", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              callback(result.url, { title: file.name });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
      input.click();
    }
  },
  // // // 自定义返回视频标签数据
  video_template_callback: (data) => {
    console.log(data, "数据");
    return `<video width="${data.width}" controls="controls" poster="${data.poster}">
    <source src="${data.source}" type="video/mp4" />
    您的浏览器不支持 HTML5 视频标签。
  </video>`;
  },
};
</script>

<style>
/* 可选的样式 */
</style>
