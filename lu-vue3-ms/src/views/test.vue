<template>
  <el-row class="tac" style="height: 100%">
    <el-col :span="6" style="background-color: aqua; height: 100%">
      <div class="tx">读取数量</div>
      <div class="tx2">48</div>
    </el-col>
    <el-col :span="6" style="background-color: #f8f8f8; height: 100%">
      <div>读取数量</div>
    </el-col>
    <el-col :span="6" style="background-color: aqua; height: 100%">
      <div>读取数量</div>
    </el-col>
    <el-col :span="6" style="background-color: #f8f8f8; height: 100%">
      <div>读取数量</div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
function speak1(text: string) {
  // 停止所有当前的播报
  window.speechSynthesis.cancel();
  var utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.lang = "zh-CN";
  utterance.volume = 1;
  utterance.rate = 1.5;
  utterance.pitch = 1;
  console.log(utterance);
  speechSynthesis.speak(utterance);
}

setTimeout(() => {
  speak1("1号写入完成");
});
setTimeout(() => {
  speak1("2号写入完成");
}, 1000);
setTimeout(() => {
  speak1("3号写入完成");
}, 2000);
setTimeout(() => {
  speak1("4号写入完成");
}, 3000);
</script>
<style lang="scss" scoped>
.tac {
  .tx {
    font-size: calc(1rem + 3vw);
    text-align: center;
  }
  .tx2 {
    font-size: calc(20vw);
    text-align: center;
  }
}
</style>
