import Mock from "mockjs";

const departments = Mock.mock({
  "newsList|79": [
    {
      id: "@increment",
      department: "@cword(2,15)",
      department_name: "@cword(2,15)",
      "status|1": ["启用", "禁用"],
      operator: "@cname()",
      operate_time: "@date(yyyy-MM-dd hh:mm:ss)",
    },
  ],
});
// console.log(departments, "数据");

const arr = [
  // 配置模块拿数据
  {
    url: "/api/getdata",
    type: "post",
    response: (config: { body: any }) => {
      // console.log(config.body);
      const body = config.body;
      // 启用 & 禁用 & 全部 筛选
      var searchDataList: any[] = [];
      var searchKeyList: any[] = [];
      var status = "";
      if (body.status === "1") {
        status = "启用";
      } else if (body.status === "2") {
        status = "禁用";
      } else {
        status = "全部";
      }
      if (status === "全部") {
        searchDataList = departments.newsList;
      } else {
        for (let i = 0; i < departments.newsList.length; i++) {
          if (departments.newsList[i].status === status) {
            searchDataList.push(departments.newsList[i]);
          }
        }
      }
      // console.log(searchDataList);

      // 关键词搜索
      if (body.searchKey === "") {
        searchKeyList = searchDataList;
      } else {
        for (let i = 0; i < searchDataList.length; i++) {
          if (searchDataList[i].department.indexOf(body.searchKey) != -1) {
            searchKeyList.push(searchDataList[i]);
          }
        }
      }

      // 分页
      var [index, size, total] = [
        body.pageNum,
        body.pageSize,
        searchKeyList.length,
      ];
      var len: any = total / size;
      var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len;
      var newDataList = searchKeyList.slice((index - 1) * size, index * size);
      // console.log(newDataList, "最后的");

      return {
        code: 200,
        msg: "success",
        data: {
          pageNum: index,
          pageSize: size,
          content: newDataList,
          total: total,
          totalPages: totalPages,
        },
      };
    },
  },
];
export default arr;
