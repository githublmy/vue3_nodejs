/**
 * @description: 提示信息的类型
 * @return {*}
 */
export interface IElPlusMsgFun {
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
  warning: (msg: string) => void;
  confirm: (msg: string, ok?: any, cancel?: any) => void;
  prompt: (
    msg: string,
    inputPattern: RegExp,
    inputErrorMessage: string,
    cancel?: any
  ) => void;
}
