<template>
  <el-row class="tac" style="height: 100%">
    <el-col
      :span="6"
      style="background-color: aqua; height: 100%; overflow-y: auto"
    >
      <div style="height: 3000px">
        <el-button type="primary" size="default" @click="" class="btn"
          >开始写入</el-button
        >

        <div class="tx">读取数量</div>
        <div class="tx2">48</div>
      </div>
    </el-col>
    <el-col
      :span="6"
      style="background-color: #d1cccc; height: 100%; overflow-y: auto"
    >
      <div style="height: 3000px">
        <el-button type="primary" size="default" @click="" class="btn"
          >开始写入</el-button
        >

        <div class="tx">读取数量</div>
        <div class="tx2">48</div>
      </div>
    </el-col>
    <el-col
      :span="6"
      style="background-color: aqua; height: 100%; overflow-y: auto"
    >
      <div style="height: 3000px">
        <el-button type="primary" size="default" @click="" class="btn"
          >开始写入</el-button
        >

        <div class="tx">读取数量</div>
        <div class="tx2">48</div>
      </div>
    </el-col>
    <el-col
      :span="6"
      style="background-color: #d1cccc; height: 100%; overflow-y: auto"
    >
      <div style="height: 3000px">
        <el-button type="primary" size="default" @click="" class="btn"
          >开始写入</el-button
        >
        <div class="tx">读取数量</div>
        <div class="tx2">48</div>
      </div>
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
  utterance.rate = 1.8;
  utterance.pitch = 1;
  console.log(utterance);
  speechSynthesis.speak(utterance);
}

setTimeout(() => {
  speak1("1号完成");
});
setTimeout(() => {
  speak1("2号完成");
}, 1000);
setTimeout(() => {
  speak1("3号完成");
}, 2000);
setTimeout(() => {
  speak1("4号完成");
}, 3000);


</script>
<style lang="scss" scoped>
.tac {
  .tx {
    font-size: calc(5vw);
    text-align: center;
  }
  .tx2 {
    font-size: calc(20vw);
    text-align: center;
  }
  .btn {
    font-size: calc(2vw);
    padding: 1vh 1vw;
    height: auto;
  }
}
</style>
