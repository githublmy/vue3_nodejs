<template>
  <el-dialog
    class="dialog-box"
    :close-on-click-modal="true"
    :visible.sync="dialogVisible"
    :show-close="false"
    width="800px"
  >
    <!-- 1920 *0.6 -->
    <div class="cont">
      <div @click="goToNext" class="left">
        <AnimationVue></AnimationVue>
      </div>
      <div @click="goToNext2" class="right">
        <AnimationVue></AnimationVue>
      </div>
      <div @click="goToNext3" class="middle">
        <AnimationVue></AnimationVue>
      </div>
      <div @click="goToNext4" class="top">
        <AnimationVue></AnimationVue>
      </div>
      <div @click="goToNext5" class="bottom">
        <AnimationVue></AnimationVue>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import AnimationVue from "../AnimationVue/index.vue";
export default {
  name: "HomeImage",
  components: {
    AnimationVue,
  },
  data() {
    return {
      dialogVisible: false,
      style1: {
        top: "30%",
        left: "16%",
        width: " 60px",
        height: "130px",
      },
    };
  },
  methods: {
    goToNext() {
      this.$emit("changeImg", 5);
      this.dialogVisible = false;
    },
    goToNext2() {
      this.$emit("changeImg", 2);
      this.dialogVisible = false;
    },
    goToNext3() {
      this.$emit("changeImg", 3);
      this.dialogVisible = false;
    },
    goToNext4() {
      this.$emit("changeImg", 4);
      this.dialogVisible = false;
    },
    goToNext5() {
      this.$emit("changeImg", 1);
      this.dialogVisible = false;
    },
    showHomeImage(item) {
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss">
.dialog-box {
  .el-dialog__body {
    padding: 0;
  }
}
</style>
<style lang="scss" scoped>
.dialog-box {
  ::v-deep(.el-dialog__header) {
    display: none;
  }
  .cont {
    width: 800px;
    height: 400px;
    position: relative;
    // background: url("../../../../assets/images/test2.png");
    background-size: 100% 100%;
    .left {
      position: absolute;
      top: 30%;
      left: 10%;
      width: 80px;
      height: 170px;
    }
    .right {
      position: absolute;
      top: 15%;
      right: 15%;
      width: 180px;
      height: 80px;
    }
    .middle {
      position: absolute;
      top: 22%;
      right: 50%;
      width: 160px;
      height: 180px;
    }
    .top {
      position: absolute;
      top: 2%;
      right: 36%;
      width: 130px;
      height: 40px;
    }
    .bottom {
      position: absolute;
      bottom: 15%;
      right: 28%;
      width: 110px;
      height: 70px;
    }
  }
}
</style>
