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
          @mouseup="mouseup"
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
          <el-form-item label="画布宽度" prop="width">
            <el-input-number v-model="signConfig.width" :min="0" size="small" />
          </el-form-item>
          <el-form-item label="画布高度" prop="height">
            <el-input-number
              v-model="signConfig.height"
              :min="0"
              size="small"
            />
          </el-form-item>
          <el-form-item label="背景颜色" prop="fillStyle">
            <el-color-picker
              v-model="signConfig.fillStyle"
              size="large"
              show-alpha
              @change="changeBgColor"
            />
          </el-form-item>
          <el-form-item label="画笔颜色" prop="color">
            <el-color-picker
              v-model="signConfig.color"
              size="large"
              show-alpha
              @change="setColor"
            />
          </el-form-item>
          <el-form-item label="画笔粗细" prop="lineWidth">
            <el-input-number
              v-model="signConfig.lineWidth"
              :min="0"
              step-strictly
              @change="setLineWidth"
              size="small"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="reset"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="primary" size="small" @click="preStep"
          >上一步</el-button
        >
        <el-button type="primary" size="small" @click="clearCanvas"
          >清空</el-button
        >
        <el-button type="primary" size="small" @click="save"
          >保存图片</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const signConfig = ref({
  width: 800,
  height: 300,
  fillStyle: "#fff", //画布背景颜色
  color: "#000", //画笔颜色
  lineWidth: 4, //画笔粗细
});

// 是否按下状态
let isDown = false,
  canvas: HTMLCanvasElement, //canvas的dom
  ctx: CanvasRenderingContext2D, //canvas实例
  imgDataArr: ImageData[] = []; ////存储线条数据
const handleCanvas = () => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  }) as CanvasRenderingContext2D;
  // console.log(ctx);
  setBgColor();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  setLineWidth();
  setColor();
  // 背景颜色填充整个画布
};
// 设置画笔颜色
const setColor = () => {
  ctx.strokeStyle = signConfig.value.color;
};
// 设置画笔线宽
const setLineWidth = () => {
  ctx.lineWidth = signConfig.value.lineWidth;
};
// 设置背景颜色
const setBgColor = () => {
  ctx.fillStyle = signConfig.value.fillStyle;
};
const reset = () => {
  signConfig.value = {
    ...signConfig.value,
    fillStyle: "#fff", //画布背景颜色
    color: "#000", //画笔颜色
    lineWidth: 4, //画笔粗细
  };
  setBgColor();
  setLineWidth();
  setColor();
};
// 鼠标移出
const mouseleave = () => {
  isDown = false;
};
// 鼠标松开
const mouseup = () => {
  //绘制前记录当前的canvas的x/y坐标，画布的宽高
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // console.log(imgData, "test");
  //存储所有数据
  imgDataArr.push(imgData);
  isDown = false;
};
// 上一步
const preStep = () => {
  if (!imgDataArr.length) return;
  if (imgDataArr.length > 1) {
    const img = imgDataArr.at(-2) as ImageData;
    imgDataArr.pop(); //移除最后一条数据
    // console.log(img);
    ctx.putImageData(img, 0, 0); //填充画布数据
  } else if (imgDataArr.length === 1) {
    imgDataArr.pop(); //移除最后一条数据
    // 最后一步直接清掉画布
    clearCanvas();
  }
};
// 清空画布
function clearCanvas() {
  imgDataArr = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// 保存图片
const save = () => {
  const a = document.createElement("a");
  //图片加载完，再draw 和 toDataURL
  const dataUrl = canvas.toDataURL();
  a.href = dataUrl;
  // 随机字符串名称
  a.download = getRondomStr();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
// 随机字符串
const getRondomStr = (allLen = 36, endLen = -6) => {
  //Math.random() 生成随机数字, eg: 0.123456
  //.toString(36) 转化成36进制 : "0.4fzyo82mvyr"
  //.slice(-6); 截取最后八位 : "y2mvyr"
  return Math.random().toString(allLen).slice(endLen);
};
// 鼠标按下事件
const mousedown = (e: MouseEvent) => {
  // console.log(e, "按下事件");
  ctx.beginPath();
  // 设置绘制的起点为当前点击的位置
  ctx.moveTo(e.offsetX, e.offsetY);
  // 按下状态修改为true
  isDown = true;
};
// 鼠标移动事件
const mousemove = (e: MouseEvent) => {
  // console.log(e);
  if (isDown) {
    ctx.lineTo(e.offsetX, e.offsetY);
    // 描边路径
    ctx.stroke();
  }
};
const changeBgColor = () => {
  setBgColor();
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
