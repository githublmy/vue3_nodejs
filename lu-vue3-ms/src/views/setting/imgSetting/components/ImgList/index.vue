<template>
  <div>
    <el-page-header @back="goBack" content="列表"> </el-page-header>
    <el-row class="mb8">
      <RightToolbar @queryTable="getList" />
    </el-row>
    <el-table
      :data="tableData"
      v-loading="loading"
      v-adaptive="{
        bottomOffset: 20,
      }"
      stripe
      height="100px"
      style="width: 100%"
    >
      <el-table-column prop="photoName" label="名称"> </el-table-column>
      <el-table-column prop="photoDesc" label="备注"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="{ row }">
          <el-button v-blur type="text" size="mini" @click="editArea(row)">
            修改
          </el-button>
          <el-button v-blur type="text" size="mini" @click="deleteArea(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="searchForm.pageNum"
      :limit.sync="searchForm.pageSize"
      @pagination="getList"
    /> -->
  </div>
</template>

<script>
// import { getImagInfoList, deleteImagInfo } from "@/api/imgSetting/index";

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      searchForm: {
        condition: null,
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    editArea(row) {
      this.$emit("getDetail", row);
      this.goBack();
    },
    deleteArea(row) {
      this.$confirm(`确定删除吗？`, "提示", { type: "warning" })
        .then(async () => {
          const params = {
            storageId: row.storageId,
          };
          const res = await deleteImagInfo(params);
          console.log(res);
          this.msgSuccess(res.msg);
          this.getList();
        })
        .catch(() => {});
    },
    async getList() {
      const res = await getImagInfoList(this.searchForm);
      console.log(res);
      this.tableData = res.payload;
    },
    goBack() {
      this.$parent.showImg = true;
    },
  },
};
</script>
