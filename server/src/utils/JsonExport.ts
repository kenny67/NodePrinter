
// https://typescriptbook.jp/reference/builtin-api/map

import fs from 'fs';
import path from 'path';

import { createRequire } from "module";

// create a JSON object
// const user: Map<string, any>
// const user: Map<string, any> = {
//     id: '1',
//     name: "John Doe",
//     age: '22'
// };

// const user = new Map<string, any>();
// user.set('id',1);
// user.set('name',"John Doe");
// user.set('age', 22);


// const replacer = (k: string, v: any) => {
//   if(v instanceof Map){
//     return {
//       dataType: 'Map',
//       value: [...v]
//     };
//   }
// };

export default class JsonExport{

  // write JSON string to a file
  static writeMapToJson(strFileName: string, data: Map<string, any>) {
    
    let obj = Object.fromEntries(data);

    fs.writeFile(strFileName, JSON.stringify(obj), function(err: any) {
        if (err) throw err;
        console.log('complete');
        }
    );
  }


  
  // static getOrderTpl( order_id: string  , order_time: string, ): string{
  static getOrderTpl(): string{
    //<BR><C><B>期望：立即送达</B></C>\
    //<L>备注：顾客需要餐具</L>\
    //    <BR>--------------------------------<BR>\
    // <AUDIO-CANCEL><B><BOLD>顾客联          </BOLD></B>\
    // <BR>--------------------------------<BR>\
    // <C><B>${_name} </B></C><BR>\
    // <C>*  ${shop_msg}  *</C>\

    let contentTpl = "<BR>--------------------------------<BR>\
    订单编号：${order_id} <BR>\
    订单时间：${order_time} <BR>\
    ${orderDetails} <BR>";
 
    // contentTpl = contentTpl.replace("${order_id}", order_id);
    // contentTpl = contentTpl.replace("${order_time}", order_time);
    // contentTpl = contentTpl.replace("${shop_phone1}", order_time);
    // contentTpl = contentTpl.replace("${shop_phone2}", order_id);

    return contentTpl;
  }


  // ${product_name}和其他发展中国家加强团结合作，共同维护联合国宪章宗旨和原则， ${price}讲好中委友好故事。

  // static getOrderDetailsTpl( product_name: string , product_num: string ,product_price: string , product_total: string  ): string{
  static getOrderDetailsTpl(): string{

    let contentTpl = "--------------------------------<BR>\
    <L>${product_name}   ${product_price}   ${product_num}   </L><BR>\
    <L>单品总价：${product_total}</L><BR>\
    --------------------------------<BR>\
    <C><BC128_A>111111</BC128_A></C>\
    <BR><L>************* #9 完 ************</L>";
    // contentTpl = contentTpl.replace("${product_name}", product_name);
    // contentTpl = contentTpl.replace("${product_num}", product_num);
    // contentTpl = contentTpl.replace("${product_price}", product_price);
    // contentTpl = contentTpl.replace("${product_total}", product_total);
    
    return contentTpl;
  }


}



// const tpl = "../printTpl/";
const tplPath = "./src/printTpl/";
const tpl = path.join(process.env.PWD || process.cwd(), tplPath);
console.log(tpl);


const printOrderTplFileName = tpl + "orderTpl.json";
console.log("printOrderTplFileName: ", printOrderTplFileName);

let printTplMap = new  Map<string, any>();
printTplMap.set('tpl', JsonExport.getOrderTpl());
// printTplMap.set('tpl', '${title}愿同委方密切人文交流，支持在委开展汉语教学、办好孔子学院，${orderDetails}加强媒体交流，讲好中委友好故事。');

JsonExport.writeMapToJson(printOrderTplFileName, printTplMap);

const printOrderDetailsTplFileName = tpl + "orderDetailsTpl.json";
let printDetailTplMap = new  Map<string, any>();
printDetailTplMap.set('tpl', JsonExport.getOrderDetailsTpl());

// '${product_name}和其他发展中国家加强团结合作，共同维护联合国宪章宗旨和原则， ${price}讲好中委友好故事。'
// printTplMap.set('tpl', '${title}愿同委方密切人文交流，支持在委开展汉语教学、办好孔子学院，${orderDetails}加强媒体交流，讲好中委友好故事。');

JsonExport.writeMapToJson(printOrderDetailsTplFileName, printDetailTplMap);
