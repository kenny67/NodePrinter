<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<form action="http://localhost:8080/" method="post" enctype="application/x-www-form-urlencoded">
			用户：
			<input type="text" name="user" id="user" placeholder="用户名"><br>
			密码：
			<input type="password" name="password" id="password" placeholder="密码"/><br>
			<input type="submit" value="提交"/>
		</form>
	</body>
</html>


http://localhost:8080/
→→→→→→→→→→→→
http://localhost:5000/to_print/



const express=require("express");
const bodyParser=require("body-parser");
 
var app=express();
 
// 解析application/json数据
var jsonParser = bodyParser.json();
// 解析application/x-www-form-urlencoded数据
var urlencodedParser = bodyParser.urlencoded({ extended: false });
 
app.post('/',urlencodedParser,function(req,res){
	res.send(req.body);
});
 
app.listen(8080);


或者

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="http://localhost:3000/add" method="POST">
        <input type="text" name="uname" id="">用户名
        <input type="password" name="password" id="">密码
        <input type="submit" value="提交">
    </form>
</body>
</html>




// 引入express框架
const express = require('express');
// 引入body-parser模块
const bodyparser = require('body-parser');
// 创建网站服务器
const app = express();
// 拦截所有请求 urlencoded()里的参数是必填的
// extended:false表示方法内部使用querystring模块处理请求参数的格式
// extended:true表示方法内部使用第三方模块qs处理请求参数的格式
// 默认使用extended:false即可满足我们的需求
app.use(bodyparser.urlencoded({extended:false}))
// 处理POST请求参数
app.post('/add',(req,res) => {
    // body属性就是bodyparser在req中添加的属性，属性的值就是post请求参数，直接响应给客户端
    res.send(req.body);
})
// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');




npm WARN deprecated mkdirp@0.5.1: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)



我有以下设置:

// enums.ts
export enum DocumentType {
  Email = 0,
  Unknown = 1
}
Run Code Online (Sandbox Code Playgroud)
-

// remote.ts
/// <reference path="./remote.d.ts" />
import enums = require('./enums');

class Remote implements test.IRemote {
  public docType: enums.DocumentType;

  constructor() {
    this.docType = enums.DocumentType.Unknown;
  }
}

export = Remote;
Run Code Online (Sandbox Code Playgroud)
-

// remote.d.ts
import * as enums from './enums';


declare module test {
  export interface IRemote { 
    docType: enums.DocumentType;
  } 
}


------------------------------------

ES6  

  "type": "module",



-------------------------------------

    let strFileName = "./src/printTpl/orderTpl.json" ;
  let baseTpl = "";
  try {
  if(fs.existsSync( strFileName )){
    baseTpl = JsonUtil.readJsonSync(strFileName);
    // Debug.log("baseTpl: \n", baseTpl);
    // console.log("tpl: ", baseTpl.tpl);
  }else{
    console.log("this is not exist!AAA");

  }
  
} catch (error) {
  console.log("this is not exist!BBB");

}



ES6，Typescripts，如何正确import express？
https://blog.csdn.net/henryhu712/article/details/110194404


linux运行nodejs一般路径_linux服务器安装node环境及项目部署
https://blog.csdn.net/weixin_39867594/article/details/110088109




https://byby.dev/js-object-with-null-prototype

const obj = {};

console.log(obj.toString); // [Function: toString]
console.log(obj.hasOwnProperty); // [Function: hasOwnProperty]
console.log(obj.valueOf); // [Function: valueOf]
console.log(obj.constructor); // [Function: Object]
console.log(obj.__proto__); // [Object: null prototype] {}


const obj = Object.create(null);

console.log(obj.toString); // undefined
console.log(obj.hasOwnProperty); // undefined
console.log(obj.valueOf); // undefined
console.log(obj.constructor); // undefined
console.log(obj.__proto__); // undefined



const obj = Object.create(null);
obj.name = "Alice"; // add a property
obj.greet = function() { // add a method
  console.log("Hello, I'm " + this.name);
};

obj.greet(); // Hello, I'm Alice

console.log(obj);
// [Object: null prototype] {
//   name: 'Alice',
//   greet: [Function (anonymous)]
// }


const obj = Object.create(null);
obj.name = "Alice"; // add a property
obj.greet = function() { // add a method
  console.log("Hello, I'm " + this.name);
};

const copy = Object.assign({}, obj); // copy the object

console.log(Object.getPrototypeOf(copy)); 
//=> [Object: null prototype] {}

copy.greet(); 
//=> Hello, I'm Alice



--------ccc----------
{
  orderShopItemList: [
    {
      distributorDto: [Object],
      order: [Object],
      salesResultDtoList: [Array]
    },
    {
      distributorDto: [Object],
      order: [Object],
      salesResultDtoList: [Array]
    }
  ]
}
[ 'orderShopItemList' ]
----------222----------