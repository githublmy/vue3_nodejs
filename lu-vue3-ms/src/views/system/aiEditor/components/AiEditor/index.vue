<template>
  <div ref="divRef" style="height: 600px" />
</template>

<script setup lang="ts">
import { AiEditor } from 'aieditor'
import 'aieditor/dist/style.css'

const divRef = ref()
let aiEditor: AiEditor | null = null

onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: '点击输入内容...',
    content: 'AiEditor 是一个面向 AI 的开源富文本编辑器。',
    ai: {
      models: {
        spark: {
          appId: 'dfdac22b',
          apiKey: '0af44f660c0f341e32d985cff08e2205',
          apiSecret: 'NzdlMDBiZTA4ZmU5NWY0NmMzNmYyZTRj'
        }
      },
      bubblePanelEnable: true,
      bubblePanelModel: 'spark',
      codeBlock: {
        codeComments: {
          model: 'spark',
          prompt: '帮我对这个代码添加一些注释，并返回添加注释的代码，只返回代码'
        },
        codeExplain: {
          model: 'spark',
          prompt: '帮我对这个代码进行解释，返回代码的解释内容，注意，不需要对代码的注释进行解释'
        }
      }
    }
  })
})

onUnmounted(() => {
  aiEditor && aiEditor.destroy()
})
</script>
