<template>
  <div>
    <el-select-v2
      v-model="value"
      style="width: 240px"
      filterable
      remote
      :remote-method="remoteMethod"
      clearable
      :options="options"
      :props="props"
      :loading="loading"
      placeholder="Please enter a keyword"
    />
    <el-switch v-model="value2" @change="change" />
  </div>
</template>

<script lang="ts" setup>
const value2 = ref(false);
const change = () => {
  console.log(value2);
};
setTimeout(() => {
  value2.value = true;
}, 1000);
const allList = new Array(50000).fill("").map((_, index) => ({
  value: `${index}`,
  label: `选项${index}---xunaxsdfsdfsdf第三方都是`,
}));
const props = {
  label: "label",
  value: "value",
};
interface ListItem {
  value: string;
  label: string;
}
const value = ref([]);
const options = ref<ListItem[]>([]);
const loading = ref(false);

const remoteMethod = (query: string) => {
  if (query !== "") {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = allList.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options.value = allList.slice(0, 10000);
  }
};
</script>
<style lang="scss" scoped></style>
