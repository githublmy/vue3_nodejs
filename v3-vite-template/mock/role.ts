import mockJS from "mockjs";
const userList = mockJS.mock({
  "data|50": [
    {
      name: "@cname",
      "id|+1": 1,
    },
  ],
});

const userListData = [
  {
    method: "post",
    url: "/api/roles",
    response: () => {
      return {
        code: 200,
        msg: "success",
        data: userList,
      };
    },
  },
];

export default userListData;
