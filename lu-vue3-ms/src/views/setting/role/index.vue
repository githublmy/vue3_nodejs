<template>
  <div class="baseStyle">
    {{ $t('message.Hello') }}
    <ElTableCommon
      :config="config"
      :tableTitle="tableTitle"
      :loading="loading"
      :tableData="tableData"
      :total="total"
      v-model:page="data.formData.pageNum"
      v-model:limit="data.formData.pageSize"
      @pagination="getList"
    >
      <template #toolbar>
        <el-button type="primary" icon="Plus" plain v-blur size="small" @click="">新增</el-button>
      </template>
    </ElTableCommon>
  </div>
</template>

<script lang="ts" setup>
import { getDataList } from '@/api/home/index'
const loading = ref(false)
const total = ref(0)

const tableData: Ref = ref([])
const tableTitle = [
  {
    type: 'selection',
    width: 55,
    fixed: 'left'
  },
  {
    prop: 'id',
    label: 'ID'
  },
  {
    prop: 'operator',
    label: '姓名'
  },
  {
    prop: 'status',
    label: '状态'
  },
  {
    prop: 'department_name',
    label: '备注'
  },
  {
    prop: 'operate_time',
    label: '创建时间'
  }
]
const data = reactive({
  formData: {
    pageNum: 1,
    pageSize: 10,
    searchKey: '',
    status: ''
  },
  list: [
    {
      type: 'el-input',
      prop: 'name',
      label: '姓名'
    }
  ]
})
const getList = async () => {
  loading.value = true
  const res = await getDataList(data.formData)
  loading.value = false
  console.log(res, 'ces')
  tableData.value = res.data.content
  total.value = res.data.total
}
const config = reactive({
  showBorder: false,
  showSearch: true,
  handleEvent: getList
})
// getList();
</script>
