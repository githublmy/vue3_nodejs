import { defineStore } from "pinia";

const useTagsViewStore = defineStore("tagsView", {
  state: () => ({
    tagList: [
      {
        path: "/index",
        meta: {
          title: "首页",
        },
      },
    ],
  }),
  actions: {
    setTagsView(tag: any) {
      this.tagList.push(tag);
    },
  },
  // persist: true,
});
export default useTagsViewStore;
