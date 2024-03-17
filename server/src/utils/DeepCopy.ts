export default class DeepCopy{

  constructor(){}

  // 浅COPY 浅拷贝
  cloneShallow(source: any){
    let target:any = {};
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
        }
    }
    return target;
  }


  //定义检测数据类型的功能函数
  isObject(obj: any) {
        return typeof obj === 'object' && obj != null;
  }
  
  //深COPY 深拷贝
  cloneDeep(source: any) {
  
      if (!this.isObject(source)) return source; // 非对象返回自身
        
      let target:any = Array.isArray(source) ? [] : {};
      for(var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
              if (this.isObject(source[key])) {
                  target[key] = this.cloneDeep(source[key]); // 注意这里
              } else {
                  target[key] = source[key];
              }
          }
      }
      return target;
  }

    //深COPY 深拷贝
  cloneFromTo(source: any, target: any) {
  
      if (!this.isObject(source)) return source; // 非对象返回自身
        
      //let target:any = Array.isArray(source) ? [] : {};
      for(var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key) &&Object.prototype.hasOwnProperty.call(target, key)) {
              if (this.isObject(source[key])) {
                  target[key] = this.cloneDeep(source[key]); // 注意这里
              } else {
                  target[key] = source[key];
              }
          }
      }
      return target;
  }
  
}

module.exports = DeepCopy;