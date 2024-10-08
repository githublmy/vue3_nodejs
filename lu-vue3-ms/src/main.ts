import { createApp } from "vue";
import "./assets/style/index.scss";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import i18n from "./language";
// 自定义指令
import directives from "./directives";
// 提示信息函数
import elMsg from "@/utils/elPlusMessage/index";
// 引入svg注册脚本
import "virtual:svg-icons-register";
// 引入svg组件
import SvgIcon from "@/components/SvgIcon/index.vue";
//粒子背景插件
import Particles from "vue3-particles";
// 如果只想导入css变量暗黑主题
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import DataVVue3 from "@kjgl77/datav-vue3";
// 完整导入 UI 组件库
import VxeUI from "vxe-pc-ui";
import "vxe-pc-ui/lib/style.css";

// 完整导入 表格库
import VxeUITable from "vxe-table";
import "vxe-table/lib/style.css";

// 旧版本使用 setup({}) 或者 config({})
// console.log(VxeUITable);
VxeUITable.setConfig({
  size: "medium", // 全局尺寸 medium / small / mini
  zIndex: 9999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡；新版本可以使用 dom-zindex 共享配置
  // version: 1, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  emptyCell: "　",
  table: {
    fit: true,
    // showHeader: true,
    animat: true,
    delayHover: 250,
    autoResize: true, //响应式
    minHeight: 144,
    // keepSource: false,
    // showOverflow: null,
    // showHeaderOverflow: null,
    // showFooterOverflow: null,
    // resizeInterval: 500,
    // size: null,
    // zIndex: null,
    stripe: true,
    //default（默认）, full（完整边框）, outer（外边框）, inner（内边框）, none（无边框）默认 false，继承 setConfig.table.border
    border: "full",
    round: true,
    // emptyText: '暂无数据',
    // emptyRender: {
    //   name: ''
    // },
    rowConfig: {
      keyField: "_X_ROW_KEY", // 行数据的唯一主键字段名，必须设置，随时都可能会被改变
      // isCurrent: true,
      isHover: true,
    },
    resizeConfig: {
      refreshDelay: 250,
    },
    radioConfig: {
      // trigger: 'default'
      strict: true,
    },
    checkboxConfig: {
      // trigger: 'default',
      strict: true,
    },
    tooltipConfig: {
      enterable: true,
    },
    validConfig: {
      showMessage: true,
      autoClear: true,
      autoPos: true,
      message: "inline",
      msgMode: "single",
    },
    columnConfig: {
      maxFixedSize: 4,
      resizable: true, //启用列宽拖动功能
    },
    // menuConfig: {
    //   visibleMethod () {}
    // },
    customConfig: {
      allowVisible: true,
      allowResizable: true,
      allowFixed: true,
      allowSort: true,
      showFooter: true,
      placement: "top-right",
      //  storage: false,
      //  checkMethod () {},
      modalOptions: {
        showMaximize: true,
        mask: true,
        lockView: true,
        resize: true,
        escClosable: true,
      },
    },
    sortConfig: {
      // remote: false,
      // trigger: 'default',
      // orders: ['asc', 'desc', null],
      // sortMethod: null,
      showIcon: true,
      iconLayout: "vertical",
    },
    filterConfig: {
      // remote: false,
      // filterMethod: null,
      showIcon: true,
    },
    treeConfig: {
      rowField: "id",
      parentField: "parentId",
      childrenField: "children",
      hasChildField: "hasChild",
      mapChildrenField: "_X_ROW_CHILD",
      indent: 20,
      showIcon: true,
    },
    expandConfig: {
      // trigger: 'default',
      showIcon: true,
    },
    editConfig: {
      // mode: 'cell',
      showIcon: true,
      showAsterisk: true,
    },
    importConfig: {
      _typeMaps: {
        csv: 1,
        html: 1,
        xml: 1,
        txt: 1,
      },
    },
    exportConfig: {
      _typeMaps: {
        csv: 1,
        html: 1,
        xml: 1,
        txt: 1,
      },
    },
    printConfig: {},
    mouseConfig: {
      extension: true,
    },
    keyboardConfig: {
      isEsc: true,
    },
    areaConfig: {
      autoClear: true,
      selectCellByHeader: true,
    },
    clipConfig: {
      isCopy: true,
      isCut: true,
      isPaste: true,
    },
    fnrConfig: {
      isFind: true,
      isReplace: true,
    },
    scrollX: {
      // enabled: false,
      gt: 60,
      // oSize: 0
    },
    scrollY: {
      // enabled: false,
      gt: 100,
      // oSize: 0
    },
  },
  // export: {
  //   types: {}
  // },
  grid: {
    // size: null,
    // zoomConfig: {
    //   escRestore: true
    // },
    formConfig: {
      enabled: true,
    },
    pagerConfig: {
      enabled: true,
      // perfect: false
    },
    toolbarConfig: {
      enabled: true,
      // perfect: false
    },
    proxyConfig: {
      enabled: true,
      autoLoad: true,
      message: true,
      props: {
        list: null,
        result: "result",
        total: "page.total",
        message: "message",
      },
      // beforeItem: null,
      // beforeColumn: null,
      // beforeQuery: null,
      // afterQuery: null,
      // beforeDelete: null,
      // afterDelete: null,
      // beforeSave: null,
      // afterSave: null
    },
  },
  toolbar: {
    // size: null,
    // import: {
    //   mode: 'covering'
    // },
    // export: {
    //   types: ['csv', 'html', 'xml', 'txt']
    // },
    // buttons: []
  },
});

import zhCN from "vxe-table/lib/locale/lang/zh-CN";

// 增加语言
VxeUITable.setI18n("zh-CN", zhCN);

// 切换语言
VxeUITable.setLanguage("zh-CN");

const app = createApp(App);

//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app
  .use(i18n)
  .use(router)
  .use(pinia)
  .use(directives)
  .use(Particles)
  .use(DataVVue3)
  .use(VxeUITable)
  .use(VxeUI)
  .provide("elMsg", elMsg)
  .component("svg-icon", SvgIcon)
  .mount("#app");
