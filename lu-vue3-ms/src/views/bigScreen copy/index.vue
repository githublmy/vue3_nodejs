<template>
  <div class="screen">
    <v-scale-screen
      id="bigScreen"
      :width="defaultProps.width"
      :height="defaultProps.height"
      :delay="defaultProps.delay"
      :fullScreen="false"
    >
      <canvas id="canvas"></canvas>
      <div
        class="showData"
        v-show="showInfo"
        :style="{
          left: pointer.x + 'px',
          top: pointer.y + 'px',
        }"
      >
        <div v-if="currentTabIndex == 86">
          <div>风机编码：{{ currentObj.equipmentCode }}</div>
          <div>经度：{{ `${(Math.random() * 100).toFixed(4)}` }}</div>
          <div>维度：{{ `${(Math.random() * 100).toFixed(4)}` }}</div>
          <div>发电量：{{ parseInt(Math.random() * 100) }}</div>
        </div>

        <div v-else>
          <div>资产数量：{{ parseInt(Math.random() * 100) }}</div>
          <div>硬件设备：型号{{ parseInt(Math.random() * 20) }}</div>
        </div>

        <!-- <div>
        风机状态：
        <span class="status" v-if="Math.random() < 0.3">异常</span>
        <span
          class="status2"
          v-else-if="Math.random() >= 0.3 && Math.random() < 0.6"
          >警告</span
        >
        <span class="status3" v-else>正常</span>
      </div> -->
      </div>
    </v-scale-screen>
    <div class="leftTab">
      <div
        class="l-nav"
        v-for="item in list"
        :key="item.storageId"
        @click="getImg(item.storageId)"
        :class="currentTabIndex === item.storageId ? 'active' : ''"
      >
        {{ item.photoName }}
      </div>
    </div>
    <HomeImage ref="homeImage" @changeImg="changeImg" />
  </div>
</template>

<script>
import { fabric } from "fabric";
import VScaleScreen from "v-scale-screen";
import { getImagInfoList, getImagInfoDetail } from "@/api/imgSetting/index";
import HomeImage from "./components/HomeImage/index.vue";
export default {
  components: {
    VScaleScreen,
    HomeImage,
  },
  data() {
    return {
      // 基础配置
      defaultProps: {
        width: 1920,
        height: 1080,
        delay: 300,
      },
      list: [
        {
          storageId: -2,
          photoName: "管理系统",
        },
      ],
      imgOptions: [], //地图名称下拉
      showInfo: false,
      showInfo2: false,
      currentObj: {},
      pointer: {
        x: 0,
        y: 0,
      },
      panning: false,
      imgValue: null, //选中的id
      currentTabIndex: null,
    };
  },
  created() {
    this.getImgList();
  },
  mounted() {
    this.init();
  },
  methods: {
    changeImg(type, data) {
      console.log(type, data);
      const obj2 = {
        storageId: -2,
        photoName: "管理系统",
      };
      const obj = {
        storageId: -1,
        photoName: "< 返回",
      };
      // 仓库  1
      if (type === 1) {
        this.list = this.imgOptions.slice(2, 6);
        this.list.push(obj, this.imgOptions.slice(2, 6));
        this.imgValue = this.imgOptions[2].storageId;
        this.currentTabIndex = this.imgValue;
      } else if (type === 2) {
        // 中控右上角
        this.list = this.imgOptions.slice(11, 16);
        this.list.unshift(obj, obj2);
        this.imgValue = this.imgOptions[11].storageId;
        this.currentTabIndex = this.imgValue;
      } else if (type === 3) {
        // 中间U型区
        this.list = this.imgOptions.slice(6, 11);
        this.list.unshift(obj, obj2);
        this.imgValue = this.imgOptions[6].storageId;
        this.currentTabIndex = this.imgValue;
      } else if (type === 4) {
        // 大门
        this.list = this.imgOptions.slice(16, 21);
        this.list.unshift(obj, obj2);
        this.imgValue = this.imgOptions[16].storageId;
        this.currentTabIndex = this.imgValue;
      } else if (type === 5) {
        // GIS
        this.list = this.imgOptions.slice(21);
        this.list.unshift(obj, obj2);
        this.imgValue = this.imgOptions[21].storageId;
        this.currentTabIndex = this.imgValue;
      }
      this.getImgDetail();
    },
    /**
     * @description 清空画布
     */
    clearCanvas() {
      this.canvas.clear();
    },
    getImg(storageId) {
      if (storageId === -1) {
        this.getImgList();
        return;
      }
      if (storageId === -2) {
        this.$router.push("/login");
        return;
      }
      this.currentTabIndex = storageId;
      this.clearCanvas();
      this.imgValue = storageId;
      this.getImgDetail();
    },
    async getImgList() {
      const params = {
        condition: null,
      };
      const res = await getImagInfoList(params);
      console.log(res, "image");
      this.imgOptions = res.payload;
      this.list = [
        {
          storageId: -2,
          photoName: "管理系统",
        },
        ...res.payload.slice(0, 2),
      ];
      if (this.imgOptions.length) {
        this.currentTabIndex = this.imgOptions[0].storageId;
        this.imgValue = this.imgOptions[0].storageId;
        this.getImgDetail();
      }
    },
    async getImgDetail() {
      const params = {
        storageId: this.imgValue,
      };
      const res = await getImagInfoDetail(params);
      console.log(res, "详情");
      const obj = res.payload;
      this.jsonToimg(obj);
    },
    // 取消元素选择控制器
    jsonToimg(obj) {
      const scaleX = this.defaultProps.width / obj.backgroundImage.width;
      const scaleY = this.defaultProps.height / obj.backgroundImage.height;
      // 获取缩放最小的值
      const min = Math.min(scaleX, scaleY);
      this.canvas.loadFromJSON(obj, () => {
        this.canvas.getObjects().forEach((item) => {
          item.set({
            hasControls: false, //控制器隐藏
            hasBorders: false, //控制器边框隐藏
            selectable: false, //禁止选中
            centeredScaling: true, //中心缩放
            stroke: "",
            // strokeWidth: 6,
          });
          if (item.type === "image" && item.src && !item.customParameters) {
            console.log(item);
            // item.set({
            //   borderColor: "red",
            //   fill: "red",
            // });

            const _this = this;
            function animateLeft() {
              item.animate(
                {
                  opacity: 1,
                  scaleX: 0.05,
                  scaleY: 0.03,
                  left: 736,
                  top: 936,
                },
                {
                  duration: 900,
                  onChange: _this.canvas.requestRenderAll.bind(_this.canvas),
                  onComplete: animateRight,
                }
              );
            }

            function animateRight() {
              item.animate(
                {
                  // opacity: 0.5,
                  scaleX: 0.06,
                  scaleY: 0.04,
                  left: 720,
                  top: 920,
                },
                {
                  duration: 1200,
                  onChange: _this.canvas.requestRenderAll.bind(_this.canvas),
                  onComplete: animateLeft,
                }
              );
            }
            animateLeft();
            this.updateCanvas();
          }
          this.updateCanvas();
        });
        // 获取背景图的四个顶点坐标  获取的是原图大小，乘以缩放比例
        const x = this.canvas.backgroundImage.getCoords()[1].x;
        // x轴平移
        const v4 = (this.defaultProps.width - x * min) / 2;
        this.canvas.setViewportTransform([min, 0, 0, min, v4, 0]);
        this.updateCanvas();
      });
    },
    // 更新画布
    updateCanvas() {
      this.canvas.renderAll();
    },
    showHome() {
      this.$refs.homeImage.showHomeImage();
    },
    init() {
      this.canvas = new fabric.Canvas("canvas", {
        width: this.defaultProps.width,
        height: this.defaultProps.height,
        centeredScaling: true,
      });
      this.canvas.hoverCursor = "auto";
      this.canvas.on("mouse:wheel", (opt) => {
        console.log(opt);
        let delta = opt.e.deltaY; // 滚轮向上滚一下是 -100，向下滚一下是 100
        let zoom = this.canvas.getZoom(); // 获取画布当前缩放值
        zoom *= 0.999 ** delta;
        //最大20倍
        if (zoom > 20) zoom = 20;
        // 最小0.01倍
        if (zoom < 0.01) zoom = 0.01;
        // 以鼠标位置为中心缩放
        this.canvas.zoomToPoint(
          {
            // 关键点
            x: opt.e.offsetX,
            y: opt.e.offsetY,
          },
          zoom
        );
        opt.e.preventDefault(); //取消默认事件
        opt.e.stopPropagation(); //阻止冒泡
      });

      // 鼠标经过的时候变红色
      this.canvas.on("mouse:over", (e) => {
        // && e.target.type === "path"
        if (e.target) {
          console.log("鼠标来了", e);
          // e.target.set({
          //   fill: "",
          //   stroke: "#f03f31",
          //   strokeWidth: 2,
          //   borderColor:"red"
          // });
          e.target.hoverCursor = "pointer";

          if (
            e.target.type === "rect" &&
            e.target.customParameters.equipmentCode
          ) {
            this.currentObj = { ...e.target.customParameters };
            const x = e.target.lineCoords.tl.x;
            const y = e.target.lineCoords.tl.y;
            // console.log(y, "y坐标");
            // console.log(x - 200, "x坐标");
            this.pointer = {
              x: x - 250 <= 0 ? x + e.target.width * e.target.scaleX : x - 250,
              y: y,
            };
            this.showInfo = true;
            this.updateCanvas();
          }
        }
      });

      // 鼠标移开后变回绿色
      this.canvas.on("mouse:out", (e) => {
        if (
          e.target &&
          e.target.type === "rect" &&
          e.target.customParameters.equipmentCode
        ) {
          // e.target.set({
          //   fill: "",
          //   stroke: null,
          // });
          this.showInfo = false;
          this.updateCanvas();
        }
      });
      this.canvas.on("mouse:down", (opt) => {
        console.log(opt, "mousedown");
        if (opt.target) {
          this.target = opt.target;
          if (
            opt.target.type === "image" &&
            opt.target.src &&
            !opt.target.customParameters
          ) {
            console.log("弹窗");
            this.showHome();
          }
        } else {
          // this.panning = true;
          // this.canvas.selection = false;
        }
        this.panning = true;
        this.canvas.selection = false;
      });
      this.canvas.on("mouse:dblclick", (opt) => {
        console.log(opt, "dblclick");
        if (opt.target) {
          // 水平居中
          // opt.target.viewportCenterH();
          // // 垂直居中
          // opt.target.viewportCenterV();
          // 点击放大2.5倍
          this.canvas.zoomToPoint(
            {
              // 关键点
              x: opt.e.offsetX,
              y: opt.e.offsetY,
            },
            2.5
          );
          opt.e.preventDefault();
          opt.e.stopPropagation();
        }
      });
      // 元素移动
      this.canvas.on("mouse:move", (opt) => {
        // 鼠标移动时触发
        // console.log(this.canvas, "move");
        if (this.panning && opt && opt.e) {
          let delta = new fabric.Point(opt.e.movementX, opt.e.movementY);
          this.canvas.relativePan(delta);
        }
      });

      //鼠标松开
      this.canvas.on("mouse:up", (opt) => {
        // console.log(opt.target);
        // 鼠标松开时触发
        this.canvas.setViewportTransform(this.canvas.viewportTransform); // 设置此画布实例的视口转换
        this.canvas.isDragging = false;
        this.panning = false;
        this.canvas.selection = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.screen {
  position: relative;
  #bigScreen {
    position: relative;

    .showData {
      background-color: rgba(3, 89, 170, 0.6);
      padding: 10px;
      border-radius: 10px;
      position: absolute;
      width: 250px;
      font-size: 22px;
      color: #f4f4f4;
      font-weight: 600;
    }
  }
  .leftTab {
    position: absolute;
    // left: -150px;
    left: 0;
    top: 0;
    z-index: 99999;
    color: rgb(235, 241, 247);
    font-size: 14px;
    line-height: 1.5;
    width: 160px;
    height: 100%;
    // padding-top: 10px;
    // padding-left: 10px;
    // border: 1px solid rgb(0, 0, 0, 0);
    // border-right-width: 10px;
    transition: left 0.3s;
    .l-nav {
      padding: 5px 10px;
      &:hover {
        color: #0093ff;
        cursor: pointer;
        font-weight: bold;
        border-radius: 6px;
        background-color: #809aff80;
      }
    }
    &:hover {
      left: 0;
    }
  }
  .active {
    color: #0093ff;
    font-weight: bold;
  }
}
</style>
