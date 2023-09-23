/*
 * @Description: 公共接口
 */
import request from "@/utils/request.ts";
import type { PromiseRes, IGetList } from "@/types/index";

enum API {
  getISBNList = "/common/blmsBook/selectPageBookCataloging",
  getData = "/routes",
  uploadFile = "/common/blmsBook/uploadFile",
}


export function getISBNList(data: object): PromiseRes<IGetList> {
  return request({
    url:API.getISBNList,
    method: "get",
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
