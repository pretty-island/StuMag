/* 数据库连接 */
// 导入mongoose库
const mongoose = require('mongoose');
 
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
.then(() => {
  console.log("数据库连接成功~")
})
.catch((err) => {
  console.log("数据库连接失败!", err)
})
 
// 声明表结构
const StuSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  classify1: {
    type: String
  },
  classify2: {
    type: String
  },
  name: {
    type: String
  },
  date: {
    type: String
  },
  region: {
    type: String
  },
  phone: {
    type: String
  },
  desc: {
    type: String
  },
  imgList: {
    type: Array
  },
  time: {
    type: Number
  }
})
// 建表
const Stu = mongoose.model("Stu", StuSchema);
// 导出
module.exports = {
  Stu
}