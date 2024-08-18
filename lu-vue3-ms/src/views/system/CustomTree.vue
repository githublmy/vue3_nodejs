<template>
  <el-tree
    ref="tree"
    :data="data"
    :props="defaultProps"
    node-key="id"
    show-checkbox
    :check-strictly="true"
    @check-change="handleCheck"
  />
</template>

<script setup lang="ts">
// 使用 defineProps 获取 props
const data = [
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
];

const defaultProps = {
  children: "children",
  label: "label",
};
// 使用 ref 获取 el-tree 的实例
const tree = ref();
const autoSelectChildren = true;
const autoSelectParent = true;
// 处理节点选中事件
const handleCheck = (node: any, isChecked: any, hasChecked: any) => {
  console.log(node, isChecked, hasChecked);

  // 如果启用了自动选择子节点，并且父子节点选择不关联且当前节点被选中
  if (autoSelectChildren) {
    if (node.children && node.children.length > 0) {
      selectChildren(node, isChecked); // 递归选择子节点
    }
  }

  // 如果启用了自动选择父节点，并且父子节点选择不关联且当前节点被选中
  if (autoSelectParent) {
    selectParent(node, isChecked); // 递归选择父节点
  }
};

// 递归选择所有子节点
const selectChildren = (node: any, isChecked: boolean) => {
  // 如果当前节点不是叶子节点
  node.children?.forEach((child: { id: any }) => {
    tree.value?.setChecked(child.id, isChecked); // 选中子节点
    selectChildren(child, isChecked); // 继续递归选中其子节点
  });
};

// 递归选择父节点
const selectParent = (node: any, isChecked: any) => {
  const parentNode = node.parent;
  if (parentNode) {
    tree.value?.setChecked(parentNode.key, isChecked); // 选中父节点
    selectParent(parentNode, isChecked); // 继续递归选中其父节点
  }
};
</script>
