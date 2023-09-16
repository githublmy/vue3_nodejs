<template>
  <el-dialog
    v-model="elData.dialogVisible"
    :title="elData?.title"
    :width="elData?.width"
    top="10vh"
    draggable
    :before-close="handleClose"
    :close-on-click-modal="elData?.closeOnClickModal || false"
  >
    <slot />
    <template #footer>
      <el-button @click="cancleDia">取 消</el-button>
      <el-button type="primary" @click="submitParent"> 确 定 </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const emit = defineEmits(["submit", "cancle"]);
const props = defineProps({
  elDialogOptions: {
    type: Object as any,
  },
});
const elData = props.elDialogOptions;

const handleClose = (done: () => void) => {
  emit("cancle");
  done();
};
const cancleDia = () => {
  emit("cancle");
};
const submitParent = () => {
  emit("submit");
};
</script>
