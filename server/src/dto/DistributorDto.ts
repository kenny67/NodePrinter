


//export class OrderDto implements IOrderDto{

export class DistributorDto{


  id:string = "";
  company_name?: string = "";
  small_img_url?:string = "";
  company_phone_number?:string = "";// 
  post_code_front?:string = "";
  post_code_back ?:string = "";
  prefecture?:string = "";
  city?:string = "";
  address1?:string = "";
  small_pic?:string = "";
  print1 ?:string = "";
  print2 ?:string = "";
  print3 ?:string = "";
  
  constructor(data: Partial<DistributorDto>) {
    Object.assign(this, data);
  }



}



module.exports = {DistributorDto};