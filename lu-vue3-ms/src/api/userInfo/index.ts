import request from '@/utils/request.ts'
import type { PromiseRes } from '@/types/index'

/**
 * @description: 获取个人信息
 * @return {*}
 */
export function getUserInfo(): PromiseRes<any> {
  return request({
    url: '/routes',
    method: 'post'
  })
}
