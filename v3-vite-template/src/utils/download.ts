/**
 * @description: Blob文件流下载
 * @param {any} res 二进制数据
 * @param {string} fileName 文件名称
 * @return {*}
 */
export function resolveBlob(res: any, fileName: string) {
  // console.log(res);
  // console.log(mimeType);
  const aLink = document.createElement("a");
  var blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
  aLink.style.display = "none";
  aLink.href = URL.createObjectURL(blob);
  aLink.setAttribute("download", fileName); // 设置下载文件名称
  document.body.appendChild(aLink);
  aLink.click();
  URL.revokeObjectURL(aLink.href); //清除引用
  document.body.removeChild(aLink);
}

/**
 * @description: 二进制文件流
 * @param {any} res 二进制文件流
 * @return {*}
 */
export function resolveBlob2(res: any) {
  // console.log(mimeType);
  const aLink = document.createElement("a");
  const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
  console.log(patt, "dfsdf");
  const contentDisposition = decodeURI(res.headers["content-disposition"]);
  console.log(contentDisposition);
  const result: any = patt.exec(contentDisposition);
  let fileName: string = result[1];
  fileName = fileName.replace(/\"/g, "");

  aLink.style.display = "none";
  aLink.href = URL.createObjectURL(blob);
  aLink.setAttribute("download", fileName); // 设置下载文件名称
  document.body.appendChild(aLink);
  aLink.click();
  URL.revokeObjectURL(aLink.href); //清除引用
  document.body.removeChild(aLink);
}
