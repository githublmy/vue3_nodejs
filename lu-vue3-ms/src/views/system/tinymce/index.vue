<template>
  <div>
    <Editor
      v-model="content"
      api-key="aawnz0o8kigy7ia1ztfgziay1bsnneafniczu0c571v20cmz"
      :init="tinymceConfig"
      @input="onEditorInput"
    ></Editor>
    <!-- <div>
      <h3>Output HTML:</h3>
      <div v-html="content"></div>
    </div> -->
  </div>
</template>

<script setup>
import Editor from "@tinymce/tinymce-vue";
import "tinymce/tinymce";

const content = ref("<div style='color: red'>Initial content</div>");
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
  height: 400,
  width: "100%",
  placeholder: "请输入内容",
  promotion: false, //菜单右上角的链接
  branding: false, //右下角tinymce商标
  language: "zh_CN",
  // true 默认（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
  resize: true,
  skin_url: "/skins/ui/tinymce-5", //手动引入

  //sliding
  toolbar_mode: "wrap",
  toolbar_sticky: true,
  // editimage_cors_hosts: ["picsum.photos"],
  plugins: `preview indent2em importcss searchreplace autolink autosave save directionality
     code visualblocks visualchars fullscreen image link media codesample table charmap
     pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap
     quickbars emoticons accordion`,
  // menubar: "file edit view insert format tools help",
  menubar: "file edit view insert format help",
  toolbar: `undo redo | styleselect formatselect fontselect fontsizeselect removeformat |
     blocks fontfamily fontsize | bold italic underline strikethrough subscript superscript hr blockquote |
     forecolor backcolor | align numlist bullist | link image media | table | lineheight indent2em outdent indent |
     charmap emoticons | accordion accordionremove | code codesample | fullscreen preview | save print |
     pagebreak anchor  | ltr rtl | wordcount`,
  font_size_formats:
    "12px 14px 16px 18px 20px 21px 22px 24px 28px 36px 48px 56px 72px",
  font_family_formats:
    "默认字体=Helvetica,sans-serif;微软雅黑=Microsoft YaHei,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
  // style_formats: [
  //   { title: "首行缩进", block: "p", styles: { "text-indent": "2em" } },
  // ],
  // style_formats_merge: true,
  // style_formats_autohide: true,
  importcss_append: true, //显示额外功能
  quickbars_image_toolbar: "alignleft aligncenter alignright | imageoptions",
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
      editor.setContent(`<h3 style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; color: rgb(51, 51, 51); font-family: Tahoma, Arial, 微软雅黑, sans-serif; line-height: 26px;">
        <strong><span
                style="color: rgb(51, 102, 51); font-family: 微软雅黑; font-size: 22px; line-height: 22px; white-space: pre-wrap;">Ⅰ</span></strong><strong
            style="color: rgb(51, 102, 51); font-family: 微软雅黑; font-size: 22px; line-height: 22px; white-space: pre-wrap;">芯片特点——NFC标签</strong><br><strong><u>—————————<strong>—————</strong>———————————————————————————————————</u></strong><strong
            style="color: rgb(51, 102, 51);"><u>———</u></strong><strong
            style="color: rgb(51, 102, 51);"><u>—</u></strong><strong
            style="color: rgb(51, 102, 51);"><u>——</u></strong><strong
            style="color: rgb(51, 102, 51);"><u>—</u></strong><strong style="color: rgb(51, 102, 51);"><u>—</u></strong>
    </h3>
    <h3 style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; color: rgb(51, 51, 51); font-family: Tahoma, Arial, 微软雅黑, sans-serif; line-height: 26px;">
        <span style="font-size: 16px;">●非接触式的能源和数据传输</span><br><span
            style="font-size: 16px;">●工作效率位13.56MHz</span><br><span style="font-size: 16px;">●</span><span
            style="font-size: 16px;">数据传输速率为106kbit/s</span><br><span style="font-size: 16px;">●</span><span
            style="font-size: 16px;">数据完整性为16位CRC，奇偶校验，位编码，位计数</span><br><span
            style="font-size: 16px;">●</span><span
            style="font-size: 16px;">工作距离可达100毫米（取决于各种参数，如场强和天线几何形状）</span><br><span
            style="font-size: 16px;">●</span><span
            style="font-size: 16px;">7字节序列号（根据ISO/IEC14443-3协议）</span><br><span
            style="font-size: 16px;">●</span><span
            style="font-size: 16px;">用于自动序列化NDEF消息的UID ASCⅡ镜像&nbsp;</span><br><span
            style="font-size: 16px;">●</span><span style="font-size: 16px;">在读命令时触发自动NFC计数器</span><br><span
            style="font-size: 16px;">●</span><span style="font-size: 16px;">快速读取功能允许使用一个FAST-READ命令扫描完整的NDEF消息，从而减少高吞吐量生产环境的开销</span>
    </h3>
    <br>
    <p><span style="color: rgb(51, 102, 51);"><span
            style="font-family: 微软雅黑; font-size: 22px; line-height: 22px; white-space: pre-wrap;"><strong>Ⅱ 技术参数</strong></span></span><strong
            style="color: rgb(51, 102, 51); font-family: 微软雅黑; font-size: 22px; line-height: 22px; white-space: pre-wrap;">——NFC标签</strong>
    </p >
    <h3 style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; color: rgb(51, 51, 51); font-family: Tahoma, Arial, 微软雅黑, sans-serif; line-height: 26px;">
        <strong><u>—————————<strong>—————</strong>———————————————————————————————————</u></strong><strong
            style="color: rgb(51, 102, 51);"><u>———</u></strong><strong
            style="color: rgb(51, 102, 51);"><u>—</u></strong><strong
            style="color: rgb(51, 102, 51);"><u>——</u></strong><strong
            style="color: rgb(51, 102, 51);"><u>—</u></strong><strong style="color: rgb(51, 102, 51);"><u>—</u></strong>
    </h3>
    <p>
        <p><strong><strong style="font-size: 18px;">名称：</strong><span
                style="font-size:16px;">NFC标签&nbsp; 直径25mm</span></strong></p >
    </p >
    <span style="font-size: 10px;"><span style="font-size: 16px;">可选芯片：NTAG213</span></span>
    <br><span style="font-size: 16px;">天线尺寸：Φ25mm</span>
    <br><span style="font-size: 16px;">标签尺寸：</span><span style="font-size: 16px;">Φ25mm</span>
    <br><span style="font-size: 16px;">通讯协议：ISO14443A<br>
            工作频率：13.56MHz</span>
    <br><span style="font-size: 16px;">存储容量：144byte</span>
    <br><span style="font-size: 16px;">读写次数：≥10万次</span>
    <br><span style="font-size: 16px;">数据保存：</span><span style="font-size: 16px;">≥10年</span>
    <br><span style="font-size: 16px;">可选面料：无</span>
    <br style="font-size: 16px;"><span style="font-size: 16px;">工作温度：-10℃-65℃</span>
    <br>
    <br>
    <p>
        <p><strong><span style="color: rgb(51, 102, 51);"><span
                style="font-family: 微软雅黑; font-size: 22px; line-height: 22px; white-space: pre-wrap;">Ⅲ 产品展示</span></span></strong><strong
                style="color: rgb(51, 102, 51); font-family: 微软雅黑; font-size: 22px; line-height: 22px; white-space: pre-wrap;">——NFC标签</strong>
        </p >
        <h3 style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; color: rgb(51, 51, 51); font-family: Tahoma, Arial, 微软雅黑, sans-serif; line-height: 26px;">
            <strong><u>—————————<strong>—————</strong>———————————————————————————————————</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>———</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>—</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>——</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>—</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>—</u></strong></h3>
        <p>
            <p><span style="color: rgb(51, 102, 51);"><strong><span
                    style="font-size: 20px;">剖析展示</span></strong></span></p >
        </p >
        <p>
            < img alt="NFC标签  直径25mm产品剖析展示一" src="/uploads/allimg/180702/1-1PF2153111601.jpg"
                 style="width: 700px; height: 500px;">
            <br>
            &nbsp;
        </p >
        <p>
            < img alt="NFC标签  直径25mm产品剖析展示二" src="/uploads/allimg/180702/1-1PF2153123448.jpg"
                 style="width: 700px; height: 500px;">
        </p >
        <p>
            &nbsp;
        </p >
        <p>
            < img alt="NFC标签  直径25mm产品剖析展示三" src="/uploads/allimg/180702/1-1PF2153132L9.jpg"
                 style="width: 700px; height: 500px;">
        </p >
        <p><br><strong style="text-align: center; color: rgb(51, 102, 51);"><span
                style="font-size: 20px;">实拍展示</span></strong></p >
    </p >
    <p>
        < img alt="NFC标签  直径25mm产品实拍展示一" src="/uploads/allimg/180629/1-1P6291452595Z.jpg"
             style="width: 700px; height: 500px;">
        <br>
        &nbsp;
    </p >
    <p>
        < img alt="NFC标签  直径25mm产品实拍展示二" src="/uploads/allimg/180629/1-1P62914530U21.jpg"
             style="width: 700px; height: 500px;">
    </p >
    <p style="text-align: center;">
        &nbsp;
    </p >
    <p>
        < img alt="NFC标签  直径25mm产品实拍展示三" src="/uploads/allimg/180702/1-1PF2153156238.jpg"
             style="width: 700px; height: 500px;">
    </p >
    <p style="text-align: center;">
        &nbsp;
    </p >
    <p>
        < img alt="NFC标签  直径25mm产品实拍展示四" src="/uploads/allimg/180702/1-1PF2153213450.jpg"
             style="width: 700px; height: 500px;">
        <br>
        <h3 style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; color: rgb(51, 51, 51); font-family: Tahoma, Arial, 微软雅黑, sans-serif; line-height: 26px;">
            &nbsp;</h3>
    </p >
    <p>
        <strong><span
                style="color: rgb(51, 102, 51); font-family: 微软雅黑; font-size: 22px; line-height: 22px; white-space: pre-wrap;">Ⅳ生产工艺</span></strong>
        <br>
        <h3 style="margin: 0px; padding: 0px; font-size: 14px; font-weight: normal; color: rgb(51, 51, 51); font-family: Tahoma, Arial, 微软雅黑, sans-serif; line-height: 26px;">
            <strong><u>—————————<strong>—————</strong>———————————————————————————————————</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>———</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>—</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>——</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>—</u></strong><strong
                style="color: rgb(51, 102, 51);"><u>—</u></strong></h3>
    </p >
    <p>
        < img alt="NFC标签  直径25mm产品生产工艺之倒封装" src="/uploads/allimg/180529/1-1P52Z93029D9.jpg"
             style="width: 700px; height: 466px;">
    </p >
    <p>
        &nbsp;
    </p >
    <p>
        < img alt="NFC标签  直径25mm产品生产工艺之分条" src="/uploads/allimg/180529/1-1P52Z9305YV.jpg"
             style="width: 700px; height: 466px;">
    </p >
    <p>
        &nbsp;
    </p >
    <p>
        <img alt="NFC标签  直径25mm产品生产工艺之复合" src="/uploads/allimg/180529/1-1P52Z93124237.jpg"
             style="width: 700px; height: 465px;">
        <br>
        &nbsp;
    </p >
    <p>
        < img alt="NFC标签  直径25mm产品生产工艺之模切" src="/uploads/allimg/180529/1-1P52Z93152c8.jpg"
             style="width: 700px; height: 466px;">
    </p >
    <p>
        &nbsp;
    </p >`);
    });
    editor.on("Change KeyUp", () => {
      // 当编辑器内容改变时，更新 content
      console.log(editor.getContent());
      content.value = editor.getContent();
    });
  },

  // images_upload_url: "https://api.dev.shzjsmart.com:18443/file/api/upload",
  // 图片处理方法
  // images_file_types: ".jpg,.svg,.webp",
  images_reuse_filename: true, //固定名称
  image_title: true, //显示标题
  images_upload_handler: image_upload_handler,

  // // 文件上传
  // file_picker_callback: (callback, value, meta) => {
  //   // Provide file and text for the link dialog
  //   console.log(value);
  //   console.log(meta);
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");

  //   input.addEventListener("change", (e) => {
  //     const file = e.target.files[0];
  //     console.log(file);
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () => {
  //       const id = "blobid" + new Date().getTime();
  //       const blobCache = tinymce.activeEditor.editorUpload.blobCache;
  //       const base64 = reader.result.split(",")[1];
  //       const blobInfo = blobCache.create(id, file, base64);
  //       blobCache.add(blobInfo);

  //       callback(blobInfo.blobUri(), { title: file.name, alt: file.name });
  //     });
  //     reader.readAsDataURL(file);
  //   });

  //   input.click();

  //   // if (meta.filetype == "file") {
  //   //   callback("mypage.html", { text: "My text" });
  //   // }

  //   // // Provide image and alt text for the image dialog
  //   // if (meta.filetype == "image") {
  //   //   callback("myimage.jpg", { alt: "My alt text" });
  //   // }

  //   // // Provide alternative source and posted for the media dialog
  //   // if (meta.filetype == "media") {
  //   //   callback("movie.mp4", { source2: "alt.ogg", poster: "image.jpg" });
  //   // }
  // },
};

function onEditorInput(content) {
  // 处理编辑器输入事件，更新 content
  console.log(content);
  content.value = content;
}
</script>

<style>
/* 可选的样式 */
</style>
