<template>
  <div class="link baseStyle">
    <el-row>
      <el-col :span="14" :offset="5">
        <el-input
          v-model="filterText"
          placeholder="请输入关键字"
          size="large"
          clearable
          suffix-icon="Search"
        >
        </el-input>
        <div>标签：vue</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="4"
        v-for="(item, index) in list"
        :key="index"
        class="link-item"
        style="margin-top: 20px"
      >
        <el-link
          type="info"
          style="display: block"
          :href="item.url"
          target="_blank"
          :underline="false"
        >
          <el-row class="item">
            <el-col :span="6">
              <el-avatar
                fit="fill"
                shape="square"
                :src="getImgUrl(item.icon)"
              ></el-avatar>
            </el-col>
            <el-col :span="16">
              <h4 style="color: #000">{{ item.title }}</h4>
              <el-text size="small">{{ item.description }}</el-text>
            </el-col>
          </el-row>
        </el-link>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import link from "@/assets/json/link";
const list = ref(link);
const filterText = ref("");
// 过滤关键字
watch(filterText, (v) => {
  list.value = link.filter((item) => item.keywords.indexOf(v) > -1);
});
// 获取图片地址
const getImgUrl = (url: string) => {
  return new URL(url, import.meta.url).href;
};
</script>
<style lang="scss" scoped>
.link {
  .link-item {
    cursor: pointer;
    :deep(.el-link__inner) {
      display: block;
    }
    .item {
      // border: 1px solid red;
      border-radius: 6px;
      background-color: rgb(229, 240, 244);
      padding: 10px;
      .el-avatar.el-avatar--square {
        background-color: transparent;
      }
    }
    &:hover {
      .item {
        background-color: rgb(221, 229, 235);
      }
    }
  }
}
</style>
