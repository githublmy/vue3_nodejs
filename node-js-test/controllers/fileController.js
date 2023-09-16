
const upload = (req, res) => {
  let fileObj = null;
  let filePath = '';

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send({
      code: 1,
      msg: '请求错误'
    })
    return;
  }
  /* file 是上传时候body中的一个字段，有可以随意更改*/
  // console.log(req.files, req.files.file)
  fileObj = req.files.file;
  filePath = './upload/' + fileObj.name;
  fileObj.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send({
        code: 500,
        msg: '服务器错误'
      })
    }
    res.send({
      code: 0,
      data: '上传成功'
    })
  })
}

module.exports = {
  upload
}