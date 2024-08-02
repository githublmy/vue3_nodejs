!function () {
  "use strict";

  function formatSize(bytes, decimals = 2) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB", "P", "E", "Z", "Y"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
  }

  function openFileDialog(callback) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "*/*");
    input.setAttribute("multiple", "multiple");
    input.onchange = function (event) {
      const files = event.target.files;
      if (callback) callback(files);
    };
    input.click();
    input.remove();
  }

  function triggerDownload(url) {
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = url;
    link.rel = "noreferrer noopener";
    const event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
    document.body.removeChild(link);
  }

  function registerAttachmentPlugin(editor) {
    if (!editor.ui.registry.getAll().icons.attachment) {
      editor.ui.registry.addIcon("attachment", `
              <svg t="1722041367758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7661" width="20" height="20"><path d="M692.649 322.827s24.674-32.9 0-57.574c-32.9-32.9-65.8-8.225-65.8-8.225L306.08 577.8c-57.575 57.574-57.575 139.823 0 197.398 57.574 57.574 139.823 57.574 197.397 0l386.57-386.57c90.474-90.474 90.474-230.298 0-320.772-90.474-90.473-230.297-90.473-320.77 0L158.03 479.1c-123.373 123.374-123.373 328.996 0 452.37 123.374 123.373 328.996 123.373 452.37 0l279.646-279.647s24.675-32.9-8.225-65.799c-32.9-32.9-57.574 0-57.574 0L544.6 865.671c-90.473 90.474-230.297 90.474-320.77 0-90.475-90.474-90.475-230.298 0-320.771l411.244-411.245c57.575-57.575 139.824-57.575 197.398 0 57.574 57.574 57.574 139.823 0 197.397l-386.57 386.57c-16.45 16.45-49.35 16.45-65.8 0-16.45-16.45-16.45-49.349 0-65.799L692.65 322.827z" fill="#1296db" p-id="7662"></path></svg>
          `);
    }
    editor.ui.registry.addButton("attachment", {
      icon: "attachment",
      tooltip: "插入附件",
      onAction: function () {
        openFileDialog(function (files) {
          handleFiles(editor, files);
        });
      }
    });
    editor.ui.registry.addMenuItem("attachment", {
      icon: "attachment",
      text: "插入附件",
      onAction: function () {
        openFileDialog(function (files) {
          handleFiles(editor, files);
        });
      }
    });
    editor.ui.registry.addButton("attachment-download", {
      text: "下载",
      onAction: function () {
        const url = getAttachmentUrl(editor);
        triggerDownload(url);
      }
    });
    editor.ui.registry.addContextToolbar("attachment", {
      predicate: function (node) {
        return !!findAttachment(editor, node);
      },
      items: "attachment-download",
      position: "node",
      scope: "node"
    });
  }

  function handleFiles(editor, files) {
    const maxSize = editor.getParam("attachment_max_size") || 209715200;
    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        const sizeStr = formatSize(maxSize);
        editor.notificationManager.open({
          text: `附件大小超出 ${sizeStr}`,
          type: "error",
          timeout: 5000
        });
      } else {
        const uploadHandler = editor.getParam("attachment_upload_handler");
        const assetsPath = editor.getParam("attachment_assets_path") || "icons";
        const uniqueId = editor.dom.uniqueId();
        const attachmentId = `attachment_${uniqueId}`;
        const fileSize = formatSize(file.size);
        const fileIcon = getFileIcon(file.name, assetsPath);
        const loadingIcon = `${assetsPath}/loading.gif`;
        const errorIcon = `${assetsPath}/error.png`;

        const progressElement = createProgressElement(editor, {
          id: uniqueId,
          icon: loadingIcon,
          title: file.name,
          size: fileSize
        });
        editor.dom.setHTML(editor.selection.getNode(), progressElement.outerHTML);

        uploadHandler(file, function (response) {
          const successElement = createAttachmentElement(editor, {
            id: uniqueId,
            icon: fileIcon,
            title: file.name,
            size: fileSize,
            src: response.url
          });
          editor.dom.setHTML(editor.selection.getNode(), successElement.outerHTML);
        }, function (error) {
          const errorElement = createAttachmentElement(editor, {
            icon: errorIcon,
            title: file.name,
            size: fileSize,
            message: error
          });
          editor.dom.setHTML(editor.selection.getNode(), errorElement.outerHTML);
        }, function (progress) {
          const progressElement = document.querySelector(`#progress_${uniqueId}`);
          if (progressElement) {
            progressElement.innerText = `${progress}%`;
          }
        });
      }
    });
  }

  function createProgressElement(editor, data) {
    const img = document.createElement("img");
    img.setAttribute("src", data.icon);
    const progressSpan = document.createElement("span");
    progressSpan.setAttribute("id", `progress_${data.id}`);
    progressSpan.innerText = "0%";
    const infoSpan = document.createElement("span");
    infoSpan.innerText = `${data.title} (${data.size})`;
    const container = editor.dom.create("span", {
      id: `attachment_${data.id}`,
      class: "attachment upload_progress"
    });
    container.appendChild(img);
    container.appendChild(progressSpan);
    container.appendChild(infoSpan);
    container.contentEditable = "false";
    return container;
  }

  function createAttachmentElement(editor, data) {
    const img = document.createElement("img");
    img.setAttribute("src", data.icon);
    const link = document.createElement("a");
    link.innerText = `${data.title} (${data.size})`;
    link.setAttribute("href", data.src || "#");
    const container = editor.dom.create("span", {
      id: `attachment_${data.id}`,
      class: "attachment"
    });
    container.appendChild(img);
    container.appendChild(link);
    container.contentEditable = "false";
    return container;
  }

  function getFileIcon(fileName, assetsPath) {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const fileIcons = [
      { ext: "txt", icon: "file_type_text" },
      { ext: "doc", icon: "file_type_word2" },
      { ext: "docx", icon: "file_type_word2" },
      { ext: "pdf", icon: "file_type_pdf2" },
      { ext: "xls", icon: "file_type_excel2" },
      { ext: "xlsx", icon: "file_type_excel2" },
      { ext: "ppt", icon: "file_type_powerpoint2" },
      { ext: "pptx", icon: "file_type_powerpoint2" },
      { ext: "ai", icon: "file_type_ai2" },
      { ext: "psd", icon: "file_type_photoshop2" },
      { ext: "zip", icon: "file_type_zip" },
      { ext: "rar", icon: "file_type_zip" },
      { ext: "jpg", icon: "file_type_image" },
      { ext: "jpeg", icon: "file_type_image" },
      { ext: "png", icon: "file_type_image" },
      { ext: "gif", icon: "file_type_image" },
      { ext: "js", icon: "file_type_js" },
      { ext: "xml", icon: "file_type_xml" },
      { ext: "htm", icon: "file_type_html" },
      { ext: "html", icon: "file_type_html" },
      { ext: "json", icon: "file_type_light_json" },
      { ext: "fon", icon: "file_type_light_font" },
      { ext: "font", icon: "file_type_light_font" },
      { ext: "svg", icon: "file_type_image" },
      { ext: "exe", icon: "file_type_binary" },
      { ext: "bin", icon: "file_type_binary" },
      { ext: "dll", icon: "file_type_binary" },
      { ext: "pkg", icon: "file_type_package" },
      { ext: "wav", icon: "file_type_audio" },
      { ext: "mp3", icon: "file_type_audio" },
      { ext: "mp4", icon: "file_type_video" },
      { ext: "mov", icon: "file_type_video" },
      { ext: "avi", icon: "file_type_video" },
      { ext: "java", icon: "file_type_java" },
      { ext: "cs", icon: "file_type_csharp" },
      { ext: "css", icon: "file_type_css" },
      { ext: "py", icon: "file_type_python" },
      { ext: "sln", icon: "file_type_vscode3" },
      { ext: "go", icon: "file_type_go" },
      { ext: "7z", icon: "file_type_zip" },
      { ext: "sketch", icon: "file_type_sketch" },
      { ext: "patch", icon: "file_type_patch" },
      { ext: "org", icon: "file_type_org" },
      { ext: "md", icon: "file_type_markdown" },
      { ext: "jar", icon: "file_type_jar" },
      { ext: "dmg", icon: "file_type_dmg" },
      { ext: "accdb", icon: "file_type_access" },
      { ext: "apk", icon: "file_type_apk" },
      { ext: "eps", icon: "file_type_eps" },
      { ext: "ico", icon: "file_type_ico" },
      { ext: "iso", icon: "file_type_iso" },
      { ext: "key", icon: "file_type_keynote" },
      { ext: "numbers", icon: "file_type_number" },
      { ext: "reg", icon: "file_type_reg" },
      { ext: "rp", icon: "file_type_rp" },
      { ext: "rtf", icon: "file_type_rtf" },
      { ext: "sketch", icon: "file_type_sketch" },
      { ext: "swf", icon: "file_type_swf" },
      { ext: "url", icon: "file_type_url" },
      { ext: "wma", icon: "file_type_wma" },
      { ext: "xmind", icon: "file_type_xmind" },
      { ext: "cat", icon: "file_type_cat" }
    ];
    const fileIcon = fileIcons.find(icon => icon.ext === fileExtension);
    return fileIcon ? `${assetsPath}/${fileIcon.icon}.svg` : `${assetsPath}/default_file.svg`;
  }

  function findAttachment(editor, node) {
    return editor.dom.getParent(node, 'span[class="attachment"]');
  }

  function getAttachmentUrl(editor) {
    const node = editor.selection.getNode();
    const href = node.querySelector('a[href]');
    return href ? href.getAttribute('href') : "#";
  }

  tinymce.PluginManager.add("attachment", function (editor) {
    registerAttachmentPlugin(editor);

    editor.addCommand("mceAttachment", function () {
      openFileDialog(function (files) {
        handleFiles(editor, files);
      });
    });

    editor.on("drop", function (event) {
      const dataTransfer = event.dataTransfer;
      if (dataTransfer) {
        const files = dataTransfer.files;
        if (files) {
          Array.from(files).forEach(file => {
            if (!/\.(gif|jpe?g|png)$/i.test(file.name)) {
              handleFiles(editor, [file]);
            }
          });
        }
      }
    });
  });
}();
