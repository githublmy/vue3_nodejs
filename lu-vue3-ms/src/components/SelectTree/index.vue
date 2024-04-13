<!--<template>
  <!~~  基本配置 vue2 版本
        官方文档  https://vue-treeselect.js.org/
        multiple  是否多选，默认false
        showCount 是否显示选中数量，默认false
        flat 是否平铺展示，默认false
        placeholder 输入框提示文字，默认'请选择'
        noChildrenText 没有子节点时的提示文字，默认''
        noOptionsText 没有数据时的提示文字，默认'无数据'
        noResultsText 搜索无结果时的提示文字，默认'无数据'
        size 输入框大小，可选值： small, mini，默认small 跟随elementui
        disabled 是否禁用，默认false
        clearable 是否显示清除按钮，默认true
        filterable 是否支持搜索，默认true
        zIndex 显示层级 默认2019
        :options 数据选项
        appendToBody 是否将下拉树放置于body下，默认false
        :value 绑定值
        :defaultExpandLevel 展开节点的层级 默认1 展开所有设置 Infinity
  ~~>
  <div class="tree-slelect-vue">
    <TreeSelectVue
      ref="treeSelect"
      :class="getSizeClass()"
      v-bind="$attrs"
      v-model="treeValue"
      v-on="$listeners"
      appendToBody
      showCount
      flat
      :placeholder="placeholder"
      noChildrenText=""
      noOptionsText="无数据"
      noResultsText="无数据"
      clearAllText="清空所有"
      clearValueText="清空"
      :defaultExpandLevel="2"
      :zIndex="zIndex"
      :maxHeight="268"
      :normalizer="my_normalizer"
      @select="select"
    >
    </TreeSelectVue>
    <slot name="right"></slot>
  </div>
</template>

<script>
// 导入Treeselect组件
import TreeSelectVue from "y_treeselect";
// 导入Treeselect组件样式
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "tree-select-vue",
  components: {
    TreeSelectVue,
  },
  props: {
    value: {
      default: null,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    size: {
      type: String,
      default: "small",
    },
    zIndex: {
      type: Number | String,
      default: 9999,
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "label",
          id: "id",
          isDisabled: "isDisabled",
        };
      },
    },
  },
  computed: {
    treeValue: {
      get() {
        //没有数据时不显示
        let v = this.value;
        if (v === "" || v === undefined) {
          v = null;
        }
        return v;
      },
      set(val) {
        let temp = val;
        if (val === "" || val === undefined || val === null) {
          temp = null;
          this.clearAll();
        }
        // console.log(temp, "set");
        // this.$emit("input", temp);
        // this.$emit("change", temp);
      },
    },
  },
  methods: {
    clearAll() {
      this.$refs.treeSelect.clear();
    },
    getSizeClass() {
      if (this.size === "small") {
        return "treeselect-small";
      }
    },
    select(node) {
      this.$nextTick(() => {
        this.$emit("change", node);
      });
    },
    //禁用任意节点
    my_normalizer(node) {
      const params = this.defaultProps;
      if (!node[params.children] || node[params.children].length === 0) {
        delete node[params.children];
      }
      return {
        id: node[params.id],
        label: node[params.label],
        children: node[params.children],
        isDisabled: node[params.isDisabled],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.tree-slelect-vue {
  display: flex;
  align-items: center;
}
//small 大小  对比element-ui的small
.treeselect-small {
  font-size: 13px !important;
  :deep(.vue-treeselect__control) {
    height: 32px;
  }
  :deep(.vue-treeselect__placeholder),
  :deep(.vue-treeselect__single-value) {
    line-height: 31px !important;
    font-size: 13px !important;
  }
  // :deep(.vue-treeselect__single-value) {
  //   color: #c0c4cc;
  // }
}

.tree-slelect-vue.width300px {
  .treeselect-small.vue-treeselect {
    width: 300px;
  }
}
.tree-slelect-vue.width240 {
  .treeselect-small.vue-treeselect {
    width: 240px;
  }
}
.tree-slelect-vue.width500 {
  .treeselect-small.vue-treeselect {
    width: 400px;
  }
}
</style>
-->