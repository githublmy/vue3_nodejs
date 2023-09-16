import type { FormRules } from "element-plus";
/**
 * @description: 表单字段的类型
 * @param {key: string} key 字符串
 */
type FormData = {
  [key: string]: any;
};
/**
 * @description: 定义表单类型
 * @param {FormData} formData 基本数据
 * @param {FormRules<FormData>} rules 表单验证
 * @param {IList[]} list 需要渲染的数据
 */
export interface IFormData {
  formData: FormData;
  rules?: FormRules<FormData>;
  config?: {
    labelWidth?: string;
    inline?:boolean
  };
  list: {
    key: string; //组件类型
    label: string; //标签显示
    prop: string; //绑定的属性
    class?: string; //css类名
    placeholder?: string;
    multiple?: boolean;
    optionKey?: string;
    optionLabel?: string;
    options?: any[];
    disabled?: boolean;
    clearable?: boolean;
    style: any;
    showPassword: boolean; //密码框
    prefixIcon: string; //前置图标,
    suffixIcon: string; //后置图标,
    ckLabel: string; //复选框的label  checkboxLabel,
    [proName: string]: any;
  }[];
}
