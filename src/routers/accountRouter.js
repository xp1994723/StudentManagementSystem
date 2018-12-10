//导入模块
const express = require("express")
const path = require("path")

//创建路由对象
accountRouter = express.Router()

//导入对应的控制器模块
const controllerCtrl = require(path.join(__dirname,'../controllers/accountController.js'))

//处理注册页面的呈现
accountRouter.get('/register',controllerCtrl.getRegisterPage)
//处理注册业务逻辑
accountRouter.post('/register',controllerCtrl.register)

//处理登陆页面呈现
accountRouter.get('/login',controllerCtrl.getLoginPage)
//处理登陆的业务逻辑
accountRouter.post('/login',controllerCtrl.login)
//处理验证码的呈现
accountRouter.get('/vcode',controllerCtrl.getVcodeImg)

//处理登出状态
accountRouter.get('/logout',controllerCtrl.doLogOut)

//导出
module.exports = accountRouter