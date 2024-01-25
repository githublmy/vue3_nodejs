/*
 * @Description: 编辑器的数据类型
 */
import * as monaco from 'monaco-editor'

export type Monaco_Lg_com =
  | monaco.languages.CompletionItemKind.Keyword
  | monaco.languages.CompletionItemKind.Operator
  | monaco.languages.CompletionItemKind.Function
  | monaco.languages.CompletionItemKind.Variable

export interface ISG {
  label: string
  kind: Monaco_Lg_com
  insertText: string
}
type Theme = 'vs' | 'vs-dark' | 'hc-black' | 'hc-light' //主题

export interface IDefaultOptions {
  value: string //默认值
  roundedSelection: boolean // 右侧不显示编辑器预览框
  autoIndent: boolean // 自动缩进
  diffWordWrap: boolean
  wordWrap: string //自动换行 on  off
  scrollbar: {
    verticalScrollbarSize: number //滚动条大小
  }
  theme: Theme // 主题"vs" | "vs-dark" | "hc-black" | "hc-light"
  language: 'typescript'
  renderLineHighlight: 'gutter'
  folding: true // 是否折叠
  foldingHighlight: true // 折叠等高线
  foldingStrategy: 'indentation' // 折叠方式  auto | indentation
  showFoldingControls: 'always' // 是否一直显示折叠 always | mouseover
  disableLayerHinting: true // 等宽优化
  emptySelectionClipboard: false // 空选择剪切板
  selectionClipboard: false // 选择剪切板
  automaticLayout: true // 自动布局
  codeLens: true // 代码镜头
  scrollBeyondLastLine: false // 滚动完最后一行后再滚动一屏幕
  colorDecorators: true // 颜色装饰器
  accessibilitySupport: 'on' // 辅助功能支持  "auto" | "off" | "on"
  lineNumbers: 'on' // 行号 取值： "on" | "off" | "relative" | "interval" | function
  lineNumbersMinChars: 5 // 行号最小字符   number
  enableSplitViewResizing: false
  readOnly: false //是否只读  取值 true | false
}
