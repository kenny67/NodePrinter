
import * as dotenv from 'dotenv';
// import  dotenv from 'dotenv';

// import * as sdk from 'printer-open-api';
// import * as sdk from 'printer-open-api';
import { PrintParam } from 'printer-open-api/dist/business_types';

// /usr/local/lib/node_modules/printer-open-api/src

// import {apiError, ApiErrorCode, BindPrintersParam,
//    BindPrintersResult, FailedPrinterBindResult, 
//    FailedPrinterUnbindResult, 
//   PrinterBindResult, PrintParam, 
//   QueryTasksResult, Task, 
//   UnbindPrinterResult, UnbindPrintersParam} from 'printer-open-api/dist/business_types';

  // import {PrintParam} from 'printer-open-api';

  // './business_types';

// import axios, { AxiosError } from 'axios';
// import {BASE_URL, PATH_PREFIX} from './config';
// import {User} from './users';
// import {apiError, ApiErrorCode, BindPrintersParam, BindPrintersResult, FailedPrinterBindResult, FailedPrinterUnbindResult, PrinterBindResult, PrintParam, QueryTasksResult, Task, UnbindPrinterResult, UnbindPrintersParam} from './business_types';
// import {ApiName, BaseRequest, BindPrinterResponse, BindPrintersRequest, ClearPendingTasksRequest, ClearPendingTasksResponse, Printer, PrinterStatus, PrinterStatusRequest, PrinterStatusResponse, PrintRequest, PrintResponse, QueryPrintersRequest, QueryPrintersResponse, QueryTasksRequest, QueryTasksResponse, RawTask, Response, RetCode, TaskPrintState, TaskStatusRequest, TaskStatusResponse, UnbindPrintersRequest, UnbindPrintersResponse} from './types';

const PrintSDK =  require('printer-open-api');


dotenv.config();

export class PrinterDto {
  sn: string = '';
  model: string = '';
}

// 

//default

export class PrintAdaptorService {

  client: any;
  userName: string = '';
  userKey: string = '';

  constructor() {
    this.getInstance();
  }

  getInstance() {
    if (!this.client) {

      this.userName = process.env.PRINTER_CLIENT_ID || 'userName';
      this.userKey = process.env.PRINTER_CLIENT_SECRET || 'userKey';
      this.client = new PrintSDK.Client(new PrintSDK.User(this.userName, this.userKey));
    }
    return this.client;
  }

  async basePrint(): Promise<any> {
    try {
      const printerBindResult = await this.getInstance().bindPrinters({ bindPrinterParams: [{ sn: 'printerSN1', model: 'GP-SH584' }, { sn: 'printerSN2', model: 'LH586', alias: 'test1' }] });
      console.log('bind result:', printerBindResult);
      const printTaskID = await this.getInstance().print({ sn: 'printerSN1', content: 'test print content', times: 2 } as PrintParam);
      console.log(printTaskID);
      const printTaskState = await this.getInstance().queryTaskPrintState(printTaskID);
      console.log('query print task result: ', printTaskState);
      const printerStatus = await this.getInstance().queryPrinterStatus('printerSN1');
      console.log('query printer status result: ', printerStatus);
      const unbindPrintersResult = await this.getInstance().unbindPrinters({ snList: ['printerSN1', 'printerSN2'] });
      console.log('unbind printers result: ', unbindPrintersResult);
    } catch (err) {
      console.error('error: ', err);
    }
  }

  // printerList
  //[{ sn: 'printerSN1', model: 'GP-SH584' }, 
  // { sn: 'printerSN2', model: 'LH586', alias: 'test1' }]

  //content
  async print(printerList: PrinterDto[], content: string): Promise<any> {

    let snList: string[] = [];
    printerList.forEach(element => {
       snList.push(element.sn);
    });

    try {

      const printerBindResult = await this.getInstance().bindPrinters({ bindPrinterParams: printerList });
      console.log('bind result:', printerBindResult);
      printerList.forEach(element => {
        let printTaskID =  this.getInstance().print({ sn: element.sn, content: content, times: 2 } as PrintParam);
        //await
        console.log(printTaskID);
        let printTaskState =  this.getInstance().queryTaskPrintState(printTaskID);
        console.log('query print task result: ', printTaskState);
        let printerStatus =  this.getInstance().queryPrinterStatus('printerSN1');
        console.log('query printer status result: ', printerStatus);
      });
      const unbindPrintersResult = await this.getInstance().unbindPrinters({ snList: snList });
      console.log('unbind printers result: ', unbindPrintersResult);
    } catch (err) {
      console.error('error: ', err);
    }
  }

  getContentWithObject(contentTpl: string, object: any): string{

    let content: string ="";

//     /*-- 型を指定 --*/
// interface Vegetables {
//   パプリカ: string;
//   小松菜: string;
//   なすび: string;
//   トマト: string;
// }
// /*-- オブジェクト --*/
// const vegetable: Vegetables = {
//   パプリカ: '赤',
//   小松菜: '緑',
//   なすび: '紫',
//   トマト: '赤',
// };

// //interfaceのVegetablesに[key]に型指定がないため、エラーになる！
// for (const key of Object.keys(vegetable)) {
//    console.log(`キーは${key}、値は${vegetable[key]}`);
//  }

    let tpl = contentTpl;
    for (const key of Object.keys(object)) {
      console.log(`キーは${key}、値は${object[key]}`);
      // contentTpl = contentTpl.replace('\${' + key + '}', object?[key]?.toString());
      let rep = '{' + key + '}';
      console.log('!!key!!',rep);
      tpl = tpl.replace(rep, object[key]);
    }
    content = tpl;
    return content;

  }

  getTpl(): string{

    let contentTpl = "<AUDIO-CANCEL><B><BOLD>顾客联{title}          </BOLD></B>\
    <BR>--------------------------------<BR>\
    <C><B>#9【美团】</B></C><BR><C>*老长沙馄饨（粥·炒饭·水饺·岳</C><BR><C>麓店）*</C>\
    <BR><C><B>期望：立即送达</B></C>\
    <BR>--------------------------------<BR>\
    <L>备注：顾客需要餐具</L>\
    <BR>--------------------------------<BR>\
    下单时间：2023-04-26 13:08:54<BR>\
    订单编号：1300519180498786864\
    <BR>------------- 商品 -------------<BR>\
    <L>收藏加购↗五香茶叶蛋一枚 X1  3.9</L>\
    <BR><L>骨汤猪肉玉米汤饺（12个）(加辣,加</L>\
    <BR><L>葱)                      X1   16</L>\
    <BR><L>免费送！热狗肠（每单仅限一个）</L>\
    <BR><L>                         X1    0</L>\
    <BR><L>收藏加购↗手工炸油条1根  X1  2.5</L><BR>\
    ------------- 赠品 -------------<BR>\
    满10.0元赠欢愉且胜意，万事皆可期<BR>。 1份                     X1  0<BR>\
    ------------- 其他 -------------<BR>\
    打包费：                       2<BR>\
    配送费：                       4<BR>\
    ------------- 优惠 -------------<BR>\
    折扣商品                     7.5<BR>\
    满减配送费                     4<BR>\
    门店新客立减                   2<BR>\
    使用红包                       6<BR>\
    --------------------------------<BR>\
    合计：                       4份<BR>\
    原价：                      28.4<BR>\
    <L>实付： ${account}                      8.9</L><BR>\
    --------------------------------<BR>\
    <L>佳兴国际汇-3号楼 (3楼)</L><BR>\
    <L>陈(女士) (收藏) (新客)</L><BR>\
    <L>手机号码：181****1581</L><BR>\
    <L>虚拟号码：11111 转 9548</L><BR>\
    <L>备用号码：</L><BR>\
    --------------------------------<BR>\
    <C><BC128_A>111111</BC128_A></C>\
    <BR><L>************* #9 完 ************</L>";

    return contentTpl;

  }



}


module.exports = {PrintAdaptorService, PrinterDto};