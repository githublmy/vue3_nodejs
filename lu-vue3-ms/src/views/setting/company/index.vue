<template>
  <el-tree-v2
    ref="treeRef"
    highlight-current
    style="max-width: 600px"
    :data="data"
    :props="props"
    :height="500"
    current-node-key="node-7-1-1"
    :expand-on-click-node="false"
    @node-click="nodeClick"
  ></el-tree-v2>
</template>
<script lang="ts" setup>
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}
const treeRef = ref();
const nodeClick = () => {};
const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`;
};

const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = "node"
): Tree[] => {
  let id = 0;
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
      const nodeKey = getKey(key, ++id);
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined,
      };
    });
};

const props = {
  value: "id",
  label: "label",
  children: "children",
};
const data = createData(4, 30, 40);
</script>
