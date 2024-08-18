<template>
  <div class="baseStyle" style="height: 100%">
    <div style="margin-bottom: 30px; border: 1px solid #ccc; padding: 10px">
      我是头部数据
    </div>
    <div style="overflow: hidden; width: 100%; height: calc(100% - 82px)">
      <vxe-table
        border="full"
        round
        show-footer
        show-header-overflow
        show-overflow
        stripe
        height="auto"
        :row-config="{ height: 120 }"
        :footer-method="footerMethod"
        :data="tableData"
      >
        <vxe-column
          type="seq"
          fixed="left"
          header-align="center"
          align="center"
          title="二维"
          width="70"
        ></vxe-column>
        <vxe-column
          type="radio"
          fixed="left"
          header-align="center"
          align="center"
          width="60"
        ></vxe-column>
        <vxe-column
          fixed="left"
          type="checkbox"
          header-align="center"
          align="center"
          width="60"
        ></vxe-column>
        <vxe-column
          field="name"
          sortable
          min-width="100"
          title="行吗是范德萨发撒防守打法萨法萨法撒打发撒打发萨法阿萨德防守打法是"
        ></vxe-column>
        <vxe-column
          field="sex"
          sortable
          min-width="300"
          show-header-overflow="tooltip"
          show-overflow="tooltip"
          :title-prefix="{ content: 'xxxx前缀' }"
          title="Sex水电费水电费是的范德萨发啥打法手打广发的搜嘎放大搜嘎算法的刚发打撒水电费水电费收到发"
        ></vxe-column>
        <vxe-column
          field="age"
          sortable
          min-width="300"
          title="Age"
        ></vxe-column>
        <vxe-column field="age2" min-width="300" title="Age"></vxe-column>
        <vxe-column field="age3" min-width="300" title="Age"></vxe-column>
        <vxe-column field="age4" min-width="300" title="Age"></vxe-column>
        <vxe-column field="ag6e" min-width="300" title="Age"></vxe-column>
        <vxe-column field="ag5e" min-width="300" title="Age"></vxe-column>
        <vxe-column field="a8ge" min-width="300" title="Age"></vxe-column>
        <vxe-column field="a7ge" min-width="300" title="Age"></vxe-column>
        <vxe-column field="ag9e" min-width="300" title="Age"></vxe-column>
        <vxe-column field="ag0e" min-width="300" title="Age"></vxe-column>
        <vxe-column field="a-ge" min-width="300" title="Age"></vxe-column>
        <vxe-column field="ag62e" title="Age"></vxe-column>
        <template #empty>
          <div style="color: red; padding: 20px 0">
            <img
              src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif"
            />
            <p>没有更多数据了！</p>
          </div>
        </template>
      </vxe-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { VxeTablePropTypes } from "vxe-table";

interface RowVO {
  id: number;
  name: string;
  role: string;
  sex: string;
  age: number;
  address: string;
}
const sumNum = (list: any[], field: string) => {
  let count = 0;
  list.forEach((item) => {
    count += Number(item[field]);
  });
  return count;
};

const footerMethod: VxeTablePropTypes.FooterMethod<RowVO> = ({
  columns,
  data,
}) => {
  return [
    columns.map((column, columnIndex) => {
      if (columnIndex === 0) {
        return "平均";
      }
      if (["age"].includes(column.field)) {
        return sumNum(data, column.field);
      }
      return "-";
    }),
  ];
};
const arr = new Array(100).fill(null).map((_item, i) => {
  return {
    id: i + 1,
    name: "Test" + i,
    role: "Develop" + i,
    sex:
      "Madfsfa水电费水电费水电费收到发四大分三大发啥打法萨法打撒法大大算法的算法多大多大水岸东方阿是n" +
      i,
    age: i,
    address: "test abc" + i,
  };
});
const tableData = ref<RowVO[]>([]);
tableData.value = arr;
</script>
