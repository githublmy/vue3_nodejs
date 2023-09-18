<template>
  <el-row style="height: 100%">
    <el-col :span="8">
      <el-upload
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-change="handleChange"
        :auto-upload="false"
        :on-exceed="handleExceed"
      >
        <el-button type="primary">选择图片</el-button>
        <template #tip>
          <div class="el-upload__tip">最多可添加1张图片</div>
        </template>
      </el-upload>
    </el-col>
    <el-col :span="16">
      <el-scrollbar height="calc(100vh - 80px)">
        <div
          style="
            width: 500px;
            height: 100%;
            background: rgb(150, 149, 149);
            word-break: break-all;
            padding: 20px;
          "
        >
          {{ result }}
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from "element-plus";
import { genFileId } from "element-plus";
const upload = ref();
const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => "error";
  });
}
const result = ref();
const handleChange: UploadProps["onChange"] = async (file, uploadFiles) => {
  console.log(file, uploadFiles);
  result.value = await fileToBase64(file.raw);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
</script>
<style lang="scss" scoped></style>
