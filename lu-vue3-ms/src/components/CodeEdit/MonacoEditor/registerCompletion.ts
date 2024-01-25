import monaco from 'monaco-editor'
export const OPTIONS_BASE: monaco.editor.IStandaloneEditorConstructionOptions = {
  value: '', // 初始显示文字
  lineNumbers: 'on', // 是否展示行号 'off' | 'on
  automaticLayout: false, // 自适应布局 默认true
  minimap: {
    enabled: false
  },
  tabSize: 2,
  fontSize: 16
}
