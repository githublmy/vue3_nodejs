// 接口类型定义
interface IRes<T> {
  [x: string]: any;
  code: number;
  msg: string;
  payload: T;
}
export type PromiseRes<T> = Promise<IRes<T>>;

/**
 * @description: 分页数量的类型
 */
export interface IGetList {
  content: any[];
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalSize: number;
}
/**
 * @description: 搜索表单数据类型
 * @return {*}
 */
export interface IPageSet {
  condition?: string;
  pageNum: number;
  pageSize: number;
  [proName: string]: any;
}
// 表格数据类型

export interface TableOptions {
  // 字段名称
  prop?: string;
  // 表头
  label?: string;
  // 对应列的宽度
  width?: string | number;
  // 对齐方式
  align?: string;
  slot?: string;
  fixed?: string;
  type?: string;
  [proName: string]: any;
}
