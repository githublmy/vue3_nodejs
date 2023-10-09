<template>
  <div class="sign">
    <el-row :gutter="20">
      <el-col :span="20">
        <canvas
          id="canvas"
          :width="signConfig.width"
          :height="signConfig.height"
          @mouseleave="mouseleave"
          @mousedown="mousedown"
          @mousemove="mousemove"
        >
          你的浏览器不支持 canvas，请升级你的浏览器。
        </canvas>
      </el-col>
      <el-col :span="4">
        <el-form
          :model="signConfig"
          ref="form"
          label-width="80px"
          :inline="false"
        >
          <el-form-item label="背景颜色" prop="fillStyle">
            <el-color-picker
              v-model="signConfig.fillStyle"
              size="large"
              show-alpha
            />
          </el-form-item>
          <el-form-item label="画笔颜色" prop="color">
            <el-color-picker
              v-model="signConfig.color"
              size="large"
              show-alpha
            />
          </el-form-item>
          <el-form-item label="画笔粗细" prop="lineWidth">
            <el-input-number
              v-model="signConfig.lineWidth"
              :min="0"
              step-strictly
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="primary" size="small" @click="">上一步</el-button>
        <el-button type="primary" size="small" @click="">清空</el-button>
        <el-button type="primary" size="small" @click="">保存图片</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const signConfig = reactive({
  width: 800,
  height: 300,
  fillStyle: "#FFFFFF", //画布背景颜色
  color: "#000", //画笔颜色
  lineWidth: 3, //画笔粗细
});
const handleCanvas = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  console.log(canvas, ctx);
};
const mouseleave = () => {};
const mousedown = (e: MouseEvent) => {
  console.log(e);
};
const mousemove = (e: MouseEvent) => {
  console.log(e);
};
onMounted(() => {
  handleCanvas();
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
