<template>
  <div style="height: 100%; width: 100%; padding: 40px">
    <div ref="mapChart" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
const mapChart = ref();
const init = () => {
  const myChart = echarts.init(mapChart.value);
  let option = {
    //你的代码
    backgroundColor: "#091636",
    color: ["#DBB36E", "#33CCCC"],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(13, 64, 71, 0.50)",
      borderColor: "rgba(143, 225, 252, 0.60)",
      padding: 8,
      textStyle: {
        color: "#fff",
      },
    },
    legend: {
      data: ["计划完成总工期比例", "实际完成总工期比例"],
      icon: "rect",
      itemWidth: 14,
      itemHeight: 14,
      right: 5,
      textStyle: {
        fontSize: 14,
        color: "#FFFFFF",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLine: {
        // 轴线设置
        show: true, // 显示轴线
        lineStyle: {
          // 轴线样式设置
          color: "#C5C5C5", // 轴线颜色
          width: 1, // 轴线宽度
          type: "solid", // 轴线类型-虚线
        },
      },
      axisLabel: {
        textStyle: {
          color: "#F5F5F5", //更改坐标轴文字颜色
          fontSize: 12, //更改坐标轴文字大小
        },
      },
      data: [
        "2022.01",
        "2022.02",
        "2022.03",
        "2022.04",
        "2022.05",
        "2022.06",
        "2022.07",
        "2022.08",
        "2022.09",
        "2022.10",
        "2022.11",
        "2022.12",
      ],
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          type: [10, 20],
          color: "#979797",
          dashOffset: 0,
        },
      },
      axisLabel: {
        textStyle: {
          color: "#F5F5F5", //更改坐标轴文字颜色
          fontSize: 12, //更改坐标轴文字大小
        },
      },
    },
    series: [
      {
        name: "计划完成总工期比例",
        type: "line",
        stack: "Total",
        // smooth: true,
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          shadowColor: "#fff",
          shadowBlur: 5,
        },
        label: {
          show: true,
          position: "right",
          color: "#F5F5F5",
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(219, 179, 110, 1)",
            },
            {
              offset: 1,
              color: "rgba(219, 179, 110, 0)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [10, 132, 101, 134, 90, 230, 210, 220, 182, 191, 234, 290],
      },
      {
        name: "实际完成总工期比例",
        type: "line",
        stack: "Total",
        // smooth: true,
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          shadowColor: "#fff",
          shadowBlur: 5,
        },
        label: {
          show: true,
          position: "right",
          color: "#F5F5F5",
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(51, 204, 204, 1)",
            },
            {
              offset: 1,
              color: "rgba(51, 204, 204, 0)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90],
      },
    ],
  };

  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
};
onMounted(() => {
  init();
});
</script>
