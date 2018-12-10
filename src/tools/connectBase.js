// const MongoClient = require("mongodb").MongoClient;
const mysql = require("mysql");


/**
 * 封装执行连接数据库的方法 方便代码的维护
 * @param sqlName   mysql的数据库的表格名
 * @param sql       要执行的sql语句
 * @param callback  回调函数
 */

const collectSql  = (callback)=>{
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'root',
        database : 'szhmqd25'
    });
    callback(connection)
}

/**
 * 封装sql数据库操作
 * @param params
 * @param callback
 */
exports.doSql = (params, callback)=>{
    collectSql(connection=>{
        connection.query(params,(err, result, fields)=>{
            callback(err, result, fields)
        })
    })
}









// //导出符合获取mongodb的数据的方法
// exports.ObjectId = require("mongodb").ObjectId
//
//
// // Connection URL
// const url = "mongodb://127.0.0.1:27017";
//
// // Database Name
// const dbName = "szhmqd25";

/**
 * 分装请求数据库的连接方法
 * @param collectionName
 * @param params
 * @param callback
 */

// const getCollection = (collectionName, params, callback) => {
//     MongoClient.connect(
//         url,
//         {useNewUrlParser: true},
//         function (err, client) {
//             // 获取db对象
//             const db = client.db(dbName);
//             // 获取集合
//             const collection = db.collection(collectionName);
//             callback(collection, client)
//         })
// }
//
//
//
// /**
//  * 暴露出去，查找一个的方法
//  * 参数1：集合名称
//  * 参数2：参数
//  * 参数3：回调（将来把值从databasetool传值给控制器）
//  */
// exports.getOne = (collectionName, params, callback) => {
//     // MongoClient.connect(
//     //     url,
//     //     {useNewUrlParser: true},
//     //     function (err, client) {
//     //         // 获取db对象
//     //         const db = client.db(dbName);
//     //
//     //         // 获取集合
//     //         const collection = db.collection(collectionName);
//     //
//     //         // 调用数据库的方法
//     //         collection.findOne(params, (err, doc) => {
//     //             //关闭
//     //             client.close()
//     //             //调用回调函数，把值传给控制器
//     //             callback(err, doc)
//     //         })
//     //     })
//     getCollection(collectionName,params,(collection, client)=>{
//         // 调用数据库的方法
//         collection.findOne(params, (err, doc) => {
//             //关闭
//             client.close()
//             //调用回调函数，把值传给控制器
//             callback(err, doc)
//         })
//     })
// }
// /**
//  * 暴露出去，添加一个的方法
//  * 参数1：集合名称
//  * 参数2：参数
//  * 参数3：回调（将来把值从databasetool传值给控制器）
//  */
// exports.addOne = (collectionName, params, callback) => {
//     // MongoClient.connect(
//     //     url,
//     //     {useNewUrlParser: true},
//     //     function (err, client) {
//     //         // 获取db对象
//     //         const db = client.db(dbName)
//     //
//     //         // 获取集合
//     //         const collection = db.collection(collectionName);
//     //
//     //         // 调用数据库的方法
//     //         collection.insertOne(params, (err, result) => {
//     //             //关闭
//     //             client.close()
//     //             //调用回调函数，把值传给控制器
//     //             callback(err, result)
//     //         })
//     //     })
//     //
//     getCollection(collectionName,params,(collection, client) =>{
//         // 调用数据库的方法
//         collection.insertOne(params, (err, result) => {
//             //关闭
//             client.close()
//             //调用回调函数，把值传给控制器
//             callback(err, result)
//         })
//     })
// }
//
//
// /**
//  * 暴露出去，查多个数据的方法
//  * 参数1：集合名称
//  * 参数2：参数
//  * 参数3：回调（将来把值从databasetool传值给控制器）
//  */
//
// exports.getMany = (collectionName, params, callback) => {
//     // MongoClient.connect(
//     //     url,
//     //     { useNewUrlParser: true },
//     //     function(err, client) {
//     //         // 获取db对象
//     //         const db = client.db(dbName);
//     //
//     //         // 获取集合
//     //         const collection = db.collection(collectionName);
//     //
//     //         // 调用数据库的方法
//     //         collection.find(params).toArray((err,docs)=>{
//     //             //关闭
//     //             client.close()
//     //             //调用回调函数，把值传给控制器
//     //             callback(err,docs)
//     //         })
//     //     })
//     getCollection(collectionName, params, (collection, client) => {
//         collection.find(params).toArray((err, docs) => {
//             //关闭
//             client.close()
//             //调用回调函数，把值传给控制器
//             callback(err, docs)
//         })
//     })
// }
//
//
// /**
//  * 暴露出去，添加学生信息的方法
//  * 参数1：集合名称
//  * 参数2：参数
//  * 参数3：回调（将来把值从databasetool传值给控制器）
//  */
//
// exports.addStudent = (collectionName, params, callback) => {
//     getCollection(collectionName, params, (collection, client) => {
//         collection.insertOne(params,(err, result) => {
//             //关闭
//             client.close()
//             //调用回调函数，把值传给控制器
//             callback(err, result)
//         })
//     })
// }
//
//
// /**
//  * 暴露出去，修改学生信息的方法
//  * @param collectionName    集合名
//  * @param condition     条件
//  * @param params    参数
//  * @param callback  回调
//  * @constructor
//  */
// exports.EditStudent = (collectionName,condition, params, callback) => {
//     getCollection(collectionName, params, (collection, client) => {
//         collection.updateOne(condition,{$set:params},(err, result) => {
//             //关闭
//             client.close()
//             //调用回调函数，把值传给控制器
//             callback(err, result)
//         })
//     })
// }
//
// exports.DeleteStudent = (collectionName,params, callback)=>{
//     getCollection(collectionName, params, (collection, client) => {
//         collection.deleteOne(params,(err, result) => {
//             //关闭
//             client.close()
//             //调用回调函数，把值传给控制器
//             callback(err, result)
//         })
//     })
// }

