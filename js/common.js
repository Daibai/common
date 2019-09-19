/**
 * js常用方法
 * @author https://github.com/Daibai
 */


 /**
  * 获取格式化的日期
  * @param {objct|number|string} date - 日期对象|时间戳|'2019-1-1'
  * @param {object} option - 配置对象
  * @param {boolean} option.hasTime - 是否需要时间(12:00:00) default：true
  * @param {string} option.joinSymbol - 日期的连接符号 default："-"
  * @return {string} - 返回格式化的日期【"2019-01-12 16:00:00"】
  */
export function formateDate(date,{hasTime=true,joinSymbol='-'}={hasTime:true,joinSymbol:'-'}){
    if(!date) date = new Date();
    else if(typeof date === 'number' || typeof date === 'string') date = new Date(date);
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    let res = [year,month,day].map(item=>formateNumnber(item)).join(joinSymbol);
    if(hasTime){
        let hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        return res + ' ' + [hours,minutes,seconds].map(item=>formateNumnber(item)).join(':');
    }else{
        return res;
    }
    function formateNumnber(n){
        n = n.toString();
        return n[1]? n : '0' + n;
    }
}



export function copy(srcData){
    let getType = data => {
        return Object.prototype.toString.call(data).slice(8, -1);
    }
    function inner(src, target) {
        if(!target){
            if(getType(src) === 'Object')  target = {};
            else target = [];
        }
        for (let key in src) {
            if(getType(src[key]) === 'Object'){
                target[key] = {};
                inner(src[key], target[key]);

            }else if(getType(src[key]) === 'Array'){
                target[key] = [];
                inner(src[key], target[key]);
            }else{
                target[key] = src[key];
            }
        }
        return target;
    }

    return inner(srcData);

}



/**
 * 千位分隔符
 * @params {number|string} n 原始的数字
 */
export function toThousands(n=''){
    if(typeof n != 'string') n = n.toString();
    return n.replace(/(\d{1,3})(?=(\d{3})+$)/g, "$1,");
 }

/**
 * 正则相关
 */
export class Regular {
    constructor() {

    }
    //匹配非空文本
    text(data) {
        if (/\S+/.test(data) && data) return true;
        else return false;
    }
    //匹配手机号
    phone(data) {
        return /^1[3|4|5|7|8|9][0-9]{9}$/.test(data);
    }
}
