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
      action="https://api.dev.shzjsmart.com:18443/file/api/upload"
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
  </div>
</template>
<script lang="ts" setup>
import type { UploadProps, UploadUserFile, UploadInstance } from "element-plus";
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
  // 初始化 uploadStatus 数组，并确保 uid 存在
  uploadStatus.value = fileList.value.map((file) => {
    if (file.uid === undefined) {
      throw new Error(`File ${file.name} is missing uid`);
    }
    return {
      uid: file.uid,
      status: file.status || "uploading",
    };
  });
  console.log(uploadStatus.value);

  // 调用 el-upload 组件的提交方法
  uploadRef.value?.submit();
};
// 更新文件上传状态
const updateFileStatus = (
  uid: string | number,
  status: "success" | "fail"
) => {
  const index = uploadStatus.value.findIndex((item) => item.uid === uid);
  if (index !== -1) {
    uploadStatus.value[index].status = status;
    checkAllFilesUploaded(); // 检查所有文件的上传状态
  }
};

// 检查是否所有文件都已上传完毕
const checkAllFilesUploaded = () => {
  const allUploaded = uploadStatus.value.every(
    (file) => file.status !== "uploading"
  );
  console.log(fileList.value);
  console.log(uploadStatus.value, "文件状态");

  if (allUploaded) {
    ElMessage.success("所有文件都已上传完成或失败。");
    // 在此处执行其他需要的操作
    console.log(fileList.value);
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
<style lang="scss" scoped></style>
