/*

    处理后台逻辑

 */

//导入模块
const path = require('path')


//导入操作数据库的包
const connectBase = require(path.join(__dirname,'../tools/connectBase.js'))

//导出处理请求学生列表的页面
exports.getStudentListPage = (req, res) => {
    //获取参数
    const {keyword} = req.query
    const {username} = req.session.loginInfo
    const param = keyword? `select * from studentinfo where name like '%${keyword}%'; `:`select * from studentinfo`
    connectBase.doSql(param,(err, result, fields)=> {
        res.render(path.join(__dirname, '../statics/views/studentList.html'), {target:result,keyword,username})
    })

}

//导出处理请求新增学生信息的页面
exports.getAddStudentPage = (req, res) => {
    const {username} = req.session.loginInfo
    res.render(path.join(__dirname, '../statics/views/add.html'), {username})   //没有参数也要加上一个空对象
}

//导出处理请求添加学生信息的操作
exports.addStudent = (req, res) => {
    const {name, age, sex, phone, address, introduction} = req.body
    const param = `insert into studentinfo(name,age,sex,phone,address,introduction) values("${name}","${age}","${sex}","${phone}","${address}","${introduction}")`
    connectBase.doSql(param,(err, result, fields)=>{
        if (!err) {    //没有报错,添加成功
            res.send(`<script>window.location.href = '/manage/studentList' </script>`)
        } else {
            res.send(`<script>alert('添加失败,请刷新重试')</script>`)
        }
    })
}

//导出请求修改编辑学生信息的页面
exports.getEditStudentPage = (req, res) => {
    const {username} = req.session.loginInfo
    //拿到id值
    const {studentId} = req.params

    const param = `select *from studentinfo where Id = ${studentId}`
    connectBase.doSql(param,(err, result, fields)=> {
        result[0].username = username
        res.render(path.join(__dirname,'../statics/views/edit.html'),result[0])
    })
}

//导出请求修改编辑学生信息操作
exports.editStudent = (req, res) => {
    //拿到id值
    const {studentId} = req.params
    const {name, age, sex, phone, address, introduction} = req.body
    //数据库操作参数
    const param = `update studentinfo set name="${name}", age="${age}", sex="${sex}", phone="${phone}",address="${address}", introduction="${introduction}" where Id=${studentId}`
    connectBase.doSql(param,(err, result)=> {
        if (!err) {
            res.send("<script>window.location.href='/manage/studentList'</script>")
        } else {
            res.send("<script>alert('保存失败,请刷新重试')</script>")
        }
    })
}

exports.deleteStudent = (req, res) =>{
    //拿到id值
    const {studentId} = req.params
    //数据库参数
    const param = `delete from studentinfo where Id in (${studentId})`
    connectBase.doSql(param,(err, result, fileds)=> {
        if (!err) {
            res.send("<script>window.location.href='/manage/studentList'</script>")
        } else {
            res.send("<script>alert('删除失败,请刷新重试');window.location.href='/manage/studentList'</script>")
        }
    })
}