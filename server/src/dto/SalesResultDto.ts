
export interface ISalesResultDto{
  distributor_id?: string; 
  product_id: string;
  product_name: string;
  member_id ?: string;
  order_id ?: string;
  general_price?: number; 
  price: number; //product_price
  buy_num: number; //product number
  payment_sub_total: number; // current price sum 
  tax_amount?: number; // tax amount 单品税额  
  tax_percent?: number; // 单品税率 8%  10%
  payment_shipping_fee?: number;
  //product_total?: number;
  payment_amount?: number;
  payment_discount?: number;
  email?: string; //member email
  coupons?: string;
}


export default class SalesResultDto implements ISalesResultDto{
  distributor_id?: string = ""; 
  product_id: string = "";
  product_name: string = "";
  member_id ?: string = "";
  order_id ?: string = "";
  general_price ?: number; 
  price: number; //product_price
  buy_num: number; //product number
  payment_sub_total: number; // current price sum 
  tax_amount?: number; // tax amount 单品税额  
  tax_percent?: number; // 单品税率 8%  10%
  payment_shipping_fee?: number;
  //product_total?: number;
  payment_amount?: number;
  payment_discount?: number;
  email?: string = ""; //member email
  coupons?: string = "";
   
  constructor(salesResult: ISalesResultDto){

    this.distributor_id = salesResult?.distributor_id; 
    this.product_id = salesResult?.product_id; 
    this.product_name = salesResult?.product_name; 
    this.member_id = salesResult?.member_id; 
    this.general_price = salesResult?.general_price; 
    this.price = salesResult?.price; 
    this.buy_num = salesResult?.buy_num; 
    this.payment_sub_total = salesResult?.payment_sub_total; 
    this.tax_amount = salesResult?.tax_amount; 
    this.tax_percent = salesResult?.tax_percent; 
    this.payment_amount = salesResult?.payment_amount; 
    this.payment_discount = salesResult?.payment_discount; 
    this.email = salesResult?.email; 
    this.coupons = salesResult?.coupons; 

  }

  create(salesResult: ISalesResultDto){

    this.distributor_id = salesResult?.distributor_id; 
    this.product_id = salesResult?.product_id; 
    this.product_name = salesResult?.product_name; 
    this.member_id = salesResult?.member_id; 
    this.general_price = salesResult?.general_price; 
    this.price = salesResult?.price; 
    this.buy_num = salesResult?.buy_num; 
    this.payment_sub_total = salesResult?.payment_sub_total; 
    this.tax_amount = salesResult?.tax_amount; 
    this.tax_percent = salesResult?.tax_percent; 
    this.payment_amount = salesResult?.payment_amount; 
    this.payment_discount = salesResult?.payment_discount; 
    this.email = salesResult?.email; 
    this.coupons = salesResult?.coupons; 

  }

}

module.exports = {SalesResultDto};

