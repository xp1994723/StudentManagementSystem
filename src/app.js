//导入模块
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session")

//创建app
const app = express()

app.engine('html', require('express-art-template'));

//处理post请求获取传递参数的问题
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:360000 }
}))

app.all('*',(req,res,next)=>{
    if (req.url.includes('manage')) {
        if (req.session.loginInfo) {
            next()  //有登录状态,就以继续加载页面
        } else {
            res.send(`<script>window.location.href='/account/login'</script>`)
        }
    } else {
        next()  //除开manage,就不验证登陆状态
    }
})


//设置文件的根目录
app.use(express.static(path.join(__dirname,'statics')))

//导入用户路由对象
const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'))
app.use('/account',accountRouter)
//导入学生路由对象
const manageRouter = require(path.join(__dirname,'./routers/manageRouter.js'))
app.use('/manage',manageRouter)



//开启浏览器监听
app.listen(3000,"127.0.0.1",err=>{
    if (err) {
        console.log(err);
        return
    }
    console.log("start OK");
})