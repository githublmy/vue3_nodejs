/*
 * @Description: 保存文件
 */
import { defineStore } from 'pinia'
import type { UploadUserFile } from 'element-plus'

export const useFileListStore = defineStore('fileList', {
  state: (): { fileList: UploadUserFile[] } => ({
    fileList: []
  })
})
