<template>
  <div class="link">
    <el-scrollbar ref="scrollWrapper" noresize @scroll="handleScroll">
      <div class="tags" ref="dtags">
        <router-link
          class="lk"
          ref="test"
          active-class="activeClass"
          v-for="(item, index) in tagList"
          :key="index"
          :to="item.path"
          @contextmenu.prevent="openMenu(item, $event, index)"
          >{{ item.meta.title }}
          <el-icon
            class="icon"
            v-if="item.path !== '/index'"
            @click.prevent="deleteTag(item)"
            ><Close
          /></el-icon>
        </router-link>
      </div>
    </el-scrollbar>
    <div
      class="isShowRefresh"
      :style="{
        left: ofL + 'px',
      }"
      v-if="isShowRefresh"
    >
      <el-text class="text-cls" @click="refresh" size="small">
        <el-icon>
          <Refresh />
        </el-icon>
        刷新页面
      </el-text>
      <el-text
        v-if="indexNum > 1"
        size="small"
        class="text-cls"
        @click="closeLeft"
      >
        <el-icon>
          <Back />
        </el-icon>
        关闭左侧
      </el-text>
      <el-text
        v-if="indexNum < tagList.length - 1"
        class="text-cls"
        size="small"
        @click="closeRight"
      >
        <el-icon>
          <Right />
        </el-icon>
        关闭右侧
      </el-text>
      <el-text
        v-if="tagList.length > 1"
        class="text-cls"
        size="small"
        @click="closeAllTags"
      >
        <el-icon>
          <CloseBold />
        </el-icon>
        关闭所有
      </el-text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useTagsViewStore from "@/store/modules/tagsView";
import { useSidebarStore } from "@/store/modules/sidebar";
const useSidebar = useSidebarStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance() as any;
const dtags = ref();
const useTags = useTagsViewStore();
const isShowRefresh = ref(false);
const ofL = ref(0); // offsetLeft 偏移量可以自定义 可选参数：px 或 整数
interface IObj {
  path?: string;
  meta?: any;
}
const w = computed(() => {
  if (useSidebar.isCollapse) {
    return 64;
  } else return 200;
});
const scrollWrapper = ref();
const test = ref();
let curPath: IObj = {};
let scrollLeft = 0;

const tagList: any = computed(() => useTags.tagList);
watch(isShowRefresh, (value: any) => {
  if (value) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});

watch(
  route,
  (v: { path: string | string[]; meta: any }) => {
    const obj: any = {
      path: v.path,
      meta: v.meta,
    };
    const idx = tagList.value.findIndex((item: IObj) => item.path === obj.path);
    if (idx === -1 && v.path.indexOf("/redirect") === -1) {
      useTags.tagList.push(obj);
    }
    nextTick(() => {
      const i = test.value.findIndex((item: any) => item.to === obj.path);
      const parentWidth = dtags.value.offsetWidth;
      if (i === -1) {
        return;
      }
      const rec = test.value[i].$el.getBoundingClientRect();
      // console.log(parentWidth, "监听数据 ---元素宽度-----");
      // console.log(rec);
      let ofl = rec.left - w.value;
      // console.log(ofl, "距离左侧");
      // 小于左侧滚动
      if (ofl < 0) {
        scrollWrapper.value.setScrollLeft(scrollLeft + ofl - 20);
      } else {
        // 大于右侧滚动
        const num = ofl + rec.width - parentWidth;
        if (num > 0) {
          scrollWrapper.value.setScrollLeft(scrollLeft + num);
        }
      }
    });
  },
  { immediate: true, deep: true }
);
function handleScroll(e: any) {
  console.log(e);
  scrollLeft = e.scrollLeft;
}

const closeMenu = () => {
  isShowRefresh.value = false;
};

const openMenu = (tag: IObj, e: any, index: number) => {
  indexNum.value = index;
  const offsetLeft = proxy.$el.getBoundingClientRect().left;
  ofL.value = e.clientX - offsetLeft - e.offsetX;
  isShowRefresh.value = true; // 显示刷新按钮，默认显示。如果不显示则不可以显
  curPath = tag;
};
// 当前右键点击的tag下标
const indexNum = ref(-1);
// 刷新页面
const refresh = () => {
  closeMenu();
  router.replace("/redirect" + curPath.path);
};
// 关闭左侧
const closeLeft = () => {
  // console.log("关闭左侧", this.indexNum);
  tagList.value.splice(1, indexNum.value - 1);
  if (curPath.path !== route.path) {
    refresh();
  }
};
// 关闭右侧
const closeRight = () => {
  // console.log("关闭右侧", this.indexNum);
  tagList.value.splice(indexNum.value + 1);
  if (curPath.path !== route.path) {
    refresh();
  }
};
// 关闭所有
const closeAllTags = () => {
  // console.log("关闭所有", this.indexNum);
  tagList.value.splice(1);
  if (curPath.path !== route.path) {
    refresh();
  }
};
const deleteTag = (tag: IObj) => {
  const idx = tagList.value.findIndex((item: IObj) => item.path === tag.path);
  if (idx > -1) {
    tagList.value.splice(idx, 1);
  }
  if (tag.path === route.path) {
    router.push(tagList.value.at(-1).path);
  }
};
</script>

<style lang="scss" scoped>
.icon {
  margin-left: 2px;
  padding: 2px;
}
.icon:hover {
  border-radius: 50%;
  outline: 1px solid #918f8f;
  background-color: #767373;
  color: #fff;
}

.activeClass {
  color: #fff !important;
  background-color: rgb(64, 158, 255);
  border-color: rgb(64, 158, 255);
  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 2px;
  }
}

.link {
  height: 30px;
  border-bottom: 1px solid #d8dce5;
  font-size: 12px;
  position: relative;
  .tags {
    padding: 0 $px-20;
    display: flex;
    .lk {
      padding: 0 8px;
      margin-right: 5px;
      margin-top: 2px;
      height: 26px;
      flex-shrink: 0;
      border-radius: 2px;
      border: 1px solid #d8dce5;
      line-height: 26px;
      position: relative;
      text-decoration: none;
      display: flex;
      align-items: center;
      &:visited {
        color: inherit;
      }
    }
  }
  .isShowRefresh {
    cursor: pointer;
    position: absolute;
    top: 30px;
    z-index: 3000;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    padding: 6px 14px;
    background-color: #fff;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text-cls {
      margin-bottom: 6px;
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        color: $color-primary;
      }
    }
  }
  // &::-webkit-scrollbar {
  //   transition: opacity 2s;
  //   width: 0;
  //   height: 0;
  //   opacity: 0;
  // }
  // &:hover {
  //   &::-webkit-scrollbar {
  //     width: 6px;
  //     height: 6px;
  //     opacity: 1;
  //   }
  // }

  // &::-webkit-scrollbar-thumb {
  //   background: #bfbfbf;
  //   border-radius: 20px;
  // }
  // &::-webkit-scrollbar-track-piece {
  //   background: #efefef;
  // }
}
</style>
