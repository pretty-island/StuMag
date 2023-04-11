/* 获取前端传来的数据，进行处理 */
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// 使用中间件解决get请求解析问题
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 8080;
// 导入数据库
const { Stu } = require('./db');

/**
 * 设置跨域请求
 */
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", "nodejs");
    res.header("Content-Type", "application/json; charset=UTF-8");
    res.setHeader("Cache-Control", "public, max-age=120");
    next();
});

app.get('/hello', (req, res) => {
    res.send('Hello!');
    console.log("hello world");
});

// app.post('/publish', async(req, res) => {
//     // 1. 获取前端传过来的数据
//     // 2. 存入Stu 数据表里
//     try {
//         const { type, classify1, classify2, name, date, region, phone, desc, imgList, time } = req.body;
//         await Stu.create({
//         type, classify1, classify2, name, date, region, phone, desc, imgList, time
//         });
//         res.send("success")
//     } catch (error) {
//         res.send("error")
//     }    
// });

app.listen(port, () => {
    console.log(`示例程序正在监听 ${port} 端口！`)
});

// 查询所有学生信息
app.get("/getAllStu", jsonParser, (req, res) => {
    Stu.find({})
        // .sort({ update_at: -1 })
        .then(stus => {
            res.json(stus);
        })
        .catch(err => {
            console.log(2);
            res.json(err);
        });
});

// 通过ID查询单个学生信息
app.get("/getOneStu/:id", (req, res) => {
    Stu.findById(req.params.id)
        .then(stu => {
            res.json(stu);
        })
        .catch(err => {
            res.json(err);
        });
});

// 添加学生信息
app.post("/addStu", (req, res) => {
    //使用Stu model上的create方法储存数据  
    Stu.create(req.body, (err, stu) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(stu);
        }
    });
});

// 更新学生信息
app.put("/updateStu/:id", (req, res) => {
    Stu.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: {
            name: req.body.name,
            age: req.body.age,
            sex: req.body.sex,
            address: req.body.address,
            dowhat: req.body.dowhat,
            favourite: req.body.favourite,
            explain: req.body.explain
        }
    }, {
        new: true
    })
        .then(stu => res.json(stu))
        .catch(err => res.json(err));
});

// 删除学生信息
app.delete("/deleteStu/:id", (req, res) => {
    Stu.findOneAndRemove({
        _id: req.params.id
    })
        .then(stu => res.send(`${stu.title}删除成功`))
        .catch(err => res.json(err));
});