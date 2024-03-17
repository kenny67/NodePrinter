import * as printfs from 'node:fs/promises';


const fs = require("fs");
import * as path from 'path';
// const path = require('path');
// import fs from 'fs';
// import path from 'path';
import { OrderDto } from '../dto/OrderDto';
import SalesResultDto from '../dto/SalesResultDto';

import { DistributorDto } from '../dto/DistributorDto';

// const Debug = require('../Debug');
const logger = require('../Debug');

const moment = require('moment');

export interface TplObject{
  tpl: string;
  printType: string;
}

// product_num: 1,
// product_price: 50,
// product_total: 50,



// order_status 订单状态控制组 



    // contentTpl = contentTpl.replace("${product_name}", product_name);
    // contentTpl = contentTpl.replace("${product_num}", product_num);
    // contentTpl = contentTpl.replace("${product_price}", product_price);
    // contentTpl = contentTpl.replace("${product_total}", product_total);






export class JsonUtil{


  static readJson(strFileName: string){

    let retTpl = "WWWWWWWW";

    try {

      let jsonString = "";
      printfs.readFile(strFileName, { encoding:"utf-8" }).then(
             file => {
              // Debug.log("\nFILE:\n", file);
              const jsonData = JSON.parse(file);
              
              // Debug.log("\n-----------------------\nTPL:", jsonData.tpl);
              retTpl = jsonData.tpl;

              return jsonData.tpl;
        }
      );

               
    } catch (error) {
      logger.error(error);

    }
    return retTpl;
  }
  static readJsonSync(strFileName: string){

    let retTpl = "WWWWWWWW";

    try {
      // read JSON object from file
      //fs.readFile
      const jsonString = fs.readFileSync(strFileName, 'utf-8');
      const jsonData = JSON.parse(jsonString);
      if(jsonData.tpl){
        retTpl = jsonData.tpl;
        logger.log("\nJSON: ", strFileName, "readJsonSync Success\n");
      }
    
    } catch (error) {
      Debug.error(error);

    }
    return retTpl;
  }

} 


export class PrintUtil{

  static tpl = './src/printTpl/';

  static getBaseTpl(strFileName: string){

    let baseTpl = "";

    try {
      // existSync
      baseTpl = JsonUtil.readJsonSync(strFileName);
      return baseTpl;
      
    } catch (error) {
      Debug.log("this is not exist! BB");
      return baseTpl;
    }

  }

  static getHeaderTpl(shop_name: string, shop_msg: string,order_time: string, order_id: string): string{

    //<BR><C><B>期望：立即送达</B></C>\
    //<L>备注：顾客需要餐具</L>\
    //    <BR>--------------------------------<BR>\

    let contentTpl = "<AUDIO-CANCEL><B><BOLD>顾客联          </BOLD></B>\
    <BR>--------------------------------<BR>\
    <C><B>#9 ${shop_name} </B></C><BR>\
    <C>*  ${shop_msg}  *</C>\
    ------------- 商品 -------------<BR>\
    ";

    // 下单时间：${order_time} <BR>\
    // 订单编号：${order_id} <BR>\
    // <BR>--------------------------------<BR>\

    contentTpl = contentTpl.replace("${shop_name}", shop_name);
    // contentTpl = contentTpl.replace("${shop_addr}", shop_addr);
    contentTpl = contentTpl.replace("${shop_msg}", shop_msg);
    // contentTpl = contentTpl.replace("${order_time}", order_time);
    // contentTpl = contentTpl.replace("${order_id}", order_id);

    return contentTpl;
  }

  static getTailTpl( shop_addr: string , shop_owner: string ,shop_phone1: string , shop_phone2: string  ): string{

    let contentTpl = "--------------------------------<BR>\
    <L>${shop_addr}</L><BR>\
    <L>${shop_owner}</L><BR>\
    <L>手机号码：${shop_phone1}</L><BR>\
    <L>备用号码：${shop_phone2}</L><BR>\
    <L>************* 完 ************</L>";
    contentTpl = contentTpl.replace("${shop_addr}", shop_addr);
    contentTpl = contentTpl.replace("${shop_owner}", shop_owner);
    contentTpl = contentTpl.replace("${shop_phone1}", shop_phone1);
    contentTpl = contentTpl.replace("${shop_phone2}", shop_phone2);
    
    return contentTpl;
  }



  static getOrderTpl(){


    const pOrderTplFile = path.join(process.env.PWD|| process.cwd() ,  this.tpl + "orderTpl.json");

    // Debug.log(pOrderTplFile);
    // const pOrderTplFile = this.tpl + "orderTpl.json";
    // Debug.log(pOrderTplFile);
 
    return this.getBaseTpl(pOrderTplFile);
  }


  static getOrderDetailsTpl(){

    const pOrderDetailsTplFile = path.join(process.env.PWD|| process.cwd() ,  this.tpl + "orderDetailsTpl.json");
    // Debug.log(pOrderDetailsTplFile);
    // const pOrderDetailsTplFile = this.tpl + "orderDetailsTpl.json";

    return this.getBaseTpl(pOrderDetailsTplFile);
  }


  static getOrderDetailsTplReplace( orderDetails: SalesResultDto[], orderDetailsTpl: string, isCut : false){

    let tmpDetails = "";


    // if(order.hasOwnProperty("orderDetails") && Array.isArray(order.orderDetails)){
      

      for(let i in  orderDetails){

        let item =  orderDetails[i];
        logger.debug("i:" , i);
        logger.debug("item:" , item);

        let detail = orderDetailsTpl.replace("${product_name}", item.product_name);
    
        // detail = detail.replace("${product_name}", order.orderDetails[i].product_name);
        if(item.general_price){
          detail = detail.replace("${general_price}", item.general_price.toString());
          // detail = detail.replace("${price}", item.price.toString()); //TODO price null 的时候报错
        }else{
          detail = detail.replace("${general_price}", "###"); //TODO 暂时为0 的价格的屏蔽掉价格内容
        }
       
        detail = detail.replace("${buy_num}", item.buy_num.toString());
        detail = detail.replace("${product_total}", item.payment_sub_total.toString()); 
        //TODO 单品总价 
        //TODO payment_sub_total 单品小计价格   不含税价格
        //TODO payment_amount    单品支付的价格 含税价  需要进一步测试
        tmpDetails = tmpDetails + detail;
      }

    return tmpDetails;

  }


  static getOrderTplReplace(order: OrderDto){
    let tmp = "";
    let tmpDetails = "";
    
    let orderTpl  = this.getOrderTpl();
    let orderDetailsTpl = this.getOrderDetailsTpl(); //GOOD

    // logger.debug("orderDetailsTpl:", orderDetailsTpl);
  
    // tmp = orderTpl.tpl.replace("${title}", order.title);
    tmp = orderTpl.replace("${order_id}", order.oneShopOrderDto.order_id);
    if(order.oneShopOrderDto.payment_amount){
      tmp = tmp.replace("${payment_amount}", order.oneShopOrderDto.payment_amount.toString());
    }    
    // tmp = tmp.replace("${shop_name}", "MY SHOP NAME");
    // tmp = tmp.replace("${order_id}", order.order_id);
    if(order.oneShopOrderDto.order_time){
      tmp = tmp.replace("${order_time}", order?.oneShopOrderDto.order_time);
    }
  
    // logger.debug("order_id:" , order.oneShopOrderDto.order_id);
    // logger.debug("order_tpl:" , tmp);
  
    if(order.hasOwnProperty("salesResultDtoList") && Array.isArray(order.salesResultDtoList)){

      let isCut : boolean = false;
      tmpDetails = this.getOrderDetailsTplReplace(order.salesResultDtoList, orderDetailsTpl, isCut);
      logger.log("tmpDetails:", tmpDetails);
      tmp = tmp.replace("${orderDetails}", tmpDetails);

    }else{
      logger.debug("this is not ARRAY!");
    }
    return tmp;
  }

  public static getFullTpl(order: OrderDto): string{

    // "XX店";
    let shop_name = "某某##店";
    if(order.distributorDto.company_name){
       shop_name = order.distributorDto.company_name;
    }
 
    let shop_msg = "促销";
    let order_time = Date();
    let order_id = order.oneShopOrderDto.order_id;// "XXX123456XXXX";

    let shop_addr =  "XX市XX区XXXXX";
    if(order.distributorDto.prefecture){
      shop_addr = order.distributorDto.prefecture + order.distributorDto.city +  order.distributorDto.address1 ;
    }
 
    let owner = "店长";
    if(order.distributorDto.company_name){
      owner = order.distributorDto.company_name;
    } 
    let shop_phone1 = "090-3506-1888";
    if(order.distributorDto.company_phone_number){
      shop_phone1 = order.distributorDto.company_phone_number;
    } 

    let shop_phone2 = "XXX-XXXX-XXXX";
    
    let header = this.getHeaderTpl( shop_name , shop_msg ,order_time , order_id );
    let tailer = this.getTailTpl(shop_addr, owner, shop_phone1, shop_phone2);

    let order_info = this.getOrderTplReplace(order);


    let contentTpl = "--------------------------------<BR>\
    <L>${header}</L><BR>\
    <L>${order_info}</L><BR>\
    <L>${tailer}</L><BR>";
    
    contentTpl = contentTpl.replace("${header}", header);
    contentTpl = contentTpl.replace("${order_info}", order_info);
    contentTpl = contentTpl.replace("${tailer}", tailer);
    
    return contentTpl;
  } 

}
// Debug.log("orderDetails is Array type: ",Array.isArray(orderDetails));

// let resultTpl = PrintUtil.getOrderTplReplace(order);
// Debug.log(resultTpl, "the result");


// let orderDetails : OrderDetails[] = [
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
//     payment_sub_total: 50
//   }
// ];


// let order : Order = 
//   {
//     // title: 'Order Info',
//     order_id: 'Order ID',
//     order_time: 'Order Info',
//     orderDetails: orderDetails
//   }

// let resultTpl = PrintUtil.getFullTpl(order);
// Debug.log(resultTpl, "the result");

// const dist = path.join(process.env.PWD|| process.cwd() ,  printOrderDetailsTplFN);

// // import jsonFile from dist;
// // Debug.log("title:", jsonFile.title);  
// // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
// const require = createRequire(import.meta.url);
// const jsonOrderTpl = require(dist);
// Debug.log("TPL:", jsonOrderTpl.tpl);  


module.exports = {JsonUtil, PrintUtil};
 
// module.exports = PrintUtil;