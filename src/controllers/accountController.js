
//导入模块
const path = require("path")
const captchapng = require("captchapng")


//导入连接数据库的包
const connectBase = require(path.join(__dirname,'../tools/connectBase.js'))



//导出处理登出操作
exports.doLogOut = (req, res)=>{
    req.session.loginInfo = null
    res.send(`<script>window.location.href='/account/login'</script>`)
}

//处理请求注册返回页面
exports.getRegisterPage = (req, res)=>{
    res.sendFile(path.join(__dirname,"../statics/views/register.html"))
}

//处理注册逻辑
exports.register = (req, res) =>{
    const result = {
        message: "注册成功",
        status: 0
    }
    const {username, password}= req.body
    const params = `select * from accountinfo where username = "${username}"`
    connectBase.doSql(params,(err, result1, fields)=>{
        if (result1.length === 0) {  //不存在插入数据库中
            const params1 = `insert into accountinfo(username, password) values("${username}","${password}")`
            connectBase.doSql(params1,(err, result2, fields)=>{
                if (err !== null) {
                    result.message = "数据库操作失败"
                    result.status = 2
                }
                res.json(result)
            })
        }else {
            result.message = "用户名已存在"
            result.status = 1
            //返回注册信息
            res.json(result)
        }
    })
}


//处理登录返回页面
exports.getLoginPage = (req, res)=>{
    res.sendFile(path.join(__dirname,'../statics/views/login.html'))
}

//处理验证码图片
exports.getVcodeImg = (req, res)=>{
    //生成验证源码
    const vcode = parseInt(Math.random()*9000+1000)
    //将验证码存进session里面
    req.session.vcode = vcode
    const p = new captchapng(80,30,vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 背景色
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 前景色

    const img = p.getBase64();
    const imgbase64 = Buffer.from(img,'base64')
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
/**
 * 通过对象导出的形式，导出了一个方法，该方法进行登录
 */
exports.login = (req,res) => {
    const result = {
        status:0,
        message:'登录成功'
    }
    //1.获取post参数
    const {username,password,vcode} = req.body

    //2.验证验证码
    if(vcode!=req.session.vcode){
        result.status = 1
        result.message = "验证码错误"
        res.json(result)
        return
    }

    //3.验证用户名和密码
    const params = `select * from accountinfo where username = "${username}" and password = "${password}"`
    connectBase.doSql(params,(err,result1,fields)=>{
        if(result1.length === 0){
            result.status = 2
            result.message = "用户名或密码错误"
        }else {
            req.session.loginInfo = {username,password}   //登陆成功,将登陆信息存进session中
        }
        //返回给浏览器
        res.json(result)
    })
}








