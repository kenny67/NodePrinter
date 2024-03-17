import { DistributorDto } from './DistributorDto';
import SalesResultDto from './SalesResultDto';




//export class OrderDto implements IOrderDto{

export class OneShopOrderDto{
  title?: string = "";
  order_id:string = "";
  order_time?: string = "";

  p_order_id?:string = "";
  shop_id?:string = ""; // distributor
  member_id?:string = "";
  payment_amount ?:number = 0;
  payment_sub_total?:string = ""; // taxed_off_total
  payment_shipping_fee?:string = "";
  tax_amount?:string = "";
  point_amount?:string = "";
  shop_discount?:string = "";
  discount?:string = "";
  order_status?:string = "";
  delivery_status?:string = "";
  receiver_first_name?:string = "";
  receiver_last_name?:string = "";
  receiver_phone?:string = "";
  post_code_front?:string = "";
  post_code_back?:string = "";
  receiver_country?:string = "";
  receiver_province?:string = "";
  receiver_city?:string = "";
  receiver_address?:string = "";
  customer_delivery_address_id?:string = "";
  card_seq?:string = "";
  credit_settlement_number?:string = "";
  receipt_flag?:string = "";
  request_flag?:string = "";
  offer_flag?:string = "";
  
  // saleResultDtoList: SalesResultDto[] = []; //sales_results 订单明细列表
  // distributorDto: DistributorDto =  new DistributorDto({
  //   id : "",
  //   company_name : "",
  //   small_img_url : "",
  //   company_phone_number : "", 
  //   post_code_front : "",
  //   post_code_back  : "",
  //   prefecture : "",
  //   city : "",
  //   address1 : "",
  //   small_pic : "",
  // }); // 店铺信息
  
  // = new DistributorDto()

  constructor(data: Partial<OneShopOrderDto >) {
    Object.assign(this, data);
  }



}



module.exports = {OneShopOrderDto};