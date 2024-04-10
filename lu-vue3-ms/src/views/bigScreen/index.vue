<template>
  <div class="bigScreen">
    <dv-full-screen-container
      style="height: 100%; width: 100%; background-color: #000; color: #fff"
    >
      <!-- <dv-decoration-11 style="width: 100%; height: 60px">
        <div color-green font-600 bg="~ dark/0" style="color: #fff">
          大屏展示
        </div>
      </dv-decoration-11> -->
      <div class="content">
        <div class="box">
          <dv-border-box8 :dur="5">
            <div class="box-item">
              <dv-percent-pond
                :config="config"
                style="width: 200px; height: 100px"
              />
            </div>
          </dv-border-box8>
          <dv-border-box13>
            <div style="width: 100; height: 100%; padding: 20px">
              <dv-scroll-board
                :config="config3"
                style="width: 100%; height: 100%"
              />
            </div>
          </dv-border-box13>
          <dv-border-box12>
            <div dv-bg>dv-border-box8</div>
          </dv-border-box12>
        </div>
        <div class="box-middle">
          <dv-border-box11
            class="box-middle-item"
            title="大屏展示"
            :animate="true"
          >
            <div dv-bg>dv-border-box-11</div>
          </dv-border-box11>
          <dv-border-box10
            style="overflow: hidden"
            class="box-middle-item"
          >
            <Rank />
          </dv-border-box10>
        </div>
        <div class="box">
          <dv-border-box8 :dur="5">
            <div dv-bg>dv-border-box8</div>
          </dv-border-box8>
          <dv-border-box13>
            <div dv-bg>dv-border-box-11</div>
          </dv-border-box13>
          <dv-border-box12>
            <div dv-bg>dv-border-box8</div>
          </dv-border-box12>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts" setup>
import Rank from "./components/Rank.vue";
const dvBorder10 = ref();
onMounted(() => {
  setTimeout(() => {
    console.log(dvBorder10.value);
    dvBorder10.value?.initWH();
  }, 500);
});
const config3 = ref({
  header: ["列1", "列2", "列3"],
  data: [
    ["行1列1", "行1列2", "行1列3"],
    ["行2列1", "行2列2", "行2列3"],
    ["行3列1", "行3列2", "行3列3"],
    ["行4列1", "行4列2", "行4列3"],
    ["行5列1", "行5列2", "行5列3"],
    ["行6列1", "行6列2", "行6列3"],
    ["行7列1", "行7列2", "行7列3"],
    ["行8列1", "行8列2", "行8列3"],
    ["行9列1", "行9列2", "行9列3"],
    ["行10列1", "行10列2", "行10列3"],
  ],
  index: true,
  columnWidth: [50],
  align: ["center"],
});
const config = ref({
  value: 66,
});
const config2 = ref({
  data: [
    {
      name: "周口",
      value: 55,
    },
    {
      name: "南阳",
      value: 120,
    },
    {
      name: "西峡",
      value: 78,
    },
    {
      name: "驻马店",
      value: 66,
    },
    {
      name: "新乡",
      value: 80,
    },
    {
      name: "信阳",
      value: 45,
    },
    {
      name: "漯河",
      value: 29,
    },
  ],
  unit: "万元",
});
</script>
<style lang="scss" scoped>
.bigScreen {
  width: 100%;
  height: 100%;
  .content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .box {
      flex: 1;
      &:first-child,
      &:last-child {
        display: flex;
        flex-direction: column;
      }
      .box-item {
        margin: auto;
      }
    }
    .box-middle {
      width: 40%;
      display: flex;
      flex-direction: column;
      .box-middle-item {
        &:first-child {
          flex: 2;
        }
        &:last-child {
          flex: 1;
        }
      }
    }
  }
}
</style>
