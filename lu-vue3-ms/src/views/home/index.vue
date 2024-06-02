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
  </div>
</template>
<script lang="ts" setup>
import WebSocketWrapper from "@/utils/websocket";
const client = new WebSocketWrapper("ws://localhost:3000", {
  reconnectInterval: 1000,
  // maxReconnectAttempts: 2,
});
client.addEventListener("open", (event, id) => {
  console.log(`WebSocket连接 ${id} 已打开:`, event);
});
client.addEventListener("message", (e, id) => {
  console.log(e, id);
});
const res = client.getStatus();
console.log(res);

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
