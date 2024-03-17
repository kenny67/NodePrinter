import { DistributorDto } from './DistributorDto';
import SalesResultDto from './SalesResultDto';
import { OneShopOrderDto } from './OneShopOrderDto';

// export interface IOrderDto{

//   oneShopOrderDto: object;
//   distributorDto: object; 
//   salesResultDtoList: SalesResultDto[]; //sales_results
// }


//export class OrderDto implements IOrderDto{

export class OrderDto{



  oneShopOrderDto: OneShopOrderDto = new OneShopOrderDto({
    title: "",
    order_id: "",
    order_time: "",
  
    p_order_id:  "",
    shop_id:  "", // distributor
    member_id:  "",
    payment_amount : 0,
    payment_sub_total:  "", // taxed_off_total
    payment_shipping_fee:  "",
    tax_amount:  "",
    point_amount:  "",
    shop_discount:  "",
    discount:  "",
    order_status:  "",
    delivery_status:  "",
    receiver_first_name:  "",
    receiver_last_name:  "",
    receiver_phone:  "",
    post_code_front:  "",
    post_code_back:  "",
    receiver_country:  "",
    receiver_province:  "",
    receiver_city:  "",
    receiver_address:  "",
    customer_delivery_address_id:  "",
    card_seq:  "",
    credit_settlement_number:  "",
    receipt_flag:  "",
    request_flag:  "",
    offer_flag:  "",
  }); 

  distributorDto: DistributorDto =  new DistributorDto({
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
  }); // 店铺信息
  
  salesResultDtoList: SalesResultDto[] = []; //sales_results 订单明细列表

  
  // = new DistributorDto()

  constructor(data: Partial<OrderDto >) {
    Object.assign(this, data);
  }




}



module.exports = {OrderDto};