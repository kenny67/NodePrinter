"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintAdaptorService = exports.PrinterDto = void 0;
var dotenv = require("dotenv");
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
var PrintSDK = require('printer-open-api');
dotenv.config();
var PrinterDto = /** @class */ (function () {
    function PrinterDto() {
        this.sn = '';
        this.model = '';
    }
    return PrinterDto;
}());
exports.PrinterDto = PrinterDto;
// 
//default
var PrintAdaptorService = /** @class */ (function () {
    function PrintAdaptorService() {
        this.userName = '';
        this.userKey = '';
        this.getInstance();
    }
    PrintAdaptorService.prototype.getInstance = function () {
        if (!this.client) {
            this.userName = process.env.PRINTER_CLIENT_ID || 'userName';
            this.userKey = process.env.PRINTER_CLIENT_SECRET || 'userKey';
            this.client = new PrintSDK.Client(new PrintSDK.User(this.userName, this.userKey));
        }
        return this.client;
    };
    PrintAdaptorService.prototype.basePrint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var printerBindResult, printTaskID, printTaskState, printerStatus, unbindPrintersResult, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.getInstance().bindPrinters({ bindPrinterParams: [{ sn: 'printerSN1', model: 'GP-SH584' }, { sn: 'printerSN2', model: 'LH586', alias: 'test1' }] })];
                    case 1:
                        printerBindResult = _a.sent();
                        console.log('bind result:', printerBindResult);
                        return [4 /*yield*/, this.getInstance().print({ sn: 'printerSN1', content: 'test print content', times: 2 })];
                    case 2:
                        printTaskID = _a.sent();
                        console.log(printTaskID);
                        return [4 /*yield*/, this.getInstance().queryTaskPrintState(printTaskID)];
                    case 3:
                        printTaskState = _a.sent();
                        console.log('query print task result: ', printTaskState);
                        return [4 /*yield*/, this.getInstance().queryPrinterStatus('printerSN1')];
                    case 4:
                        printerStatus = _a.sent();
                        console.log('query printer status result: ', printerStatus);
                        return [4 /*yield*/, this.getInstance().unbindPrinters({ snList: ['printerSN1', 'printerSN2'] })];
                    case 5:
                        unbindPrintersResult = _a.sent();
                        console.log('unbind printers result: ', unbindPrintersResult);
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        console.error('error: ', err_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // printerList
    //[{ sn: 'printerSN1', model: 'GP-SH584' }, 
    // { sn: 'printerSN2', model: 'LH586', alias: 'test1' }]
    //content
    PrintAdaptorService.prototype.print = function (printerList, content) {
        return __awaiter(this, void 0, void 0, function () {
            var snList, printerBindResult, unbindPrintersResult, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        snList = [];
                        printerList.forEach(function (element) {
                            snList.push(element.sn);
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getInstance().bindPrinters({ bindPrinterParams: printerList })];
                    case 2:
                        printerBindResult = _a.sent();
                        console.log('bind result:', printerBindResult);
                        printerList.forEach(function (element) {
                            var printTaskID = _this.getInstance().print({ sn: element.sn, content: content, times: 2 });
                            //await
                            console.log(printTaskID);
                            var printTaskState = _this.getInstance().queryTaskPrintState(printTaskID);
                            console.log('query print task result: ', printTaskState);
                            var printerStatus = _this.getInstance().queryPrinterStatus('printerSN1');
                            console.log('query printer status result: ', printerStatus);
                        });
                        return [4 /*yield*/, this.getInstance().unbindPrinters({ snList: snList })];
                    case 3:
                        unbindPrintersResult = _a.sent();
                        console.log('unbind printers result: ', unbindPrintersResult);
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        console.error('error: ', err_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PrintAdaptorService.prototype.getContentWithObject = function (contentTpl, object) {
        var content = "";
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
        var tpl = contentTpl;
        for (var _i = 0, _a = Object.keys(object); _i < _a.length; _i++) {
            var key = _a[_i];
            console.log("\u30AD\u30FC\u306F".concat(key, "\u3001\u5024\u306F").concat(object[key]));
            // contentTpl = contentTpl.replace('\${' + key + '}', object?[key]?.toString());
            var rep = '{' + key + '}';
            console.log('!!key!!', rep);
            tpl = tpl.replace(rep, object[key]);
        }
        content = tpl;
        return content;
    };
    PrintAdaptorService.prototype.getTpl = function () {
        var contentTpl = "<AUDIO-CANCEL><B><BOLD>顾客联{title}          </BOLD></B>\
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
    };
    return PrintAdaptorService;
}());
exports.PrintAdaptorService = PrintAdaptorService;
module.exports = { PrintAdaptorService: PrintAdaptorService, PrinterDto: PrinterDto };
