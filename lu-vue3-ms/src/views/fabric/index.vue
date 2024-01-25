<template>
  <div class="baseStyle">
    <canvas width="1000" height="600" id="canvasContainer" style="border: 1px solid #ccc"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { fabric } from 'fabric'
let canvas: fabric.Canvas | null = null
console.log(fabric)

function init() {
  canvas = new fabric.Canvas('canvasContainer', {
    isDrawingMode: true //开启自由绘图模式true | false
  }) // 这里传入的是canvas的id
  // 设置画笔颜色
  canvas.freeDrawingBrush.color = '#11999e'

  // 设置画笔粗细
  canvas.freeDrawingBrush.width = 10

  // 画笔投影
  canvas.freeDrawingBrush.shadow = new fabric.Shadow({
    blur: 10,
    offsetX: 10,
    offsetY: 10,
    affectStroke: true,
    color: '#30e3ca'
  })
  // 创建一个长方形
  // const rect = new fabric.Rect({
  //   top: 30, // 距离容器顶部 30px
  //   left: 30, // 距离容器左侧 30px
  //   width: 100, // 宽 100px
  //   height: 60, // 高 60px
  //   fill: "#f00", // 填充 红色
  // });

  // // 在canvas画布中加入矩形（rect）。add是“添加”的意思
  // canvas.add(rect);
  console.log(canvas)
}

onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped></style>
