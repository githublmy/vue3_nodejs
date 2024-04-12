<template>
  <dv-active-ring-chart :config="config" style="width: 100%; height: 100%" />
</template>

<script lang="ts" setup>
const config = ref({
  lineWidth: 24,
  digitalFlopStyle: {
    fill: "pink",
  },
  data: [
    {
      name: "杭州",
      value: 98,
    },
    {
      name: "金华",
      value: 150,
    },
    {
      name: "宁波",
      value: 62,
    },
    {
      name: "太原",
      value: 54,
    },
  ],
});
</script>
