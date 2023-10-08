<template>
  <div class="sign">
    <canvas id="canvas" width="600" height="400">
      你的浏览器不支持 canvas，请升级你的浏览器。
    </canvas>
    颜色：<input type="color" class="inclolor" /> 画笔粗细：<input
      type="number"
      value="1"
      class="inNumber"
    />
    <button id="preLine">撤回</button>
    <button id="btn">清空</button>
    <button id="saveImg">保存</button>
  </div>
</template>

<script lang="ts" setup>
onMounted(() => {
  class Sign {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    color: string;
    lineWidth: number;
    preLine: number;
    preX: number;
    preY: number;
    constructor() {
      this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
      this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
      this.ctx.fillStyle = "#fff";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.color = "#000";
      this.lineWidth = 1;
      this.preLine = 0;
      this.preX = 0;
      this.preY = 0;
    }
    draw(x: number, y: number) {
      // 设置线条颜色
      this.ctx.strokeStyle = this.color;
      // 设置线条宽度
      this.ctx.lineWidth = this.lineWidth;
      // 开始路径
      this.ctx.beginPath();
      // 移动画笔到指定位置
      this.ctx.moveTo(this.preX, this.preY);
      // 绘制线条
      this.ctx.lineTo(x, y);
      // 绘制线条
      this.ctx.stroke();
    }
  }

  const s = new Sign();
  s.draw(150, 140);
  console.log(s.draw(5, 9));
});
</script>
<style lang="scss" scoped>
.sign {
  padding: 20px;
  #canvas {
    border: 1px solid #ccc;
    background-color: #fcfcfc;
  }
}
</style>
