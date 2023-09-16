<template>
  <div>
    <el-upload
      style="width: 500px"
      :action="url"
      :on-preview="handlePreview"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :limit="3"
      :data="data"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
    >
      <el-button type="primary">选择</el-button>
    </el-upload>
    {{ percent }}
  </div>
</template>
<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from "element-plus";

const url = import.meta.env.VITE_UPLOAD_URL;

const fileList = ref<UploadUserFile[]>([]);
const percent = ref(0);
const data: Record<string, any> = reactive({
  systemName: "tpaic-eam",
  userName: "tpaic-eam",
  fileType: "",
});

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  console.log(file);
  data.fileType = file.name.split(".").at(-1);
  const totalSize = file.size; //总文件大小
  const fileSize = 1024 * 1024 * 5; //5M一份文件  18
  const num = Math.ceil(totalSize / fileSize); //分成几份 4
  const fList = []; //文件数组
  for (let i = 0; i < num; i++) {
    const start = i * fileSize;
    console.log(start);
    //0 ，5=》0
    const end = Math.min(start + fileSize, totalSize);
    const chunk = file.slice(start, end); //[0,5),[5,10),[10,15),[15,18)
    fList.push(chunk);
  }
  // 将分割后的小块添加到fileList
  fileList.value = fList;
  // console.log(size, fileSize, num, fList, fileList);
};
const handleProgress: UploadProps["onProgress"] = (event, file, fileList) => {
  console.log(event, file, fileList);
  percent.value = Math.floor((event.loaded / event.total) * 100);
  console.log(percent);
};
const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  console.log(files, uploadFiles);
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  return false;
};
</script>
