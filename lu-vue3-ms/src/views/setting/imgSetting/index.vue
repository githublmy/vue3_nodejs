<template>
  <div class="baseStyle imgSetting">
    <transition name="el-fade-in-linear" mode="out-in">
      <div v-if="showImg">
        <el-row :gutter="20" style="margin-bottom: 10px">
          <el-col :span="1.5">
            <el-button
              v-blur
              size="mini"
              icon="el-icon-top-right"
              type="primary"
              @click="goToList"
              >查询列表</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <!-- 上传组件 -->
            <el-upload
              ref="uploadRef"
              :action="imgAction"
              :multiple="false"
              :show-file-list="false"
              :limit="1"
              :data="obj"
              :headers="headers"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
              :on-error="handlerError"
              accept=".jpg,.jpeg,.png,.gif,.svg"
            >
              <el-button type="primary" v-blur icon="el-icon-plus" size="mini"
                >上传图片</el-button
              >
            </el-upload>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-blur
              @click="resetAllZoom"
              size="mini"
              icon="el-icon-refresh-right"
              type="success"
              >恢复</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-blur
              @click="clearCanvas"
              icon="el-icon-delete"
              size="mini"
              type="danger"
              >清空</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-select
              size="mini"
              v-model="value"
              placeholder="请选择设备"
              clearable
              :disabled="!isUpload"
              style="width: 240px"
              value-key="equipmentId"
              filterable
              @change="addRect"
            >
              <!-- addMarker -->
              <el-option
                v-for="(item, index) in list"
                :key="index"
                :label="item.equipmentName"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1.5">
            <el-button v-blur @click="addRect" size="mini" type="success"
              >添加框选</el-button
            >
            <el-button v-blur @click="addTextBox" size="mini" type="success"
              >添加文本</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-color-picker
              v-model="colorValue"
              @change="changeColor"
              @active-change="activeChange"
            ></el-color-picker
          ></el-col>
          <el-col :span="1.5">
            <el-select
              size="mini"
              style="width: 80px"
              v-model="fontWeightValue"
              @change="changeFontWeight"
            >
              <el-option
                v-for="item in optionsFw"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1.5">
            <el-select
              size="mini"
              style="width: 80px"
              v-model="fontSizeValue"
              @change="changeFontSize"
            >
              <el-option
                v-for="item in optionsFS"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- <el-button type="primary" size="mini" @click="load">加载</el-button> -->
        <!-- <el-button type="primary" size="mini" @click="addImage"
          >添加图片</el-button
        > -->
        <!-- <el-upload
          ref="uploadRef"
          :action="imgAction"
          :multiple="false"
          :show-file-list="false"
          :limit="1"
          :data="obj"
          :headers="headers"
          :before-upload="handleBeforeUpload"
          :on-success="handleUploadSuccess2"
          :on-error="handlerError"
          accept=".jpg,.jpeg,.png,.gif,.svg"
        >
          <el-button type="primary" v-blur icon="el-icon-plus" size="mini"
            >添加图片</el-button
          >
        </el-upload> -->
        <!-- <div class="data_list">
          <div
            class="data_item rect"
            draggable
            @dragstart="onDragstart('rect')"
          >
            rect
          </div>
          <div
            class="data_item circle"
            draggable
            @dragstart="onDragstart('circle')"
          >
            circle
          </div>
          <div class="data_item img" draggable @abort="onDragstart('img')">
            img
          </div>
        </div> -->
        <!-- 
    <el-button v-blur @click="saveToJson" size="mini" type="success"
      >保存</el-button
    > -->
        <el-row>
          <el-col :span="20">
            <canvas
              width="1000"
              height="500"
              id="canvas"
              style="border: 1px solid #ccc"
            ></canvas>
          </el-col>
          <el-col :span="4">
            <el-tag size="default">当前选中：</el-tag>
            <el-form
              :model="currentObj"
              ref="form"
              label-width="80px"
              :inline="false"
              size="mini"
            >
              <el-form-item label="设备id:" prop="equipmentId">
                <span style="word-break: break-all">
                  {{ currentObj.equipmentId }}
                </span>
              </el-form-item>
              <el-form-item label="设备名称:" prop="equipmentName">
                <span style="word-break: break-all">
                  {{ currentObj.equipmentName }}
                </span>
              </el-form-item>
              <el-form-item label="设备编码:" prop="equipmentCode">
                <span style="word-break: break-all">
                  {{ currentObj.equipmentCode }}
                </span>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <el-form
              :model="formData"
              ref="formDataRef"
              label-width="80px"
              :inline="false"
              size="mini"
              :rules="rules"
            >
              <el-form-item label="名称:" prop="photoName">
                <el-input
                  v-model="formData.photoName"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注:" prop="photoDesc">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2 }"
                  v-model="formData.photoDesc"
                  placeholder="请输入备注"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button v-blur type="primary" @click="onSubmit"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <!-- <ImgList v-else @getDetail="getImgDetail" /> -->
    </transition>
  </div>
</template>

<script>
// import ImgList from "./components/ImgList/index.vue";
// import {
//   saveImagInfo,
//   updateImagInfo,
//   getImagInfoDetail,
// } from "@/api/imgSetting/index";
import { fabric } from "fabric";
import { useUserStore } from "@/store/modules/user";
export default {
  // components: {
  //   ImgList,
  // },
  data() {
    return {
      showImg: true,
      fontWeightValue: "normal",
      fontSizeValue: 16,
      optionsFw: [
        {
          value: "normal",
          label: "正常",
        },
        {
          value: "bold",
          label: "加粗",
        },
      ],
      colorValue: "#f00",
      // imgAction:
      //   "http://192.168.11.9:8099/AMS" + import.meta.env.VITE_FILE_ACTION,
      imgAction: import.meta.env.VITE_FILE_ACTION,
      canvas: null,
      img: null,
      target: null,
      isUpload: false,
      currentObj: {
        equipmentId: "",
        equipmentName: "",
        equipmentCode: null,
        latlog: "",
        quantity: null,
        status: "",
      },
      optionsFS: [
        12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46,
        48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70,
      ],
      headers: {
        // token: useUserStore().token,
      },
      obj: {
        clientMdCode: "test",
        uid: "",
      },
      formData: {
        photoName: "", //名称
        photoDesc: "", //备注
        regionList: [], //区域数组
        detailVo: null, //json数据
      },
      rules: {
        photoName: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      panning: false, //移动状态
      options: [],
      value: {},
      list: [],
      currentTextBox: null,
      currentOperateType: 1, //1新增  2 修改
      currentType: "",
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.canvas.dispose();
  },
  methods: {
    onDragstart(type) {
      this.currentType = type;
    },
    addImage() {
      // 创建Fabric图片对象
      var img = new fabric.Image.fromURL("", (oImg) => {
        const _this = this;
        this.canvas.add(oImg);
        function animateLeft() {
          oImg.animate(
            {
              opacity: 1,
            },
            {
              duration: 900,
              onChange: _this.canvas.requestRenderAll.bind(_this.canvas),
              onComplete: animateRight,
            }
          );
        }

        function animateRight() {
          oImg.animate(
            {
              opacity: 0.5,
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
      });
      console.log(img);
      // this.canvas.add(img);
    },
    // 获取详情
    async getImgDetail(data) {
      const params = {
        storageId: data.storageId,
      };
      this.formData = data;
      const res = await getImagInfoDetail(params);
      console.log(res, "详情");
      this.currentOperateType = 2;
      setTimeout(() => {
        this.init();
        this.load(res.payload);
      }, 500);
    },
    goToList() {
      this.showImg = false;
    },
    handleBeforeUpload(file) {
      console.log(file);
      this.obj.uid = file.uid;
    },
    load(obj) {
      this.canvas.loadFromJSON(obj, () => {
        console.log("加载了");
        this.isUpload = true;
      });
    },
    changeFontSize() {
      const activeTxt = this.canvas.getActiveObject();
      if (activeTxt && activeTxt.type === "textbox") {
        // 设置选中的文字的粗细样式
        activeTxt.setSelectionStyles({ fontSize: this.fontSizeValue }); // 设置选中文字的样式
        this.updateCanvas();
      }
    },
    changeFontWeight() {
      // this.target.set({
      //   fontWeight: this.fontWeightValue,
      // });
      // 当前选中的元素
      const activeTxt = this.canvas.getActiveObject();
      if (activeTxt && activeTxt.type === "textbox") {
        // 设置选中的文字的粗细样式
        activeTxt.setSelectionStyles({ fontWeight: this.fontWeightValue }); // 设置选中文字的样式
        this.updateCanvas();
      }
    },
    changeColor() {
      // if (this.target && this.target.type === "textbox") {
      //   this.target.set({
      //     fill: this.colorValue,
      //   });
      //   this.updateCanvas();
      // }
      // 当前选中的元素
      const activeTxt = this.canvas.getActiveObject();
      if (activeTxt && activeTxt.type === "textbox") {
        // 设置选中的文字的粗细样式
        activeTxt.setSelectionStyles({ fill: this.colorValue }); // 设置选中文字的样式
        this.updateCanvas();
      }
    },
    activeChange(v) {
      this.colorValue = v;
      // if (this.target && this.target.type === "textbox") {
      //   this.target.set({
      //     fill: this.colorValue,
      //   });
      //   this.updateCanvas();
      // }
      const activeTxt = this.canvas.getActiveObject();
      if (activeTxt && activeTxt.type === "textbox") {
        // 设置选中的文字的粗细样式
        activeTxt.setSelectionStyles({ fill: this.colorValue }); // 设置选中文字的样式
        this.updateCanvas();
      }
    },
    handlerError(err, file, fileList) {
      console.log(err);
      console.log(file);
      this.msgError("上传失败！");
    },
    // 恢复缩放平移位置
    resetAllZoom() {
      // 恢复缩放等级
      // 从下标0开始，它们分别代表：
      // [0]: 水平缩放（x轴方向）
      // [1]: 水平倾斜（x轴方向）
      // [2]: 垂直倾斜（y轴方向）
      // [3]: 垂直缩放（y轴方向）
      // [4]: 水平移动（x轴方向）
      // [5]: 垂直移动（y轴方向）
      // 设置平移，缩放
      this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
      this.updateCanvas();
    },
    // 上传成功回调
    handleUploadSuccess(res) {
      console.log(res, "upload");
      if (!res) {
        this.msgError("接口错误，上传失败");
        return false;
      }
      if (res.code === 200) {
        this.isUpload = true;
        this.msgSuccess("上传成功");
        // this.$refs.uploadRef.clearFiles();
        const imgSrc = res.url || res.payload[0];
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
          console.log(img.width, img.height);
          fabric.Image.fromURL(imgSrc, (oImg) => {
            // console.log(oImg);
            // 设置图片的大小和位置
            oImg.left = 0;
            oImg.top = 0;
            this.img = oImg;
            this.canvas.setBackgroundImage(
              imgSrc,
              this.canvas.renderAll.bind(this.canvas)
              // {
              //   // scaleX: this.canvas.width / img.width,
              //   // scaleY: this.canvas.height / img.height,
              // }
            );
            this.updateCanvas();
          });
        };
      } else {
        this.msgError("上传失败");
      }
    },
    handleUploadSuccess2(res) {
      if (!res) {
        this.msgError("接口错误，上传失败");
        return false;
      }
      if (res.code === 200) {
        this.msgSuccess("上传成功");
        this.$refs.uploadRef.clearFiles();
        const imgSrc = res.url || res.payload[0];
        fabric.Image.fromURL(imgSrc, (oImg) => {
          // console.log(oImg);
          const _this = this;
          _this.canvas.add(oImg);
          function animateLeft() {
            oImg.animate(
              {
                opacity: 1,
              },
              {
                duration: 900,
                onChange: _this.canvas.requestRenderAll.bind(_this.canvas),
                onComplete: animateRight,
              }
            );
          }

          function animateRight() {
            oImg.animate(
              {
                opacity: 0.5,
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
        });
      } else {
        this.msgError("上传失败");
      }
    },
    async onSubmit() {
      if (!this.isUpload) {
        this.msgError("请上传图片！");
        return;
      }
      this.$refs.formDataRef.validate(async (valid) => {
        if (valid) {
          const result = this.canvas.toJSON(["customParameters"]);
          const params = {
            ...this.formData,
            detailVo: result,
          };
          console.log(result);
          let res;
          if (this.currentOperateType === 1) {
            res = await saveImagInfo(params);
            console.log(res);
          } else {
            res = await updateImagInfo(params);
          }
          this.msgSuccess(res.msg);
          this.clearCanvas();
          this.value = {};
          this.currentObj = {
            equipmentId: "",
            equipmentName: "",
            equipmentCode: null,
            latlog: "",
            quantity: null,
            status: "",
          };
          this.formData = {
            photoName: "", //名称
            photoDesc: "", //备注
            regionList: [], //区域数组
            detailVo: null, //json数据
          };
          console.log(this.formData);
          this.resetForm("formDataRef");
        } else {
          return false;
        }
      });
    },
    /**
     * @description 清空画布
     */
    clearCanvas() {
      this.canvas.clear();
      this.isUpload = false;
    },
    // 更新画布
    updateCanvas() {
      /* requestRenderAll() 方法是异步的，它会在下一次浏览器的重绘周期中重新渲染画布。
       *                    这个方法通常用于性能优化，可以避免在短时间内重复绘制画布，从而提高应用程序的性能。
       * renderAll() 方法是同步的，它会立即重新渲染画布。这个方法通常用于需要立即更新画布的情况，
       *                    例如在添加、删除或修改对象时。
       */
      this.canvas.renderAll();
    },
    saveToJson() {
      const result = this.canvas.toDatalessJSON(["customParameters"]);
      console.dir(result); // 在控制台输出结果
    },
    //添加文本
    addTextBox() {
      // 1、let Shape = new fabric.Textbox('字体内容', currentOptionCss) : currentOptionCss=>字体样式
      // 2、imageEffectCanvas.add(Shape) : 添加到画布上
      // 3、fontFamily ： 字体类型设置
      // 4、fill ： 字体颜色
      // 5、textBackgroundColor ： 字体背景颜色
      // 6、fontWeight : bold加粗，normal正常
      // 7、textAlign：left 左对齐 right 右对齐 center 居中
      // 8、opacity :number 透明度 0-1取值
      // 9、underline : true false 下划线
      // 10、linethrough:true false 中划线
      // 11、overline: true false 顶部划线
      // 12、lineHeight: number 行高（数字类型）
      // 13、text: string 文字内容
      // 14、fontSize:number 字体大小
      // 15、top: Number 距离画布顶部的距离
      // 16、left: Number 距离画布左边的距离
      // 17、width: Number 默认宽度
      // 18、charSpacing: Number 字间距

      const textbox = new fabric.Textbox("双击编辑文字", {
        width: 100,
        left: 100,
        top: 100,
        fill: this.colorValue,
        // fontWeight: 700,
        opacity: 0.8,
        fontSize: this.fontSizeValue,
        // cornerColor: "#999",
        cornerStyle: "circle",
        lineHeight: 1,
        // cornerStrokeColor: "#999",
        borderScaleFactor: 1,
        // borderColor: "#999",
        splitByGrapheme: true, // 自动换行
      });
      textbox.setControlsVisibility({
        bl: true,
        br: true,
        mb: false,
        mt: false,
        tl: true,
        tr: true,
        mtr: false,
      });

      // 创建自定义控件并添加到矩形里
      textbox.controls.deleteControl = new fabric.Control(
        this.createDeleteControlData()
      );
      const cloneIcon =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAAFUCAYAAAB7ksS1AAAAAXNSR0IArs4c6QAAG0JJREFUeF7tnW2MnNV1x8+d2eUlwmF3bPPWUIy9Y6CEtBFRQtuEkhIBSUPUKBnUKkrbtIDZXZsPbSO1Hyr8oVIrtaISeNcxhC9RpNYOaZLSJgXSYpKUhJY0bYMh3lmDSSiJ32Zt3jE7c6sxxsUYe2f23jv3PM/5IUWK5HvPPfd3/vvjwc/urBP+gQAEIACBKARclCoUgQAEIAABQaiEAAIQgEAkAgg1EkjKQAACEECoZAACEIBAJAIINRJIykAAAhBAqGQAAhCAQCQCCDUSSMpAAAIQQKhkAAIQgEAkAgg1EkjKQAACEECoZAACEIBAJAIINRJIykAAAhBAqGQAAhCAQCQCCDUSSMpAAAIQQKhkAAIQgEAkAgg1EkjKQAACEECoZAACEIBAJAIINRJIykAAAhBAqGQAAhCAQCQCCDUSSMpAAAIQQKhkAAIQgEAkAgg1EkjKQAACEECoZAACEIBAJAIINRJIDWWWTz15VtvNr/Cus0I6lRVOOqdo6IseCkCgWtnSuqn+WAE6Vd0iQlU9nhM3N7ppx89Lu/1+592V4uRjIrKswNeh9bwEtjnvG/smVz+et41in45QCzi/ZdOzl3akc6OIu7GA7dOyXgKPumqnsW/NBT/S26LuzhCq7vkc1d3oph2XuHZ7LSIt0NCK1qqXH1ZctbF3YuX2orWuoV+EqmEKPfQwcnvzikpVviAi5/awnCUQCCDg/6fSqTb2rl01E1DE5FaEWoCxH5bpAwVolRZLQ8D/d7VSbey5aVWzNFcawEUQ6gAghxyxfGp2rO08oQ6ByN7FEvivqneNPZNjs4stYG0fQlU88TM3zp7xqve7FLdIayUn4ER+MF+VxoE19R0lv2qU6yHUKBjjFxm7rXlya0i+IiIfjl+dihDonYD38p8d5xsHJlY/0fsumysRqtK516abd4rI9Urboy17BL7fbrcbB9Zd+KS9q/d+Y4TaO6uBrRzZMHN5peIeHNiBHASBXgh4eaRTGWrsHz9/Zy/LLa5BqAqnXptubhGRhsLWaMk8Af8fnc5QY//alU+ZR/EWABCqslSMTs9+2In/urK2aAcCbyDg/91Xq425Nat+DJajCSBUZYlYOj2z0Yu7SVlbtAOBowl4eVjENVqTYz8Bzf8TQKjK0lCbbj4tIj+nrC3agcBbEfieDEujdUO9m1n+ERGEqigGS6dnPuTF3a+oJVqBwIkJePmuq3Qa+8Yv+F9QIVRVGVi6sfkX3sufqGqKZiCwMIGHKu12Y++6C59ZeGm5V/CEqmi+tenZvxXxv6WoJVqBQK8E/q1SHW7sXbPip71uKOM6hKpoqrXp5ndF5DJFLdEKBPog4L9T9cONPZPn/6yPTaVailAVjbM23ez+2/0sRS3RCgT6JOC/PTQ81Nh9w0qTn0GBUPuMS8rltemmT1mf2hAYCAHvvzVcqTR2jY/tHsh5ig5BqIqGgVAVDYNWggg4kQdfmZfG8zfX9wQVKthmhKpoYAhV0TBoJZiAF9k6X+00nltzwd7gYgUpgFAVDSqlULvhVnRVWhkQASeyXEQuHtBxxxzjRR6Y78w3nlt70b5cPQzyXIQ6SNoLnJVSqJ22fHD/ujpSVTTvQbRS+1zzF6Qj3Q/bySZVEfnX+ZNOaTx7/bmtQdw55xkINSf9N52NUBUNo0StqJCq9//Sdic3DkycN1citMdcBaEqmi5CVTSMkrWiQqriv9k5dbix/zPn7y8Z3iPXQaiKJotQFQ2jhK2okKr39/uhQx/9d6CEiPlwFE1DRaiaplHOXlRIVeQ+mZdG6+b6s2WjzBOqookiVEXDKHErSqR6b+XkdmPvH1z4XJlQI1RF00SoioZR8lZUSNXLP1flYGPP5MXPlwU3QlU0SYSqaBgGWlEhVZFvDJ+2pLHrd856oQzIEaqiKSJURcMw0ooKqXr/9VOGTms8s+acF4uOHaEqmiBCVTQMQ62okKr4f3rby6c2nv7Dc18qMnqEqmh6CFXRMIy1okGqTvw/Ljl1uLHzM+e/XFT8CFXR5BCqomEYbEWFVL2/Z7TtGrM3118p4ggQqqKpIVRFwzDaigapepF/mFt2sCHXXXywaGNAqIomhlAVDcNwKyqk6uVrc0MHGrLmPa8WaRQIVdG0EKqiYRhvRYVURb46t3usIevdfFHGgVAVTQqhKhoGrYgGqYr3X2ktrzfkOtcuwkgQqqIpIVRFw6CVQwRUSFX837d217tPqh3tY0GoiiaEUBUNg1aOEFAi1S+3xusNcU71L7JEqIq+cBCqomHQylEEVEjV+7tbk6sbmkeDUBVNB6EqGgatHENAg1S1/yofhKroCwehKhoGrbwlgdxSRagEs2cCCLVnVCzMSCCnVBFqxsEX7WiEWrSJ2e03l1QRqt3M9X1zhNo3MjZkJJBDqgg148CLdjRCLdrE6HfQUkWoZK5nAgi1Z1QsVERgkFJFqIoGr70VhKp9QvR3PAKDkipCJYM9E0CoPaNioUICg5AqQlU4eK0tIVStk6GvXgkcluq2Xtf3uw6h9kvM8Pra1Pb1wdevVF77WedO56gf2uh0Klv3r6tvDa5PAQgsQMDygwE/KcWXBwQgEJUAQo2Kk2IQgIBlAgjV8vS5OwQgEJUAQo2Kk2IQgIBlAgjV8vS5OwQgEJUAQo2Kk2IQgIBlAgi1ZNOv3dZ8hwzJNV7kU05kRMSNiPgROfT/+QcCPRHYJhW5rnVT/bGeVrPoCAGEWpIw1KZnb3Tir/UiHy3JlbhGXgJIdRH8EeoioGna0hWpiL9RRC7V1Be9lIIAUu1zjAi1T2Balo9smLm8UnG3IlItEyltH0i1j9Ei1D5gaVk6cnvzikrV3yPiTtPSE32UmgBS7XG8CLVHUFqWvSZTeUBLP/RhhgBS7WHUCLUHSFqWpP40Gy33pA+1BJDqAqNBqGqze3Rjh2X6AxE5qSAt02Y5CSDVE8wVoRYg9Ms27Ty70371fhG5uADt0mL5CSDV48wYoRYg/Ic+K9RVbilAq7RohwBSfYtZI1TlXwCHn04fEZFzlLdKe/YIINU3zRyhKv8i4OlU+YBoD6m+IQMIVfkXxNKNzVnvZZXyNmnPNgGkenj+CFXxF8LoxpmPOu/uUdwirUHgdQJIVUQQquIviNp0804RuV5xi7QGgTcSMC9VhKr4C6I23dwjIssUt0hrEHgzAdNSRahKvyCWT207re1Oek5pe7QFgRMRMCtVhKr0C+PwB0X/RGl7tAWBhQiYlCpCXSgWmf58dOPsO533P8x0PMdCIAYBc1JFqDFik6DG6NT29ztX+XaC0pSEwCAJmJIqQh1ktPo4i4/p6wMWS7UTMCNVhKo0ighV6WBoa7EETEgVoS42Hon3IdTEgCmfg0DppYpQc8SqhzNTC7XTlg/20AZLSkagUpEN4rJ+DGSppYpQlX7BpBZqa6LulF6dthISWDo1c5GvVDaL95ckPGah0qWVKkJdaPSZ/hyhZgJv4Nilt2+/0FfdZhH3rozXLaVUEWrGRJ3oaISqdDAlaWvZhh2rO5XOZhH5pYxXKp1UEWrGNCFUpfCNtLX8czvqnU5nsxd5d8Yrl0qqCDVjkhCqUviG2jp9U3NVtd39z39/acZrl0aqCDVjihCqUvjG2jp9emZl1bvN4uQ9Ga9eCqki1IwJQqhK4Rtsa2Tjkysqfr77d6rvzXj9wksVoWZMD0JVCt9oWyMbHjuvUhnuSvV9GREUWqoINWNyEKpS+Ibbqk3NnivObxGRyzJiKKxUEWrG1CBUpfCNt3X4s3i7T6q/khFFIaWKUDMmBqEqhU9bsuyuH5/TeeWV7pPqr2bEUTipItSMaUGoSuHT1iECyzY9dnanfVL3W6o+kBFJoaSKUDMmBaEqhU9bRwiccecTZ84fnN8izl2eEUthpIpQM6YEoSqFT1tHEThz4+wZB73f7ESuyIimEFJFqBkTglCVwqetYwgs2fTMsqH2C1ucZP3YR/VSRahKv3j4cBSlgzHc1pINjy8drg53P/rvyowYVEsVoWZMBk+oSuHT1nEJnD791GhVum//3YcyYlIrVYSaMRUIVSl82johgZG/eXKkcvKhH1O9KiMqlVJFqBkTgVCVwqetBQnUvth8uzwr3e9TvXrBxekWbGtN1N+Zrnz/lRFq/8wGsoO/Qx0IZg4JILDsrh8t6bxc3SJOrgkoE7RV26/yQahB40y3GaGmY0vleASWT207rS3Dm8W5j8Sr2nslhNo7q9QrVf+SOoSaevzUj0XgnE3PvO3l9vPdF1W/Eatmr3UQaq+k0q9DqOkZc4IRAu+49aFTXzpleffXqVw7yCsj1EHSPvFZCFXPLOikDARua548OiTdb/7/2KCug1AHRXrhcxDqwoxYAYH+CKzfdtLoGSd1f0z1N/vbuLjVCHVx3FLsQqgpqFITAuv9UG15s/uBKh9PDQOhpibce32E2jsrVkKgPwJbtlRre9/d/eb/T/S3sb/VCLU/XilXI9SUdKkNAe9dbXq2+32qn0wFA6GmItt/XYTaPzN2QKAvAta+/Y9v7O8rHoNbbC2IgyPLSYMkYC3HCHWQ6erjLGtB7AMNSwtEwFqOEarScFoLotIx0FYgAWs5RqiBgUm13VoQU3Gkbl4C1nKMUPPm7binWwui0jHQViABazlGqIGBSbXdWhBTcaRuXgLWcoxQ8+aNJ1Sl/GkrDgGEGodjt0qnLR/cv66+NV7FuJX4PtS4PKkGgWMIINR4oUCoASytBTEAFVsVE7CWY/6TX2kYrQVR6RhoK5CAtRwj1MDApNpuLYipOFI3LwFrOUaoefPGSyml/GkrDgGEGocjL6UCOVoLYiAutislYC3HPKESRKUEaKsMBBBqvCnylj+ApbUgBqBiq2IC1nLME6rSMFoLotIx0FYgAWs5RqiBgUm13VoQU3Gkbl4C1nKMUPPmjbf8SvnTVhwCCDUOR97yB3K0FsRAXGxXSsBajnlCJYhKCdBWGQgg1HhT5C1/AEtrQQxAxVbFBKzlmCdUpWG0FkSlY6CtQALWcoxQAwOTaru1IKbiSN28BKzlGKHmzRtv+ZXyp604BBBqHI685Q/kaC2IgbjYrpSAtRzzhEoQlRKgrTIQQKjxpshb/gCW1oIYgIqtiglYyzFPqErDaC2ISsdAW4EErOUYoQYGJtV2a0FMxZG6eQlYyzFCzZs33vIr5U9bcQgg1DgcecsfyNFaEANxsV0pAWs55gmVIColQFtlIIBQ402Rt/wBLK0FMQAVWxUTsJZjnlCVhtFaEJWOgbYCCVjLMUINDEyq7daCmIojdfMSsJZjhJo3b7zlV8qftuIQQKhxOPKWP5CjtSAG4mK7UgLWcswTKkFUSoC2ykAAocabIm/5A1haC2IAKrYqJmAtxzyhKg2jtSAqHQNtBRKwlmOEGhiYVNutBTEVR+rmJWAtxwg1b954y6+UP23FIYBQ43DkLX8gR2tBDMTFdqUErOWYJ1SCqJQAbZWBAEKNN0Xe8gewtBbEAFRsVUzAWo55QlUaRmtBVDoG2gokYC3HCDUwMKm2WwtiKo7UzUvAWo4Rat688ZZfKX/aikMAocbhyFv+QI7WghiIi+1KCVjLMU+oBFEpAdoqAwGEGm+KvOUPYGktiAGo2KqYgLUc84SqNIzWgqh0DLQVSMBajhFqYGBSbbcWxFQcqZuXgLUcI9S8eeMtv1L+tBWHAEKNw5G3/IEcrQUxEBfblRKwlmOeUAmiUgK0VQYCCDXeFHnLH8DSWhADULFVMQFrOeYJVWkYrQVR6RhoK5CAtRwj1MDApNpuLYipOFI3LwFrOUaoefPGW36l/GkrDgGEGocjb/kDOVoLYiAutislYC3HPKESRKUEaKsMBBBqvCnylj+ApbUgBqBiq2IC1nLME6rSMFoLotIx0FYgAWs5RqiBgUm13VoQU3Gkbl4C1nKMUPPmjbf8SvnTVhwCCDUOR97yB3K0FsRAXGxXSsBajnlCJYhKCdBWGQgg1HhT5C1/AEtrQQxAxVbFBKzlmCdUpWG0FkSlY6CtQALWcoxQAwOTaru1IKbiSN28BKzlGKHmzRtv+ZXyp604BBBqHI685Q/kaC2IgbjYrpSAtRzzhEoQlRKgrTIQQKjxpshb/gCW1oIYgIqtiglYyzFPqErDaC2ISsdAW4EErOUYoQYGJtV2a0FMxZG6eQlYyzFCzZs33vIr5U9bcQgg1DgcecsfyNFaEANxsV0pAWs55gmVIColQFtlIIBQ402Rt/wBLK0FMQAVWxUTsJZjnlCVhtFaEJWOgbYCCVjLMUINDEyq7daCmIojdfMSsJZjhJo3b7zlV8qftuIQQKhxOPKWP5CjtSAG4mK7UgLWcswTKkFUSoC2ykAAocabIm/5A1haC2IAKrYqJmAtxzyhKg2jtSAqHQNtBRKwlmOEGhiYVNutBTEVR+rmJWAtxwg1b954y6+UP23FIYBQ43DkLX8gR2tBDMTFdqUErOWYJ1SCqJQAbZWBAEKNN0Xe8gewtBbEAFRsVUzAWo55QlUaRmtBVDoG2gokYC3HCDUwMKm2WwtiKo7UzUvAWo4Rat688ZZfKX/aikMAocbhyFv+QI7WghiIi+1KCVjLMU+oBFEpAdoqA4GcQu2ePWiGlao8kOpM3vIHkM0ZxIC22QqBowjkzHFtavt6cZVbyjIShBowyZxBDGibrRBAqIkygFADwCLUAHhsVUMgZ455Qh1sDNxgj+vvtJxB7K9TVkPg+ARy5rhsQvW+84G5yQu+ozVvCFXrZOirNAQQarxReucumRsfezRexbiVEGpcnlSDwDEEEGrEUMzLua2b609HrBi1FEKNipNiEDiWAEKNl4qqP7hkz+TFz8erGLcSQo3Lk2oQ4Ak1VQac7GqN189KVT5GXYQagyI1IHACAjyhRovHra2J+h9Fq5agEEJNAJWSEHgjAYQaJw+Vqvv1vWvGkv0UVowuEWoMitSAAE+oqTMw05qoX5D6kND6CDWUIPshsAABnlDDI+LE/9m+idV/Hl4pbQWEmpYv1SEgCDU0BG67r7r3za1ZdSC0Uur9CDU1YeqbJ4BQwyLgnFu3b3xsQ1iVwexGqIPhzCmGCSDUoOHf15qoXx1UYYCbEeoAYXOUTQIIdZFz97JruOLetWt8bPciKwx8G0IdOHIOtEYAoS5u4tp/bv+tboVQFzdrdkGgZwIItWdURxa6jr9s39rVD/e/M+8OhJqXP6cbIIBQ+xryw5Xq8Mf3rlnx0752KVmMUJUMgjbKSwCh9jhbJ3cPP//i7+367C++0OMOdcsQqrqR0FDZCCDUBSbq5FviZUNrov6los8eoRZ9gvSvngBCPe6I7hORL7Um6p9XP8QeG0SoPYJiGQQWSwChynMiMtf9nxeZcyJf67j5r+4fv2jnYplq3YdQtU6GvkpDIKdQSwOxIBdBqAUZFG0WlwBCLe7s+u0cofZLjPUQ6JMAQu0TWIGXI9QCD4/Wi0EAoRZjTjG6RKgxKFIDAicggFDtxAOh2pk1N81EAKFmAp/hWISaATpH2iKAUO3MG6HamTU3zUQAoWYCn+FYhJoBOkfaIoBQ7cwbodqZNTfNRAChZgKf4ViEmgE6R9oigFDtzBuh2pk1N81EAKFmAp/hWISaATpH2iKAUO3MG6HamTU3zUQAoWYCn+FYhJoBOkfaIoBQ7cwbodqZNTfNRAChZgKf4ViEmgE6R9oigFDtzBuh2pk1N81EAKFmAp/hWISaATpH2iKAUO3MG6HamTU3zUQAoWYCn+FYhJoBOkfaIoBQ7cwbodqZNTfNRAChZgKf4ViEmgE6R9oigFDtzBuh2pk1N81EAKFmAp/hWISaATpH2iKAUO3MG6HamTU3zUQAoWYCn+FYhJoBOkfaIoBQ7cwbodqZNTfNRAChZgKf4ViEmgE6R9oigFDtzBuh2pk1N81EAKFmAp/hWISaATpH2iKAUO3MG6HamTU3zUQAoWYCn+FYhJoBOkfaIoBQ7cwbodqZNTfNRAChZgKf4ViEmgE6R9oigFDtzBuh2pk1N81EAKFmAp/hWNNC9SJbMzDnSIMEnMgVqa7dmqir/jpOdW+NdVUPIvW/2TUOhJ4g0C8BhNovsXTrEWo6tlSGwEAIINSBYO7pEITaEyYWQUAvAYSqZzaqhbpsevbSjvhH9OCiEwioI/Cz1kT9bHVdGW1ItVBPn55ZWRW3w+hsuDYEeiHwvdZE/Zd7Wcia9ASUC/Wp0aocbKXHwAkQKCoB93etibHfLmr3ZetbtVC7sGvTTV826NwHArEIOCd/uW+8/qex6lEnjIB6oS6dan7RO/lU2DXZDYGSEuj4q1prV99f0tsV7lrqhVrbOPMJ8e7uwpGlYQgkJ+BerM372uzN9VeSH8UBPRHQL9Tbmm+XIf+kiKv1dCMWQcAOgS+3JuqftHNd/TdVL9TX/h51ZpOIu1E/TjqEwAAJeLm+NVm/a4AnctQCBAohVL4flRxD4BgC97Ym6tfARReBQgiVp1RdoaEbBQScXNMar9+roBNaeAOBwgiVp1RyC4EjBO5qTdSvh4c+AoUR6qGn1KnZPxbn/0ofRjqCwKAIuJ1Dw5XLdt+wctegTuSc3gkUSqjda41ON7/gRD7d+xVZCYESEfBydWuyfl+JblSqqxROqIeeVDfOflO8v7JUk+AyEFiIgHefbU2O/fVCy/jzfAQKKdTXpNq8Rbysz4eOkyEwOAJe3EfmJsa+MbgTOWkxBAor1MNS/X3xwvfhLWby7CkEAS8y67z73dbk2EOFaNh4k4UW6qG/U51qXuucrBWRq4zPkuuXjoC/w7vK7XPjY4+W7molvVDhhfr6XJZubH7a+0NifW9JZ8W1zBDwd1SkcsfeibHvm7lySS5aGqG+Po9Dv9iv0rnCu8qvpfxNkyWZP9dQQcDtFCdbXafzYLvS3rp//KKdKtqiib4JlE6obyYwsvHxFTI/tKJa8Su8+BV9E2IDBCIT8K7ykhN5oiLuiVdl+IkDE+fNRT6CcpkIlF6ombhyLAQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJAAQjU4dK4MAQikIYBQ03ClKgQgYJDA/wGZYwE2e7KEMQAAAABJRU5ErkJggg==";
      const cloneImg = document.createElement("img");
      cloneImg.src = cloneIcon;

      textbox.controls.clone = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: -16,
        cursorStyle: "pointer",
        mouseUpHandler: this.cloneObject,
        render: this.renderIcon(cloneImg),
        cornerSize: 24,
      });

      // 将文本添加到画布中
      this.canvas.add(textbox);
    },
    cloneObject(_eventData, transform) {
      const target = transform.target;
      const canvas = target.canvas;
      target.clone(function (cloned) {
        cloned.left += 20;
        cloned.top += 20;
        cloned.setControlsVisibility({
          bl: true,
          br: true,
          mb: false,
          mt: false,
          tl: true,
          tr: true,
          mtr: false,
        });
        canvas.add(cloned);
      });
    },
    createDeleteControlData() {
      // 删除按钮图片 base64
      const deleteIcon =
        "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
      // 创建删除图片元素
      const deleteImg = document.createElement("img");
      deleteImg.src = deleteIcon;
      const controlData = {
        x: 0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: 16,
        cursorStyle: "pointer", // 鼠标移到控件时的指针样式
        mouseUpHandler: this.deleteObject, // 鼠标抬起时触发的事件
        render: this.renderIcon(deleteImg),
        cornerSize: 24,
      };
      return controlData;
    },
    addRect(item) {
      // 创建矩形
      const rect = new fabric.Rect({
        top: 100,
        left: 100,
        width: 30,
        height: 30,
        fill: "transparent",
        stroke: "#f00", //边框颜色
        strokeWidth: 1,
        strokeUniform: true, // 限制边框宽度缩放
        customParameters: {
          equipmentCode: item.equipmentCode,
          latlog: item.latlog,
          quantity: item.quantity,
          status: item.status,
          equipmentName: item.equipmentName,
          equipmentType: item.equipmentType,
        },
      });
      this.canvas.add(rect);

      // var circlePoint = new fabric.Circle({
      //   radius: 5,
      //   fill: "red",
      //   left: 150,
      //   top: 120,
      //   selectable: false,
      //   originX: "center",
      //   originY: "center",
      //   hoverCursor: "auto",
      // });
      // // this.canvas.add(circlePoint);
      // // 建组
      // const group1 = new fabric.Group([rect, circlePoint], {
      //   // top: 50, // 整组距离顶部100
      //   // left: 100, // 整组距离左侧100
      //   // angle: -10, // 整组旋转-10deg
      // });
      // this.canvas.add(group1);
      // console.log(group1.getObjects());
      this.updateCanvas();
    },
    addMarker(item) {
      const path = new fabric.Path(
        "M522.32192 383.01696v476.61056c0 12.6976-10.24 23.1424-22.81472 23.1424h-35.84a23.06048 23.06048 0 0 1-22.85568-23.1424V23.1424c0-12.6976 10.28096-23.1424 22.85568-23.1424h35.84c12.57472 0 22.81472 10.40384 22.81472 23.1424v33.5872c28.99968 23.18336 91.79136 68.32128 143.64672 68.32128 69.8368 0 172.35968 0.94208 216.8832 13.68064 28.99968 8.31488 68.28032 10.40384 95.68256 9.95328 17.36704-0.24576 28.54912 18.75968 20.31616 34.24256-25.8048 48.66048-85.85216 126.23872-85.85216 126.23872l73.07264 122.96192c10.24 17.12128-4.34176 38.46144-23.7568 34.73408a716.10368 716.10368 0 0 0-75.3664-10.19904c-72.0896-6.02112-249.52832 6.9632-295.64928-26.37824a1368.6784 1368.6784 0 0 0-68.97664-47.26784z m114.40128 306.87232c186.32704 21.05344 320.79872 80.81408 321.04448 150.97856 0 88.22784-209.63328 159.3344-468.54144 159.3344S20.48 928.64512 20.48 840.62208c0-69.2224 131.072-128.53248 313.9584-150.3232v42.63936c0 11.34592-8.23296 21.0944-19.21024 22.9376-102.03136 17.12128-170.8032 48.86528-170.8032 84.992 0 54.43584 154.4192 98.87744 344.59648 98.87744 190.17728 0 344.51456-44.2368 344.51456-98.63168 0-37.0688-71.68-69.2224-177.64352-86.17984a23.26528 23.26528 0 0 1-19.16928-22.9376v-42.10688z",
        {
          left: 120,
          top: 120,
          scaleX: 0.057983192903987554,
          scaleY: 0.057983192903987554,
          fill: "red",
          customParameters: {
            equipmentId: item.id,
            equipmentName: item.equipmentName,
            equipmentCode: item.equipmentCode,
          },
        }
      );
      path.setControlsVisibility({
        bl: true,
        br: true,
        mb: false,
        ml: false,
        mr: false,
        mt: false,
        tl: true,
        tr: true,
        mtr: false,
      });
      this.canvas.add(path);

      var circlePoint = new fabric.Circle({
        radius: 5,
        fill: "blue",
        left: 150,
        top: 120,
        selectable: false,
        originX: "center",
        originY: "center",
        hoverCursor: "auto",
      });

      // 建组
      // const group1 = new fabric.Group([path, circlePoint], {
      //   // top: 50, // 整组距离顶部100
      //   // left: 100, // 整组距离左侧100
      //   // angle: -10, // 整组旋转-10deg
      //   customParameters: {
      //     equipmentId: item.id,
      //     equipmentName: item.equipmentName,
      //     equipmentCode: item.equipmentCode,
      //   },
      // });

      // this.canvas.add(group1);

      this.updateCanvas();
    },
    // 删除对象
    deleteObject(_eventData, transform) {
      const target = transform.target;
      const cvs = target.canvas;
      cvs.remove(target);
      cvs.requestRenderAll();
    },
    // 渲染自定义图片
    renderIcon(icon) {
      return function (ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    },
    init() {
      this.canvas = new fabric.Canvas("canvas", {
        // backgroundColor: "#092261",
        // backgroundVpt: false, // 不受视口变换影响（也就是不管拖拽还是缩放画布，背景图都不受影响）
        // isDrawingMode: true,
      });
      // 设置画笔颜色
      // this.canvas.freeDrawingBrush.color = "#000";

      // // 设置画笔粗细
      // this.canvas.freeDrawingBrush.width = 6;

      // 画笔投影
      // this.canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      //   blur: 10,
      //   offsetX: 10,
      //   offsetY: 10,
      //   affectStroke: true,
      //   color: "#30e3ca",
      // });
      // 删除按钮图片 base64
      const deleteIcon =
        "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
      // 创建删除图片元素
      let deleteImg = document.createElement("img");
      deleteImg.src = deleteIcon;
      // 删除按钮控件
      fabric.Object.prototype.controls.deleteControl = new fabric.Control(
        this.createDeleteControlData()
      );
      // console.log(fabric);
      this.canvas.on("mouse:wheel", (opt) => {
        let delta = opt.e.deltaY; // 滚轮向上滚一下是 -100，向下滚一下是 100
        let zoom = this.canvas.getZoom(); // 获取画布当前缩放值
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        // this.canvas.setZoom(zoom);
        this.canvas.zoomToPoint(
          {
            // 关键点
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
          },
          zoom
        );
        opt.e.preventDefault(); //取消默认事件
        opt.e.stopPropagation(); //阻止冒泡
      });

      // 鼠标经过的时候变红色
      this.canvas.on("mouse:over", (e) => {
        if (e.target && e.target.type === "path") {
          // e.target.set("fill", "#ff0");
          // console.log("鼠标来了", e);
          e.target.set({
            fill: "green",
            stroke: "green",
          });
          this.updateCanvas();
        }
      });

      // 鼠标移开后变回绿色
      this.canvas.on("mouse:out", (e) => {
        if (e.target && e.target.type === "path") {
          e.target.set({
            fill: "#f00",
            stroke: null,
          });
          this.updateCanvas();
        }
      });
      this.canvas.on("mouse:down", (opt) => {
        console.log(opt, "mousedown");
        if (opt.target) {
          this.target = opt.target;
          this.currentObj = { ...opt.target.customParameters };
        } else {
          // 点击背景整体移动
          this.panning = true;
          this.canvas.selection = false;
        }

        // 鼠标按下时触发
        // let evt = opt.e;
        // if (evt.altKey === true) {
        //   // 是否按住alt
        //   this.canvas.isDragging = true; // isDragging 是自定义的
        //   this.canvas.lastPosX = evt.clientX; // lastPosX 是自定义的
        //   this.canvas.lastPosY = evt.clientY; // lastPosY 是自定义的
        // }
      });
      // 元素移动
      this.canvas.on("mouse:move", (opt) => {
        // console.log(opt);
        if (this.panning && opt && opt.e) {
          let delta = new fabric.Point(opt.e.movementX, opt.e.movementY);
          this.canvas.relativePan(delta);
        }
        // 鼠标移动时触发
        // if (this.canvas.isDragging) {
        //   let evt = opt.e;
        //   let vpt = this.canvas.viewportTransform; // 聚焦视图的转换
        //   vpt[4] += evt.clientX - this.canvas.lastPosX;
        //   vpt[5] += evt.clientY - this.canvas.lastPosY;
        //   this.canvas.requestRenderAll();
        //   this.canvas.lastPosX = evt.clientX;
        //   this.canvas.lastPosY = evt.clientY;
        // }
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
      const _this = this;
      // 创建矩形
      function createRect(top, left) {
        const rect = new fabric.Rect({
          top,
          left,
          width: 100,
          height: 100,
          fill: "transparent",
          stroke: "#f00", //边框颜色
          strokeWidth: 1,
          strokeUniform: true, // 限制边框宽度缩放
        });
        _this.canvas.add(rect);
      }

      // 创建圆形
      function createCircle(top, left) {
        _this.canvas.add(
          new fabric.Circle({
            top,
            left,
            radius: 30,
            fill: "pink",
          })
        );
        _this.updateCanvas();
      }

      // 创建图片元素
      function createImg(top, left) {
        fabric.Image.fromURL("./picture.jpg", (oImg) => {
          oImg.top = top;
          oImg.left = left;
          _this.canvas.add(oImg);
        });
      }
      // 拖拽
      this.canvas.on("drop", (opt) => {
        // 画布元素距离浏览器左侧和顶部的距离
        let offset = {
          left: this.canvas.getSelectionElement().getBoundingClientRect().left,
          top: this.canvas.getSelectionElement().getBoundingClientRect().top,
        };

        // 鼠标坐标转换成画布的坐标（未经过缩放和平移的坐标）
        let point = {
          x: opt.e.x - offset.left,
          y: opt.e.y - offset.top,
        };

        // 转换后的坐标，restorePointerVpt 不受视窗变换的影响
        let pointerVpt = this.canvas.restorePointerVpt(point);
        console.log(pointerVpt, this.currentType);
        switch (this.currentType) {
          case "rect":
            createRect(pointerVpt.y, pointerVpt.x);
            break;
          case "circle":
            console.log(222);
            createCircle(pointerVpt.y, pointerVpt.x);
            break;
          case "img":
            createImg(pointerVpt.y, pointerVpt.x);
            break;
        }
        // 创建完元素，把当前操作的元素类型设置回 null
        this.currentType = null;
      });
    },
  },
};
</script>
