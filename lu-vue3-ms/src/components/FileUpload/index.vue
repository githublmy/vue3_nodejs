<template>
  <div>
    <el-upload
      ref="uploadRef"
      style="width: 100%"
      :action="url"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      drag
      multiple
      :auto-upload="false"
      :show-file-list="false"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-success="handleSuccess"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件或者<em>点击上传</em></div>
      <!-- <template #tip>
        <div class="el-upload__tip">任意文件</div>
      </template> -->
      <!-- <el-button v-blur type="success" @click="pickFiles"> 选择文件 </el-button> -->
    </el-upload>

    <ElTableCommon :tableTitle="tableTitle" :tableData="fileList">
      <template #operate="{ row, index }">
        <!-- <el-button
          type="primary"
          :icon="row.status === 'ready' ? 'VideoPlay' : 'VideoPause'"
          plain
          v-blur
          size="small"
          @click="cancleUpload(row)"
        ></el-button> -->
        <el-button
          type="danger"
          icon="Delete"
          plain
          v-blur
          size="small"
          @click="deleteFile(row, index)"
        ></el-button>
      </template>
    </ElTableCommon>
    <el-button v-blur type="success" @click="submitUpload"> 开始上传 </el-button>
  </div>
</template>

<script lang="ts" setup>
import type { UploadInstance, UploadProps, UploadFile } from 'element-plus'
import { useFileListStore } from '@/store/modules/fileList'
import type { IElPlusMsgFun } from '@/utils/elPlusMessage/type'
const elMsg = inject('elMsg') as IElPlusMsgFun
const url = 'http://localhost:3000/files/upload' || import.meta.env.VITE_UPLOAD_URL
const { fileList } = storeToRefs(useFileListStore())

const tableTitle = ref([
  {
    prop: 'name',
    label: '文件名称'
  },
  {
    prop: 'size',
    label: '文件大小'
  },
  {
    prop: 'percentage',
    label: '上传进度(%)'
  },
  {
    prop: 'operate',
    label: '操作',
    slot: 'operate'
  }
])
// const fileList = ref<UploadUserFile[]>([]);

const uploadRef = ref<UploadInstance>()

const deleteFile = (file: UploadFile, index: number) => {
  uploadRef.value!.handleRemove(file)
  fileList.value.splice(index, 1)
}
// const cancleUpload = (file: UploadFile) => {
//   uploadRef.value!.abort(file);
//   file.status = "ready";
//   file.percentage = 0;
// };
// const pickFiles = () => {
//   // uploadRef.value!.handleStart();
// };
const submitUpload = () => {
  uploadRef.value!.submit()
}
const handleChange: UploadProps['onChange'] = (uploadFile, _) => {
  // console.log(fileList, uploadFiles, "数据zhgon");
  if (uploadFile.status === 'ready') {
    fileList.value.unshift(uploadFile)
  }
}
const handleSuccess: UploadProps['onSuccess'] = (_, __, ___) => {
  // uploadRef.value!.clearFiles(["success"]);
  elMsg.success('上传成功')
  console.log(uploadRef, '最后结果')
}
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const totalSize = file.size //总文件大小
  const fileSize = 1024 * 1024 * 5 //5M一份文件  18
  const num = Math.ceil(totalSize / fileSize) //分成几份 4
  const fList = [] //文件数组
  for (let i = 0; i < num; i++) {
    const start = i * fileSize
    // console.log(start);
    //0 ，5=》0
    const end = Math.min(start + fileSize, totalSize)
    const chunk = file.slice(start, end) //[0,5),[5,10),[10,15),[15,18)
    fList.push(chunk)
  }
  // 将分割后的小块添加到fileList
  // fileList.value = fList;
  // console.log(size, fileSize, num, fList, fileList);
}
const handleProgress: UploadProps['onProgress'] = (event, file, _) => {
  console.log(file, event)
  // console.log(percent);
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  console.log(files, uploadFiles)
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  return true
}
</script>
