
tinymce.PluginManager.add("mycustomplugin", function (editor, url) {
  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
  editor.ui.registry.getAll().icons.mycustomplugin || editor.ui.registry.addIcon('mycustomplugin', '<svg t="1722041367758" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7661" width="24" height="24"><path d="M692.649 322.827s24.674-32.9 0-57.574c-32.9-32.9-65.8-8.225-65.8-8.225L306.08 577.8c-57.575 57.574-57.575 139.823 0 197.398 57.574 57.574 139.823 57.574 197.397 0l386.57-386.57c90.474-90.474 90.474-230.298 0-320.772-90.474-90.473-230.297-90.473-320.77 0L158.03 479.1c-123.373 123.374-123.373 328.996 0 452.37 123.374 123.373 328.996 123.373 452.37 0l279.646-279.647s24.675-32.9-8.225-65.799c-32.9-32.9-57.574 0-57.574 0L544.6 865.671c-90.473 90.474-230.297 90.474-320.77 0-90.475-90.474-90.475-230.298 0-320.771l411.244-411.245c57.575-57.575 139.824-57.575 197.398 0 57.574 57.574 57.574 139.823 0 197.397l-386.57 386.57c-16.45 16.45-49.35 16.45-65.8 0-16.45-16.45-16.45-49.349 0-65.799L692.65 322.827z" fill="#1296db" p-id="7662"></path></svg>');

  // 文件大小格式化函数
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
  };

  // 注册自定义上传函数选项
  editor.options.register('customUploadFunction', {
    processor: 'function',
  });
  const _handle_upload = editor.options.get("customUploadFunction");
  editor.ui.registry.addToggleButton('mycustomplugin', {
    icon: 'mycustomplugin',
    tooltip: "附件上传",
    onAction: function () {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);

          // const progressNotification = editor.notificationManager.open({
          //   text: 'Uploading...',
          //   type: 'info',
          //   progressBar: true,
          //   closeButton: true,
          // });

          // 获取文件名称和大小
          const fileName = file.name;
          const fileSize = formatFileSize(file.size);

          // 插入百分比进度占位符
          const attachmentId = `my_attachment_${new Date().getTime()}`;
          const progressId = `progress-${new Date().getTime()}`;
          editor.insertContent(`<span id="${attachmentId}" contenteditable="false"> ${fileName} (${fileSize}) : <span id="${progressId}">0%</span> </span>`);
          // 进度条
          const progressElement = editor.getDoc().getElementById(progressId)
          // 元素id
          const attachmentElement = editor.getDoc().getElementById(attachmentId)
          // console.log(editor.getDoc());
          // 使用注册的自定义上传函数
          const uploadFunction = editor.options.get('customUploadFunction');
          const response = await uploadFunction(file,
            (progress) => {
              // 上传进度
              editor.dom.setHTML(progressElement, `${progress}`);
            },
            (url) => {
              // 上传成功
              // 添加a链接
              editor.dom.setHTML(attachmentElement, ` <a download=${fileName} href="${url}">${fileName} (${fileSize})</a> `);
              // 设置内容可编辑
              // editor.dom.setAttribs(attachmentElement, {
              //   contenteditable: 'true',
              // });
              // 获取a元素并设置属性
              const aElement = editor.getDoc().getElementById(attachmentId).querySelector("a")


              // 获取 a 元素并添加点击事件监听
              if (aElement) {
                editor.dom.setAttribs(aElement, {
                  style: 'text-decoration:none;',
                  target: '_blank'
                });
                // 显示下载按钮
                showDownloadButton(editor, aElement);
              }
            });

        }
      }

      input.click();
    },
  });
  // 显示下载按钮
  const showDownloadButton = (editor, aElement) => {
    // 创建一个下载按钮
    const downloadButton = editor.dom.create('button', {
      textContent: 'Download',
      style: 'position: absolute; z-index: 1000; pointer-events: auto; display: block; margin-top: 5px;'
    });

    // 插入按钮到文档中
    editor.dom.insertAfter(downloadButton, aElement);

    // 添加箭头样式
    const arrow = editor.dom.create('div', {
      style: 'width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 5px solid black; margin: 0 auto;'
    });
    editor.dom.insertAfter(arrow, aElement);

    // 添加下载功能
    editor.dom.bind(downloadButton, 'click', () => {
      const a = document.createElement('a');
      a.href = aElement.getAttribute('href');
      a.download = aElement.getAttribute('download');
      a.click();

      // 移除下载按钮和箭头
      editor.dom.remove(downloadButton);
      editor.dom.remove(arrow);
    });

    // 添加事件监听以隐藏按钮
    const hideDownloadButton = (e) => {
      if (!downloadButton.contains(e.target) && e.target !== aElement) {
        editor.dom.remove(downloadButton);
        editor.dom.remove(arrow);
        editor.off('click', hideDownloadButton);
      }
    };

    // 注册点击事件以隐藏按钮
    editor.on('click', hideDownloadButton);
  };
});