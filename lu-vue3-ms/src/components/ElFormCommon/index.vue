<template>
  <el-form
    ref="formRef"
    :model="data.formData"
    :label-width="data.config?.labelWidth"
    :inline="data.config?.inline || false"
    :rules="data.rules"
  >
    <el-form-item v-for="item in data.list" :label="item.label" :key="item.prop" :prop="item.prop">
      <el-input
        v-if="item.key === 'el-input'"
        :style="item.style"
        v-model="data.formData[item.prop]"
        :placeholder="item.placeholder || '请输入'"
        :clearable="item.clearable || true"
        :show-password="item.showPassword || false"
        :prefix-icon="item.prefixIcon"
        :suffix-icon="item.suffixIcon"
      ></el-input>
      <el-checkbox
        v-else-if="item.key === 'el-checkbox'"
        v-model="data.formData[item.prop]"
        :label="item.ckLabel"
        :style="item.style"
        @change="item.handleChange"
      />
      <el-input-number
        v-else-if="item.key === 'el-input-number'"
        v-model="data.formData[item.prop]"
      />
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="resetForm(formRef)">重置</el-button>
      <el-button type="primary" @click="submitForm">确定内部</el-button>
    </el-form-item> -->
    <el-form-item>
      <slot />
      <!-- <el-button v-blur style="width: 100%" type="primary" @click="validateForm"
        >登录</el-button
      > -->
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import type { IFormData } from './types'

// 泛型
const props = defineProps<{
  data: IFormData
}>()

const formRef = ref<FormInstance>()
const { data } = props

const validateForm = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
  } catch (error) {
    // console.log(error);
    throw new Error()
  }
}
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
defineExpose({
  validateForm,
  resetForm
})
</script>
