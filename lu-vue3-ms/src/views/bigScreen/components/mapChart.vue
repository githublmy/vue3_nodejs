<template>
  <div
    ref="chinaMapRef"
    style="width: 100%; height: 100%; padding: 60px 10px 10px 10px"
  ></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import china from "./china.json";
import { GeoJSONSourceInput } from "echarts/types/src/coord/geo/geoTypes.js";
let chinaMapEchart: any;
let timer: string | number | NodeJS.Timeout | undefined;
const chinaMapRef = ref();
const setD = () => {
  chinaMapEchart = echarts.init(chinaMapRef.value);
  getMap();
};
const clearTimer = () => {
  chinaMapEchart.dispose();
  timer && clearInterval(timer);
};
const getMap = async () => {
  chinaMapEchart.showLoading({
    text: "加载中···",
    color: "#FFFFFF",
    textColor: "#FFFFFF",
    maskColor: "#092261",
    fontSize: 46,
    spinnerRadius: 20,
  });

  const arr = china.features.map((item) => {
    return {
      name: item.properties.name,
      value: item.properties.adcode,
    };
  });
  console.log(arr);

  getChinaMap(JSON.parse(JSON.stringify(arr)));
};
const getChinaMap = (data: any) => {
  // console.log(china);
  echarts.registerMap("china", china as GeoJSONSourceInput);
  const geoIndex = 0; //地图层级的下标
  let zoom = 1;
  const getFormmater = (name: any, data: { value: any }) => {
    return `<div style="box-shadow: 0 0 10px #3BD9D9; padding: 10px; position: absolute; top: 0; left:0;  border-radius: 4px; border: 1px solid #04b9ff; background: linear-gradient(to bottom,  #51bfd4 0%,rgba(35,90,178,.8) 100%);">
                    <div style='color:#F4BD59; font-size: 14px;'>${name}</div>
                    <div style="display: flex; align-items: center;padding-top: 6px;">
                    <div style="height: 6px; width: 6px; border-radius: 50%; background:#F4BD59; margin-right: 10px;"></div>
                    <span style='color:#fff;font-size: 12px;margin-right: 20px;'>城市编码</span>
                    <span style="font-size: 12px;font-family: 'PangMenZhengDao';color:#fff;">
                    ${(data && data.value) || 0}</span>
                    </div>
                </div>`;
  };
  const layoutSize = "100%";
  const mapName = "china";
  const option = {
    // backgroundColor: "#092261",
    tooltip: {
      show: true,
      confine: true,
      extraCssText: "z-index:3",
      formatter: function (params: { name: any; data: { value: any } }) {
        // console.log(params);
        const name = params.name;
        const data = params.data;
        const res = getFormmater(name, data);
        return data ? res : null;
      },
      position: function (pt: number[]) {
        return [pt[0], pt[1] - 120];
      },
    },
    geo: [
      {
        zlevel: 0,
        map: mapName,
        zoom: zoom,
        layoutCenter: ["50%", "50%"],
        layoutSize: layoutSize,
        roam: true, // 是否开启鼠标滚轮缩放
        scaleLimit: {
          min: 0.5,
          max: 4,
        },
        // animationDurationUpdate: 0,
        label: {
          normal: {
            //静态的时候展示样式
            show: true, //是否显示地图省份得名称
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
          },
          emphasis: {
            //动态展示的样式
            color: "#fff",
          },
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: "#fff",
            },
            color: "#fff",
            borderColor: "#32CBE0",
            borderWidth: 1.2,
            areaColor: {
              type: "linear-gradient",
              x: 0,
              y: 1000,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0.5,
                  color: "#0D59C1", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#53C9C7", // 100% 处的颜色
                },
              ],
              global: true, // 缺省为 false
            },
          },
          emphasis: {
            label: {
              show: true,
              color: "#fff",
            },
            borderWidth: 1.2,
            borderColor: "rgba(255, 230, 175,0.8)",
            shadowColor: "rgba(255, 230, 175,0.5)",
            shadowBlur: 30,
            textStyle: {
              color: "#fff",
              fontSize: 12,
              backgroundColor: "transparent",
            },
            areaColor: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#1cfbfe",
                },
                {
                  offset: 1,
                  color: "#3348e7",
                },
              ],
              false
            ),
          },
        },
      },
      {
        type: "map",
        map: mapName,
        zlevel: -6,
        zoom: zoom,
        animationDurationUpdate: 0,
        layoutCenter: ["50%", "52.4%"],
        layoutSize: layoutSize,
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderColor: "rgba(7, 65, 117,0.5)",
            shadowColor: "rgba(7, 65, 117,0.8)",
            shadowOffsetY: 15,
            shadowBlur: 8,
            areaColor: "#0A2763",
          },
        },
      },
      {
        map: mapName,
        zlevel: -4,
        zoom: zoom,
        silent: true,
        layoutCenter: ["50%", "50%"],
        layoutSize: layoutSize,
        roam: false,
        animationDurationUpdate: 0,
        itemStyle: {
          normal: {
            borderColor: "rgba(192,245,249,.8)",
            borderWidth: 3,
            shadowColor: "#6FFDFF",
            shadowOffsetY: 0,
            shadowBlur: 10,
            // areaColor: 'rgba(29,85,139,.6)',
          },
        },
        label: {
          normal: {
            //静态的时候展示样式
            show: false, //是否显示地图省份得名称
          },
          emphasis: {
            //动态展示的样式
            show: false,
          },
        },
      },
      {
        silent: true,
        zlevel: -3,
        map: mapName,
        zoom: zoom,
        roam: false, // 是否开启鼠标滚轮缩放
        animationDurationUpdate: 0,
        layoutCenter: ["50%", "50%"],
        layoutSize: layoutSize,
        label: {
          normal: {
            //静态的时候展示样式
            show: false, //是否显示地图省份得名称
          },
          emphasis: {
            //动态展示的样式
            color: "#fff",
          },
        },
        blur: {
          label: { show: true, color: "#000" },
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              color: "#fff",
            },
            color: "#fff",
            borderColor: "#32CBE0",
            borderWidth: 1.5,
            shadowColor: "rgba(#32CBE0,.5)",
            shadowBlur: 0,
            shadowOffsetY: 5,
            areaColor: {
              type: "linear-gradient",
              x: 0,
              y: 1000,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0.5,
                  color: "#0D59C1", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#53C9C7", // 100% 处的颜色
                },
              ],
              global: true, // 缺省为 false
            },
          },
          emphasis: {
            label: {
              show: true,
              color: "#fff",
            },
            borderWidth: 1.2,
            borderColor: "rgba(255, 230, 175,0.8)",
            shadowColor: "rgba(255, 230, 175,0.5)",

            textStyle: {
              color: "#fff",
              fontSize: 12,
              backgroundColor: "transparent",
            },
            areaColor: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#1cfbfe",
                },
                {
                  offset: 1,
                  color: "#3348e7",
                },
              ],
              false
            ),
          },
        },
      },
    ],
    series: [
      {
        type: "map",
        geoIndex: geoIndex,
        animationDurationUpdate: 0,
        data: data,
      },
    ],
  };
  chinaMapEchart.on("georoam", (e: { zoom: any }) => {
    const ops = chinaMapEchart.getOption();
    // console.log(e, "数据");
    if (e.zoom) {
      ops.geo.map((item: { zoom: any; center: any }, i: number) => {
        if (i > 0) {
          item.zoom = ops.geo[0].zoom;
          item.center = ops.geo[0].center;
        }
      });
    } else {
      ops.geo.map((item: { center: any }, i: number) => {
        if (i > 0) {
          item.center = ops.geo[0].center;
        }
      });
    }
    // console.log(ops, "设置的");
    chinaMapEchart.setOption(ops);
  });
  var count = 0;
  var dataLength = option.series[0].data.length;
  timer && clearInterval(timer);
  timer = setInterval(() => {
    chinaMapEchart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
    });
    chinaMapEchart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: count % dataLength,
    });
    chinaMapEchart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: count % dataLength,
    });
    count++;
  }, 2000);
  chinaMapEchart.on(
    "mouseover",
    function (params: { dataIndex: any; componentSubType: string }) {
      timer && clearInterval(timer);
      chinaMapEchart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      });
      chinaMapEchart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      chinaMapEchart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: params.dataIndex,
      });
      // 如果是 componentSubType是 effectScatter 类型，隐藏所有高亮
      if (params.componentSubType == "effectScatter") {
        // console.log(params, "数据");
        chinaMapEchart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
        });
      }
    }
  );
  chinaMapEchart.on("mouseout", function () {
    timer && clearInterval(timer);
    chinaMapEchart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
    });
    timer = setInterval(function () {
      chinaMapEchart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      });
      chinaMapEchart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: count % dataLength,
      });
      chinaMapEchart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: count % dataLength,
      });
      count++;
    }, 2000);
  });
  chinaMapEchart.hideLoading();
  chinaMapEchart.setOption(option);
  window.onresize = () => chinaMapEchart.resize();
};
onMounted(() => {
  setD();
});
onBeforeUnmount(() => {
  clearTimer();
});
</script>
: { center: any; }: number: { dataIndex: any; componentSubType: string; }
