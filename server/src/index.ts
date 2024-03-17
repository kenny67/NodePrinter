
// import dotenv from 'dotenv';
// const bodyParser=require("body-parser");
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';

// import logger from "./utils/Logger";
const logger = require('./Debug');
// import * as Debug from './Debug';

const moment = require('moment');
// import * as session from 'express-session';

import {PrintAdaptorService}  from './PrintAdaptorService';

import { OrderDto } from './dto/OrderDto';
import { DistributorDto } from './dto/DistributorDto';



// IOrderDto, 

import { ISalesResultDto } from './dto/SalesResultDto';
import {  JsonUtil, PrintUtil } from './utils/PrintUtil';

import DeepCopy  from './utils/DeepCopy';


// import * as PrintUtil from './utils/PrintUtil';
// const PrintUtil = require('./utils/PrintUtil');

const deepCopy = new DeepCopy(); 

// import { Request, Response, Application } from 'express';
// import express from 'express';
// import * as express from 'express';

import express = require('express');
const app = express();

// const app: Application = express();
// const express = require('Express');
// const session = require('express-session')
// const request = require('request-promise')
// const app = express();

// dotenv.config();



// //TODO simple token

// const config = {
//   client: {
//     client_id: process.env.PRINTER_CLIENT_ID,
//     client_secret: process.env.PRINTER_CLIENT_SECRET,
//   },
//   auth: {
//     //tokenHost: 'https://api.oauth.com',
//     tokenHost: process.env.PRINTER_REDIRECT_URI,
//   }
// };



app.use(express.json());
// app.use(express.urlencoded({ extended: true }));  //TODO 这个地方需要验证一下 extended操作
app.use(express.urlencoded({ extended: false }));


// 解析application/json数据 deprecated
// var jsonParser = bodyParser.json(); 
// 解析application/x-www-form-urlencoded数据
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false })); //deprecated


// app.use(session({
//   secret: 'your_secret_here',
//   resave: false,
//   saveUninitialized: true
// }));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  }
);

const PORT = 5000;

app.listen(PORT, () => {
  logger.info("Start on port ${PORT} .", PORT);
});

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "User1", email: "user1@test.local" },
  { id: 2, name: "User2", email: "user2@test.local" },
  { id: 3, name: "User3", email: "user3@test.local" },
];

app.get('/login', (req: express.Request, res: express.Response) => {

  // const authEndpoint = process.env.PRINTER_REDIRECT_URI;

  // const queryParams = new URLSearchParams({
  //   response_type: 'code',
  //   client_id: process.env.PRINTER_CLIENT_ID,
  //   redirect_uri: process.env.PRINTER_CLIENT_SECRET
  // });

  // const authUrl = `${authEndpoint}?${queryParams}`;

  // res.redirect(authUrl);

})

app.get('/callback', async (req: express.Request, res: express.Response) => {

  //resource API
  const tokenEndpoint = process.env.PRINTER_TOKEN_URI;

  const { code } = req.query;

  const requestBody = {
    grant_type: 'authorization_code',
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI
  };

  const options = {
    method: 'POST',
    uri: tokenEndpoint,
    form: requestBody,
    json: true
  };

  try {

    // const response = await request(options);

    // req.session.accessToken = response.access_token;
    // req.session.refreshToken = response.refresh_token;

    res.redirect('/user');

  } catch (err) {
    res.send('Error retrieving access token')
  }
})



app.get('/user', async ( req: express.Request, res: express.Response) => {

    // const userEndpoint = 'https://oauth2-provider.com/userinfo';

    // const options = {
    //     headers: {
    //       Authorization: Bearer ${ req.session.accessToken }
    // },
    //   json: true
    // };

    // try {
    //   const response = await request.get(userEndpoint, options);
    //   res.send(response);
    // } catch (err) {
    //   res.send('Error retrieving user info');
    // }
  }
);




//一覧取得
// 他爷爷的 这个地方要POST 要记住要记住  不是GET 有时候JSON传过来的数据超长了   所以POST好点
app.post("/to_print",  (req: express.Request, res: express.Response) => {

 //TODO  1 接受HTTP请求， POST传过来订单基本信息，
 //TODO  订单基本信息 
 //TODO  订单详细信息 商品列表和价格
//  logger.debug("----------S----------");
//  logger.debug(jsonParser);
//  logger.debug(req);

 let body = req.body;

 logger.debug("----------传递过来的请求的BODY部分----------");
 logger.debug(req.body);
 logger.debug("----------START 开始解析HTTP BODY---------");

 let bodyObject = req.body;
 
//  const obj = JSON.parse(JSON.stringify(req.body));
//TODO 得到的JSON变成了解析后的KEY值 
//TODO 这地方需要改进
//  let jsonStr = Object.keys(bodyObject)[0];
// const objOrderDto = JSON.parse(jsonStr);  // 这里 extended=false  之后， req.body就是对象，所以这时候JSON.parse 就是错误了。
logger.debug("----------得到的DTO对象----------");
/*
* 这地方 得到解析后的对象 OrderDTO 
*/
const objOrderDto = bodyObject;
// const objOrderDto = JSON.parse(jsonStr); 
logger.debug(objOrderDto);
logger.debug(Object.keys(objOrderDto));

logger.debug("----------得到的DTO对象 distributorDto----------");
//  logger.debug(objOrderDto.shopsOrderList[0].distributorDto);
logger.debug("----------得到的DTO对象 order SHOP----------");
logger.debug(objOrderDto.shopsOrderList[0].order);
//orderShopItemList --> shopsOrderList
let shopsOrderList =objOrderDto.shopsOrderList;
let shopDto =objOrderDto.shopDto;

let saleOfDistributorDto: DistributorDto =  new DistributorDto({
  id : "",
  company_name : "",
  small_img_url : "",
  company_phone_number : "", 
  post_code_front : "",
  post_code_back  : "",
  prefecture : "",
  city : "",
  address1 : "",
  small_pic : "",
  print1 : "",
  print2 : "",
  print3 : "",
}); // 店铺信息);

logger.debug("----------得到的DTO 店铺对象  找出打印机---------");
saleOfDistributorDto = deepCopy.cloneFromTo(shopDto, saleOfDistributorDto);
logger.debug(saleOfDistributorDto.id);
logger.debug(saleOfDistributorDto.company_name);
logger.debug(saleOfDistributorDto.print1);
logger.debug(saleOfDistributorDto.print2);


const printerList =
[{ sn: 'printerSN1', model: 'GP-SH584' }, 
 { sn: 'printerSN2', model: 'LH586', alias: 'test1' }];

 logger.debug(printerList.toString());
 logger.debug("----------得到的DTO 店铺对象  找出打印TEST---------");
 logger.debug(JSON.stringify(printerList));

logger.debug("----------得到的DTO 店铺对象  打印机对象列表---------");
let printerObjList = [];
if(saleOfDistributorDto.print1){
  printerObjList = JSON.parse(saleOfDistributorDto.print1);
}
//TODO 这里解析得到的打印机对象列表 传给后面的打印机服务
logger.debug(printerObjList[0].sn);


logger.debug("----------得到的DTO对象转成打印接口的对象----------");
 //https://byby.dev/js-object-with-null-prototype
//  const copy = Object.assign({}, orderShopItemList); // copy the objec
//  logger.debug(copy);

let orderDtoList = [];

// let saleResultDtoList = []; //TODO 注释掉  这里是树结构  不是LIST结构 
for(let i in  shopsOrderList){

  let oneShopOrder =  shopsOrderList[i];
  // PHP中对应 OneShopOrderDto 对象
  let orderDto: OrderDto = new OrderDto(oneShopOrder);

  // logger.log("orderDto Object in LIST:" , orderDto);
  // // orderDto.create(orderItem);
  // orderDto = deepCopy.cloneFromTo(orderShop, orderDto);

  // logger.log("i:" , i);
  // // logger.log("orderShop item:" , orderShop);
  // logger.log("orderDto item:" , orderDto);

  //TODO 把订单中 单店铺订单  转成orderDto对象
  //TODO 这里需要对orderShop进行值拷贝 初始化函数  

  // 店铺信息内容
  // logger.debug(objOrderDto.orderShopItemList[0].distributorDto);
     
  let shopInfo = oneShopOrder.distributorDto;  
  logger.debug("---------clone from ----distributorDto:");
  // logger.debug(shopInfo);

//   let resultArray = Object.keys(shopInfo).map(function(keyName){
//     let person = shopInfo[keyName];
//     // do something with person
//     return person;
// });
  
let distributorDto: DistributorDto =  new DistributorDto({
  id : "",
  company_name : "",
  small_img_url : "",
  company_phone_number : "", 
  post_code_front : "",
  post_code_back  : "",
  prefecture : "",
  city : "",
  address1 : "",
  small_pic : "",
}); // 店铺信息);


  distributorDto = deepCopy.cloneFromTo(shopInfo, distributorDto);


  logger.debug("---------clone  to----distributorDto:");
  logger.debug(distributorDto);

  
  orderDto.distributorDto = distributorDto;
  // orderDto.shop_id = shopInfo.id;
  // orderDto.company_name = shopInfo.company_name;
  // orderDto.company_phone_number = shopInfo.company_phone_number;
  // orderDto.post_code_front = shopInfo.post_code_front;
  // orderDto.post_code_back = shopInfo.post_code_back;
  // orderDto.prefecture = shopInfo.prefecture;
  // orderDto.city = shopInfo.city;
  // orderDto.address1 = shopInfo.address1;
  // orderDto.shop_id = shopInfo.id;
  

  //TODO
  let salesResultDtoList = [];
  for(let j in  oneShopOrder.salesResultDtoList){

    let saleResultDto  =  oneShopOrder.salesResultDtoList[j];
    logger.log("sales result item key j:" , j);
    logger.log("item:" , saleResultDto);
    salesResultDtoList.push(saleResultDto); 
  }
  orderDto.salesResultDtoList = salesResultDtoList;
  
  orderDtoList.push(orderDto);

}


  logger.debug("----------Get the Object by Parse Json----------");
 
 logger.debug(shopsOrderList[0].distributorDto.id);
 logger.debug(shopsOrderList[0].distributorDto.company_name);
//  logger.debug("----------G1----------");

//  logger.debug(orderShopItemList[0].order); //StdClass  //TODO order订单信息转成 简单类

 logger.debug("----------G2----------");
 logger.debug(shopsOrderList[0].salesResultDtoList[0].order_id); 
 logger.debug(shopsOrderList[0].salesResultDtoList[0].product_id); 
 logger.debug(shopsOrderList[0].salesResultDtoList[0].product_name);
 logger.debug(shopsOrderList[0].salesResultDtoList[0].price);
 logger.debug(shopsOrderList[0].salesResultDtoList[0].buy_num);

 logger.debug("----------444----------");
//  logger.debug(orderShopItemList);
 //               JsonObject  
 // 订单的总订单额度  |--orderItem
// 订单的总订单额度   |--orderShopItemList



  // Debug.log(fs);
  // res.send(req.body);




   

  // let saleResultDtoList : SaleResultDto[] = [
  //   {
  //     product_id: 'id1',
  //     product_name: 'ProductName1',
  //     buy_num: 1,
  //     price: 50,
  //     payment_sub_total: 50
  //   },
  //   {
  //     product_id: 'id2',
  //     product_name: 'ProductName2',
  //     buy_num: 5 ,
  //     price: 80,
  //     payment_sub_total: 400
  //   }
  // ];
  
      // contentTpl = contentTpl.replace("${order_id}", order_id);
      // contentTpl = contentTpl.replace("${order_time}", order_time);
 
  let strDate = moment().format('YYYY-MM-DD hh:mm:ss');
  let printContent = "";

  for(let iter in  orderDtoList){

    let shopItem = orderDtoList[iter];



    //orderDtoList[0]  shopItem
    let order : OrderDto = 
    {
      // title: 'Order Info',
      // order_id: '1300519180498786864',
      // order_time: strDate,
      // payment_amount: 350.00,
      oneShopOrderDto: shopItem.oneShopOrderDto,
      distributorDto: shopItem.distributorDto,
      salesResultDtoList: shopItem.salesResultDtoList,
     
    }

    //TODO 先用假数据测试一下  一个店铺的订单
    //TODO 需要修改PrintUtil 让支持多个店铺汇总订单

     let printContentTmp = PrintUtil.getFullTpl(order);
     printContent += printContentTmp;

  }


  const printer = new PrintAdaptorService();
  //TODO 从distributor表中 获取打印机的字段  按逗号切分开， PUSH放进数组中
 //TODO  这里填写打印机编号SN和型号 
//TODO 这里接收到打印机对象列表 传给 服务器打印机服务
  // printer.print(printerList, printContent);
  // res.send('Error retrieving access token')
  // res.send(JSON.stringify(resultTpl2));

  let re = /<BR>/gi;
  let content =  printContent.replace(re, '\r\n');
  logger.debug("\n---------PRINT INFO---------\n", content);
  // logger.debug("\n---------PRINT INFO---------\n", printContent.replace('<BR>', '\n'));

  res.send(printContent);





});


//一覧取得


//一覧取得
app.get("/users", (req: express.Request, res: express.Response) => {

  res.send(JSON.stringify(users));
});



// module.exports = {PrintAdaptorService, PrinterDto};