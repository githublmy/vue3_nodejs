<template>
  <div id="vditor" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";

const vditor = ref<Vditor | null>(null);

onMounted(() => {
  vditor.value = new Vditor("vditor", {
    after: () => {
      // vditor.value is a instance of Vditor now and thus can be safely used here
      vditor.value!.setValue("Markdown文档编辑器");
    },
  });
});
</script>
<style lang="scss" scoped>
#vditor {
  height: $page-height !important;
}
</style>
