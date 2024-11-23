tinymce.PluginManager.add('codemirror', function (editor, url) {
  editor.ui.registry.addButton('codemirror', {
    text: '查看源代码',
    onAction: function () {
      const content = editor.getContent();
      openHtmlDialog(content);
    }
  });
});

function openHtmlDialog(content) {
  console.log(content);

  // HTML 对话框结构
  const dialogHtml = '<textarea id="codeMirrorEditor" style="width:100%; height:300px;"></textarea>';

  // 使用TinyMCE自带的对话框
  tinymce.activeEditor.windowManager.open({
    title: '查看源代码',
    body: {
      type: 'panel',
      items: [
        {
          type: 'htmlpanel',
          html: dialogHtml
        }
      ]
    },
    buttons: [
      { type: 'cancel', text: '关闭' },
      {
        type: 'submit',
        text: '格式化',
        onClick: () => {
          const editorInstance = document.getElementById('codeMirrorEditor');
          console.log(editorInstance);

          const formattedContent = formatHTML(editorInstance.value);
          editorInstance.value = formattedContent;
          editor.setValue(formattedContent);  // 更新原TinyMCE内容
        }
      }
    ],
    onOpen: () => {
      const editor = CodeMirror.fromTextArea(document.getElementById('codeMirrorEditor'), {
        mode: 'text/html',
        lineNumbers: true,
        theme: 'default'
      });
      editor.setValue(content);
    }
  });
}

// 示例格式化函数（可以使用其他更强大的库）
function formatHTML(html) {
  return html.replace(/></g, '>\n<').trim(); // 简单格式化
}
