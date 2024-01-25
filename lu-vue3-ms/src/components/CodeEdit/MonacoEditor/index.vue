<template>
  <div>
    <el-select v-model="language" filterable @change="changeLanguage">
      <el-option v-for="item in languageOptions" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
    <el-select v-model="theme" filterable @change="changeTheme">
      <el-option v-for="item in themeOptions" :key="item" :label="item" :value="item"> </el-option>
    </el-select>
    <el-button @click="formmatter">格式化</el-button>
    <div
      ref="codeEditBox"
      class="monaco-editor"
      v-adaptive="{ bottomOffset: 0 }"
      style="width: 100%"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import * as monaco from 'monaco-editor'
import './worker'
// 1. 引入monaco-editor中的sql文件
import { language as sqlLanguage } from 'monaco-editor/esm/vs/basic-languages/sql/sql.js'
//右键菜单
import * as actions from 'monaco-editor/esm/vs/platform/actions/common/actions'
const menus = actions.MenuRegistry._menuItems
// 注意 entry[0].id
const contextMenuEntry = [...menus].find((entry) => entry[0].id == 'EditorContext')
const contextMenuLinks = contextMenuEntry[1]

// 右键菜单ids
const removableIds = [
  'editor.action.clipboardCutAction',
  'editor.action.clipboardCopyAction',
  'editor.action.clipboardPasteAction',
  'editor.action.refactor',
  'editor.action.sourceAction',
  'editor.action.revealDefinition',
  'editor.action.revealDeclaration',
  'editor.action.goToTypeDefinition',
  'editor.action.goToImplementation',
  'editor.action.goToReferences',
  'editor.action.formatDocument',
  'editor.action.formatSelection',
  'editor.action.changeAll',
  'editor.action.rename',
  'editor.action.quickOutline',
  'editor.action.quickCommand',
  'Peek'
]

let removeById = (list: { _first: any; _remove: (arg0: any) => void }, ids: string[]) => {
  let node = list._first
  do {
    // 注意 node.element?.command?.id || node.element?.title 的用法
    let shouldRemove = ids.includes(node.element?.command?.id || node.element?.title)
    if (shouldRemove) {
      list._remove(node)
    }
  } while ((node = node.next))
}
//移除默认菜单
removeById(contextMenuLinks, removableIds)
// 自定义右键菜单
monaco.editor.addEditorAction({
  id: 'editor.action.formatDocument',
  label: '格式化文档',
  contextMenuGroupId: 'navigation',
  run: function () {
    formmatter()
  }
})

const language = ref('javascript') //当前语言
const theme = ref('vs-dark') //当前主题

const languageOptions = [
  'javascript',
  'typescript',
  'sql',
  'python',
  'cpp',
  'csharp',
  'go',
  'html',
  'css',
  'less',
  'scss',
  'json',
  'markdown',
  'vue',
  'markup-webview',
  'php',
  'ruby',
  'rust',
  'swift',
  'kotlin',
  'ballerina',
  'perl',
  'r',
  'dart',
  'apex',
  'groovy',
  'pascal',
  'basic'
]
const themeOptions = ['vs', 'vs-dark', 'hc-black', 'hc-light']
// 定义编辑器
let monacoEditor: {
  [x: string]: any
  getModel: () => any
  dispose: () => void
}
// 切换语言，设置语言类型
const changeLanguage = () => {
  monaco.editor.setModelLanguage(monacoEditor.getModel(), language.value)
}
//切换主题
const changeTheme = () => {
  monaco.editor.setTheme(theme.value)
}
// 格式化文档
const formmatter = () => {
  monacoEditor.getAction('editor.action.formatDocument').run()
}
// 编辑器dom
const codeEditBox = ref()
// 编辑器基础配置
const defaultOptions: any = reactive({
  value: '', //默认值
  roundedSelection: false, // 右侧不显示编辑器预览框
  autoIndent: true, // 自动缩进
  diffWordWrap: true,
  wordWrap: 'on',
  scrollbar: {
    verticalScrollbarSize: 0
  },
  theme: 'vs-dark', // 主题"vs" | "vs-dark" | "hc-black" | "hc-light"
  language: 'javascript',
  renderLineHighlight: 'gutter', // 'all' | 'line' | 'none' | 'gutter'
  folding: true, // 是否折叠
  foldingHighlight: true, // 折叠等高线
  foldingStrategy: 'indentation', // 折叠方式  auto | indentation
  showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
  disableLayerHinting: true, // 等宽优化
  emptySelectionClipboard: false, // 空选择剪切板
  selectionClipboard: false, // 选择剪切板
  automaticLayout: true, // 自动布局
  codeLens: true, // 代码镜头
  scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
  colorDecorators: true, // 颜色装饰器
  accessibilitySupport: 'on', // 辅助功能支持  "auto" | "off" | "on"
  lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
  lineNumbersMinChars: 5, // 行号最小字符   number
  enableSplitViewResizing: false,
  readOnly: false //是否只读  取值 true | false
})

onMounted(() => {
  init()
})
type Monaco_Lg_com =
  | monaco.languages.CompletionItemKind.Keyword
  | monaco.languages.CompletionItemKind.Operator
  | monaco.languages.CompletionItemKind.Function
  | monaco.languages.CompletionItemKind.Variable
interface ISG {
  label: string
  kind: Monaco_Lg_com
  insertText: string
}
function init() {
  monacoEditor = monaco.editor.create(codeEditBox.value, defaultOptions)
  monaco.languages.registerCompletionItemProvider('sql', {
    provideCompletionItems: (): any => {
      const suggestions: ISG[] = []
      sqlLanguage.keywords.forEach((item: string) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: item
        })
      })
      sqlLanguage.operators.forEach((item: string) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Operator,
          insertText: item
        })
      })
      sqlLanguage.builtinFunctions.forEach((item: string) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: item
        })
      })
      sqlLanguage.builtinVariables.forEach((item: string) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: item
        })
      })
      return {
        suggestions
      }
    }
  })
}

onBeforeMount(() => {
  // 销毁实例
  if (monacoEditor) {
    monacoEditor.dispose()
  }
})
defineExpose({})
</script>
