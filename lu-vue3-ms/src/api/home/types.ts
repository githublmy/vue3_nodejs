export interface IData {
  pageNum: number
  pageSize: number
  searchKey: string
  status: string
}
interface IContent {
  id: number
  department: string
  department_name: string
  status: string
  operator: string
  operate_time: string
}
interface IResData {
  content: IContent[]
  pageSize: number
  pageNum: number
  total: number
  totaPages: number
}
export interface IResponse {
  code: number
  msg: string
  data: IResData
}
