<template>
  <div id="ranking-board">
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
export default {
  name: "RankingBoard",
  data() {
    return {
      config: {
        data: [
          {
            name: "日常养护",
            value: 55,
          },
          {
            name: "交通事故",
            value: 120,
          },
          {
            name: "路面",
            value: 78,
          },
          {
            name: "桥通",
            value: 66,
          },
          {
            name: "计日工",
            value: 80,
          },
          {
            name: "路基",
            value: 45,
          },
          {
            name: "交安设施",
            value: 29,
          },
          {
            name: "除雪",
            value: 29,
          },
          {
            name: "绿化",
            value: 29,
          },
        ],
        // rowNum: 9,
      },
    };
  },
};
</script>

<style lang="scss">
#ranking-board {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  width: 100%;
}
</style>
