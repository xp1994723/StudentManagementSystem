
/*
    处理学生管理后台路由

 */

//导入模块
const path = require('path')
const express = require('express')

//创建manageRouter对象
const manageRouter = express.Router()

//导入学生管理后台控制
const manageConCtrl = require(path.join(__dirname,'../controllers/manageController.js'))



//处理请求学生列表信息的页面
manageRouter.get('/studentList',manageConCtrl.getStudentListPage)
//处理请求学生信息新增的页面
manageRouter.get('/add',manageConCtrl.getAddStudentPage)
//处理请求学生添加操作
manageRouter.post('/add',manageConCtrl.addStudent)
//处理请求编辑修改学生信息的页面
manageRouter.get('/edit/:studentId',manageConCtrl.getEditStudentPage)
//处理请求编辑修改学生信息操作
manageRouter.post('/edit/:studentId',manageConCtrl.editStudent)
//处理请求删除修改学生信息操作
manageRouter.get('/delete/:studentId',manageConCtrl.deleteStudent)

//到处路由对象
module.exports = manageRouter