/*
 * @Description: 方法
 */
import { RouteRecordRaw } from "vue-router";
//获取当前时间----年月日时分
export function getNowTime(type?: any, t2?: string) {
  const d = new Date();
  const year = d.getFullYear();
  const month =
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  const date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  const minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  // const second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  let time = `${year}-${month}-${date} ${hour}:${minute}`;
  if (type) {
    time = `${year}-${month}-${date} 00:00`;
  } else {
    if (t2) {
      time = `${year}-${month}-${date}`;
    }
  }
  return time;
}
/**
 * @description: 获取两个日期之间的月份，返回数组
 * @param {string} start
 * @param {string} end
 * @return {[]} any[] 返回两个日期之间的所有月份，逗号分隔的数组或空数组 或空数组
 */
export function getMonthBetween(start: string, end: string) {
  let result = [];
  let s: any = start.split("-");
  let e: any = end.split("-");
  let min = new Date();
  let max = new Date();
  min.setFullYear(s[0], s[1]);
  max.setFullYear(e[0], e[1]);
  var curr = min;
  while (curr <= max) {
    let month = curr.getMonth();
    let str =
      (month == 0 ? curr.getFullYear() - 1 : curr.getFullYear()) +
      "-" +
      (month == 0 ? 12 : month < 10 ? "0" + month : month);
    let s = curr.getFullYear() + "-12";
    if (str == s) {
      str = curr.getFullYear() + "-12";
    }
    result.push(str);
    curr.setMonth(month + 1);
  }
  return result;
}
/**
 * @description: 获取某月天数和周几 2022-03
 * @param {string} str
 * @return {any[]}
 */
export function getMounthNum(str: string) {
  const arr = [];
  const a = str.split("-").map((item) => Number(item));
  // console.log(a, "sdf");
  const num = new Date(a[0], a[1], 0).getDate();
  // 获取周几
  function getWeek(n: number | undefined) {
    const weekList = ["日", "一", "二", "三", "四", "五", "六"];
    const weekNum = new Date(a[0], a[1] - 1, n).getDay();
    return weekList[weekNum];
  }
  for (let i = 0; i < num; i++) {
    arr.push({
      dayTime: (i + 1).toString(),
      weekName: getWeek(i + 1),
    });
  }
  return arr;
}
//数组转菜单
/**
 * @description: 数组转树形菜单
 * @param {any} arr
 * @param {*} fatherLayoutId
 * @return {*}
 */
export function arrayToMenuTree(arr: IRouteData[], fatherLayoutId = 1) {
  const tree: IRouteData[] = [];
  arr.map((item) => {
    let children: IRouteData[] = [];
    const params: IRouteData = {
      path: item.path,
      title: item.title,
      icon: item.icon,
      name: item.name,
      component: item.component,
      isBreadcrumb: item.isBreadcrumb,
      children: [],
    };
    if (item.pid == fatherLayoutId) {
      // 找子节点   把自身的item存储到对应的位置中,根据parentId找到
      children = arrayToMenuTree(arr, item.id);
      if (children.length) {
        params.children = children;
      }
      tree.push(params);
    }
  });
  return tree;
}
/**
 * @description: 获取所有views下的 .vue 文件信息
 * 多层级文件动态导入。 /home/index
 * 注： vite  默认只支持一级文件
 */
const modules: any = import.meta.glob("../views/**/*.vue");
// console.log(modules, "获取所有的");

export interface IRouteData {
  component: string;
  icon: string;
  id?: number;
  name: string;
  path: string;
  pid?: number | null;
  sort?: number;
  title: string;
  isBreadcrumb?: boolean;
  redirect?: string;
  children?: IRouteData[] | null;
  [proName: string]: any
}
/**
 * @description: 树形转路由
 * @param {RouteRecordRaw[]} routers
 * @example
 * handleRouter(routers: RouteRecordRaw[])
 * @return {RouteRecordRaw[]} newRoutes
 */
export function handleRouter(routers: IRouteData[]) {
  const newRoutes: RouteRecordRaw[] = routers.map((r) => {
    const route: any = {
      path: r.path,
      meta: {
        title: r.title,
        icon: r.icon,
      },
      name: r.name,
      component: modules[`../views${r.component}.vue`],
    };
    // 重定向
    if (r.redirect) {
      route.redirect = r.redirect;
    }
    if (r.children) {
      route.children = handleRouter(r.children);
    }
    return route;
  });
  return newRoutes;
}
/**
 * @description: 数组转树形，并且排序
 * @return {*}
 */

export function toTree({
  arrList = [],
  id = "id",
  pid = "pid",
  order = "sort",
}) {
  let up: any = arrList
    .filter((x: any) => x[pid] === null)
    .sort((a: IRouteData, b: IRouteData) => a[order] - b[order]);
  let cp: IRouteData[] = arrList.filter((x: IRouteData) => x[pid]);
  getData(up);
  function getData(arr = []) {
    arr.forEach((element: any) => {
      let ar = cp
        .filter((item: IRouteData) => element[id] == item[pid])
        .sort((a: IRouteData, b: IRouteData) => a[order] - b[order]);
      if (ar.length) {
        element.children = ar;
        element.redirect = ar[0].path;
      }
      if (ar.length < cp.length) {
        getData(element.children);
      }
    });
  }
  return up;
}

/**
 * @description: 导出文件流
 * @param {*} res  所有文件参数
 * @return {*}
 */
export function resolveBlob(res: any) {
  // ElNotification({
  //   title: "正在导出",
  //   message: fileName,
  //   type: "warning",
  // });
  const aLink = document.createElement("a");
  var blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
  // console.log(patt);
  var contentDisposition = decodeURI(res.headers["content-disposition"]);
  var result: any = patt.exec(contentDisposition);
  // console.log(result);
  var fileName = result[1];
  fileName = fileName.replace(/\"/g, "");
  console.log(fileName);
  aLink.style.display = "none";
  aLink.href = URL.createObjectURL(blob);
  aLink.setAttribute("download", fileName); // 设置下载文件名称
  document.body.appendChild(aLink);
  aLink.click();
  URL.revokeObjectURL(aLink.href); //清除引用
  document.body.removeChild(aLink);
}
