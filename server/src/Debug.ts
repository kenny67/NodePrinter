class Debug{

   static DEBUG_FLAG = true;

   static log(...info: any[]){
    if(this.DEBUG_FLAG){
      console.log(...info);
    }  
   }

   static info(...info: any[]){
    if(this.DEBUG_FLAG){
      console.log(...info);
    }  
   }
   static debug(...info: any[]){
    if(this.DEBUG_FLAG){
      console.log(...info);
    }  
   }
   

   static error(...info: any[]){
    if(this.DEBUG_FLAG){
      console.error(...info);
    }  
   }


}

module.exports = Debug;
