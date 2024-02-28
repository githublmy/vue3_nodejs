<template>
  <div ref="divRef" style="height: 100%">
    <!-- <div class="aie-container">
      <div class="aie-container-header"></div>
      <div class="aie-container-main"></div>
      <div class="aie-container-footer">
        <div class="footer">
          <div>编辑器</div>
          <div>字数:{{ count }}</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { AiEditor } from 'aieditor'
import 'aieditor/dist/style.css'

const divRef = ref()
let aiEditor: AiEditor | null = null

const count = ref<number>(0)
onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: '点击输入内容...',
    content: `AiEditor 是一个面向 AI 的开源富文本编辑器。`,
    editable: true,
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
    },
    onChange: (aiEd) => {
      // 监听到用编辑器内容发生变化了，控制台打印编辑器的 html 内容...
      console.log(aiEd.getText())
      getCount()
    }
  })
  getCount()
})
const getCount = () => {
  count.value = aiEditor!.getText().length
}
onUnmounted(() => {
  aiEditor && aiEditor.destroy()
})
</script>
<style lang="scss" scoped>
:deep(.aie-container aie-footer > div) {
  display: none !important;
}
.aie-container-footer {
  height: 20px;
  line-height: 20px;
  // .footer {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   font-size: 14px;
  //   color: #666;
  //   border-top: solid 1px var(--aie-container-border);
  // }
}
</style>
