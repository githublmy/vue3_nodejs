import request from '@/utils/request'
// import type { PromiseRes } from "@/types/index";
import type { IData, IResponse } from './types'
enum API {
  getDataList = '/getData'
}
/**
 * @description: 获取个人信息
 * @return {*}
 */
// export const getDataList = (data: IData): Promise<IResponse> => request.post(API.getDataList, data)

export function getDataList(data: IData): Promise<IResponse> {
  return request({
    url: API.getDataList,
    method: 'post',
    data
  })
}
