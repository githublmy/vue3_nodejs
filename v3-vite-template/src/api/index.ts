/*
 * @Description: 公共接口
 */
import request from "@/utils/request.ts";
import type { PromiseRes, IGetList } from "@/types/index";

export function getISBNList(data: object): PromiseRes<IGetList> {
  return request({
    url: "/common/blmsBook/selectPageBookCataloging",
    method: "post",
    data,
  });
}
export function getData(): PromiseRes<any> {
  return request({
    url: "/routes",
    method: "post",
  });
}
export function uploadFile(): PromiseRes<any> {
  return request({
    url: "/routes",
    method: "post",
  });
}
