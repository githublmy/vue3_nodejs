<template>
  <div style="width: 100%; height: 100%; padding: 20px">
    <dv-capsule-chart :config="config" style="width: 100%; height: 100%" />
  </div>
</template>

<script lang="ts" setup>
const config = ref({
  data: [
    {
      name: "南阳",
      value: 200,
    },
    {
      name: "周口",
      value: 123,
    },
    {
      name: "漯河",
      value: 98,
    },
    {
      name: "郑州",
      value: 75,
    },
    {
      name: "西峡",
      value: 66,
    },
  ],
  colors: ["#e062ae", "#fb7293", "#e690d1", "#32c5e9", "#96bfff"],
  unit: "",
  labelNum: 8,
  showValue: true,
});
</script>
