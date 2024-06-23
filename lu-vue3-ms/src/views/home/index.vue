<template>
  <div>
    首页
    <span>{{ $t("message.Hello") }}</span>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <el-upload
      style="width: 500px"
      ref="uploadRef"
      v-model:file-list="fileList"
      action="/file/api/upload"
      multiple
      :data="data"
      :on-success="handleSuccess"
      :on-error="handleError"
      :auto-upload="false"
      :limit="9"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
      <el-button type="primary" @click="uploadFiles">手动上传</el-button>
    </el-upload>

    <!-- <details open>
      <summary class="custom-triangle">点我展开</summary>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat
      necessitatibus in ipsam, consectetur commodi possimus fugit dicta
      accusamus dolorem excepturi officia repellendus maxime ea atque animi
      quisquam vitae fugiat. Ab.
    </details> -->

    <!-- <RecycleScroller
  class="scroller" ref="scrollerRef"
  :items="allOptions"
  :item-size="40"
  page-mode
  :buffer="274"
  :prerender="20"
>
  <template #default="{ item }">
    <div>{{ item.name }}</div>
  </template>
</RecycleScroller> -->

    <el-select
      style="width: 240px"
      v-model="selectedValue"
      :persistent="true"
      filterable
      clearable
      remote
      :remote-method="loadOptions"
      :loading="loading"
      remote-show-suffix
      placeholder="请选择"
      @change="change"
    >
      <RecycleScroller
        :items="filterList"
        :item-size="40"
        page-mode
        key-field="id"
        :buffer="274"
        :prerender="20"
      >
        <template #default="{ item }">
          <el-option :value="item.id" :label="item.name">{{
            item.name
          }}</el-option>
        </template>
      </RecycleScroller>
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import type { UploadProps, UploadUserFile, UploadInstance } from "element-plus";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
const selectedValue = ref();
const options: Ref = ref([]);
console.log("清除了吗？首页");

const generateData = () => {
  const data = [];
  for (let i = 0; i < 50000; i++) {
    data.push({
      id: i + 1,
      name: `选项 ${i + 1}--测试护具湿哒哒电费水电费水电费收到`,
    });
  }
  return data;
};

const allOptions = generateData();
const loading = ref(false);
const change = (v: any) => {
  console.log(v, "变了");

  if (!v) {
    loadOptions("");
  }
};
const loadOptions = (query: string) => {
  loading.value = true;
  console.log(query);
  // const arr = allOptions.filter((item) => item.name.includes(query));
  // if (query && !arr.length) {
  //   show.value = false
  // } else {
  //   show.value = true

  // }
  setTimeout(() => {
    if (query) {
      options.value = allOptions.filter((item) => item.name.includes(query));
    } else {
      options.value = allOptions;
    }
    loading.value = false;
  }, 50);
};

// 初次加载全部数据
loadOptions("");

const filterList = computed(() => options.value);
const fileList = ref<UploadUserFile[]>([]);
// 文件状态类型定义
interface FileStatus {
  uid: string | number;
  status: "uploading" | "success" | "fail" | "ready";
}
// 用于跟踪上传状态的数组
const uploadStatus = ref<FileStatus[]>([]);
const data = {
  uid: "",
  bucket: "test",
  project: "",
};
const uploadRef = ref<UploadInstance>();
// 上传成功的处理函数
const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  console.log(response);
  if (uploadFile.uid !== undefined) {
    updateFileStatus(uploadFile.uid, "success");
  }
};

// 上传失败的处理函数
const handleError: UploadProps["onError"] = (err, uploadFile) => {
  console.error("Upload error:", err);
  if (uploadFile.uid !== undefined) {
    updateFileStatus(uploadFile.uid, "fail");
  }
};
// 开始上传文件
const uploadFiles = () => {
  console.log(fileList.value, "所有文件");

  // 初始化 uploadStatus 数组，并确保 uid 存在
  uploadStatus.value = fileList.value.map((file) => {
    if (file.uid === undefined) {
      throw new Error(`File ${file.name} is missing uid`);
    }
    return {
      uid: file.uid,
      status: file.status || "ready",
    };
  });
  console.log(uploadStatus.value, "上传");

  // 调用 el-upload 组件的提交方法
  uploadRef.value?.submit();
};
// 更新文件上传状态
const updateFileStatus = (uid: string | number, status: "success" | "fail") => {
  const index = uploadStatus.value.findIndex((item) => item.uid === uid);
  if (index !== -1) {
    uploadStatus.value[index].status = status;
    checkAllFilesUploaded(); // 检查所有文件的上传状态
  }
};

// 检查是否所有文件都已上传完毕
const checkAllFilesUploaded = () => {
  const allUploaded = uploadStatus.value.every(
    (file) => file.status !== "ready"
  );
  console.log(fileList.value);
  console.log(uploadStatus.value, "文件状态");

  if (allUploaded) {
    // 在此处执行其他需要的操作
    ElMessage.success("操作完成");
    console.log(
      "--------------所有文件都已上传完成或失败----------------------"
    );
    console.log(fileList.value);
    console.log("------------------------------------");
  }
};

// import WebSocketWrapper from "@/utils/websocket";
// const client = new WebSocketWrapper("ws://localhost:3000", {
//   reconnectInterval: 1000,
//   // maxReconnectAttempts: 2,
// });
// client.addEventListener("open", (event, id) => {
//   console.log(`WebSocket连接 ${id} 已打开:`, event);
// });
// client.addEventListener("message", (e, id) => {
//   console.log(e, id);
// });
// const res = client.getStatus();
// console.log(res);

// client.close()
// let isC = 1
// ElMessageBox.prompt('proxy will permanently delete the file. Continue?', 'Warning', {
//   type: 'warning',
//   inputErrorMessage: '请输入',
//   inputPattern: /.+/,
//   beforeClose: (action, _instance, done) => {
//     // console.log(action, instance, done)
//     if (action === 'confirm') {
//       console.log(isC)
//       getData()
//       done()
//       // ElMessageBox.close()
//     } else {
//       console.log('取消')
//       done()
//     }
//   }
// })
//   .then(({ value }) => {
//     console.log(value)
//     console.log(isC)
//   })
//   .catch(() => {})
// const getData = () => {
//   setTimeout(() => {
//     console.log(3333)
//   })
// }
</script>
<style lang="scss" scoped>
details {
  font: 16px "Open Sans", Calibri, sans-serif;
  width: 620px;
}

details > summary {
  padding: 2px 20px;
  list-style: none;
  position: relative;
}

details[open] > summary {
  background-color: #ccf;
  position: relative;
}
details[open] > summary::before {
  content: ">";
  position: absolute;
  top: 2px;
  left: 6px;
  transform: rotate(90deg);
}

.custom-triangle::before {
  content: ">";
  position: absolute;
  top: 2px;
  left: 6px;
  transition: 0.3s;
}
</style>
: any: string | boolean
