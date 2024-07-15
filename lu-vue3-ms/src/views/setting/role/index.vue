<template>
  <div class="main">
    <div v-for="(row, index0) in uiPeriodList" :key="index0">
      <div class="period" :style="periodStyle">
        {{ row.id }}++++++++++++++胜多负少打发斯蒂芬VS的
      </div>
    </div>
  </div>

  <!-- <SearchBox :againFind="againFind" /> -->
</template>

<script lang="ts" setup>
let isFirst = false,
  uiPeriodList = [],
  periodList = [];
let headList = [];
let periodStyle = {
  "grid-template-columns": `52px repeat(${headList.length}, 1fr)`,
  height: "2000px",
};

for (let index = 0; index < 30000; index++) {
  uiPeriodList.push({
    id: index,
    columnList: [],
  });
}
function update() {
  let rowList = document.querySelectorAll(".period");
  let config = {
    root: document.querySelector(".main"),
  };
  let intersectionObserver = new IntersectionObserver((entries) => {
    console.log(entries);

    entries.forEach((row) => {
      if (row.intersectionRatio <= 0) {
        if (!isFirst) {
          row.target.style.height = `${row.target.clientHeight}px`;
        }
      } else {
        row.target.className = "period";
        row.target.style.height = "";
      }
    });
  }, config);
  if (isFirst) {
    rowList.forEach((row) => {
      intersectionObserver.observe(row);
    });
    isFirst = false;
  }
}

onMounted(() => {
  update();
});
</script>

<style lang="scss" scoped>
.big-box {
  padding: 30px 20px;
  height: 870px;
}
.download-box {
  width: 100%;
  overflow: hidden;

  .line-box {
    height: 30px;
  }

  .txt {
    background: #282c34;
    color: #fff;
    height: 810px;
    overflow: auto;

    .el-row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin: auto;
      font-size: 22px;
    }
  }
}
</style>
