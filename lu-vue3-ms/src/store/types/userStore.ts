export interface IRouteData {
  component: string
  icon: string
  id?: number
  name: string
  path: string
  pid?: number | null
  sort?: number
  title: string
  isBreadcrumb?: boolean
  redirect?: string
  children?: IRouteData[] | null
  [proName: string]: any
}
