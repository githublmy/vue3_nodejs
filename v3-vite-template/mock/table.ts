import mockJS from "mockjs";
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const userList = mockJS.mock({
  "list|100": [
    {
      name: "@cname",
      "id|+1": 1,
      place: "@county(true)",
    },
  ],
});

const userListData = [
  {
    method: "post",
    url: "/api/users",
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
