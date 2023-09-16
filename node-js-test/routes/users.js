var express = require('express');
var router = express.Router();
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var querystring = require('querystring');  //post需导入   

var db = require('../db')
//添加
router.post('/insert', function (req, res) {
  console.log(querystring.parse(req.body), "数据");
  var name = req.body.name;
  var age = req.body.age;
  var sex = req.body.sex;
  console.log(name, "解析的");
  var sql = `insert into users (name,age,sex) values ("${name}","${age}","${sex}")`
  db.query(sql, function (err, data) {
    res.send({
      code: 200,
      msg: "添加成功"
    });
  })
})

// 删除
router.post('/delete', function (req, res) {
  var id = req.body.id;
  var sql = `delete from users where id = ${id}`;
  db.query(sql, function (err, data) {
    res.send("删除成功");
  })
})
// 修改
router.post('/update', function (req, res) {
  var id = req.body.id;
  var num = req.body.num;
  var name = req.body.name;
  var job = req.body.job;
  // var sql = `update users set name="${name}",num="${num}",job="${job}" where id=${id}`;
  var sql = `update users set name="${name}" where id=${id}`;
  db.query(sql, function (err, data) {
    res.status(200)
    res.send("修改成功");
  })
})
/* 查询. */
router.get('/query', function (req, res, next) {
  //查询users表
  db.query("SELECT * FROM users", [], function (results, fields) {
    console.log("查询结果", results);
    res.status(200)
    res.send({
      status: 200, data: results
    });
  })
});
module.exports = router;
