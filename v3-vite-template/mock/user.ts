import mockJS from "mockjs";

const arr = [
  {
    path: "/index",
    component: "/home/index",
    name: "index",
    title: "首页",
    icon: "House",
    pid: null,
    id: 1,
    sort: 1,
  },
  {
    path: "/editCode",
    component: "/editCode/index",
    name: "editCode",
    title: "代码编辑器",
    icon: "EditPen",
    pid: null,
    id: 3,
    sort: 2,
  },
  {
    path: "/setting",
    component: "/setting/index",
    name: "setting",
    title: "系统设置",
    icon: "Setting",
    pid: null,
    id: 2,
    sort: 99,
  },
  {
    path: "/role",
    component: "/setting/role/index",
    name: "role",
    title: "角色管理",
    icon: "",
    pid: 2,
    id: 7,
    sort: 3,
  },
  {
    path: "/user",
    component: "/setting/user/index",
    name: "user",
    title: "用户管理",
    icon: "",
    pid: 2,
    id: 3,
    sort: 1,
  },
  {
    path: "/company",
    component: "/setting/company/index",
    name: "company",
    title: "公司管理",
    icon: "",
    pid: 2,
    id: 4,
    sort: 2,
  },
  {
    path: "/system",
    component: "/system/index",
    name: "system",
    title: "系统工具",
    icon: "Tools",
    pid: null,
    id: 5,
    sort: 3,
  },
  {
    path: "/file",
    component: "/file/index",
    name: "file",
    title: "文件上传",
    icon: "",
    pid: 5,
    id: 6,
    sort: 2,
  },
  {
    path: "/tool",
    component: "/tool/index",
    name: "tool",
    title: "实用工具",
    icon: "",
    pid: 5,
    id: 11,
    sort: 3,
  },
];

const userInfo1 = {
  userId: 1,
  userName: "admin",
  role: "admin",
  routes: arr,
};

const userInfo = mockJS.mock(userInfo1);

const routes = [
  {
    method: "post",
    url: "/api/routes",
    response: () => {
      return {
        code: 200,
        msg: "success",
        data: userInfo,
      };
    },
  },
];

export default routes;
