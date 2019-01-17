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

/**
 * 合并对象，类似于Object.assign,会将多级合并
 * @param {object} target  
 * @param {boolean} isMergeArray 是否需要合并数组 default:true
 * @param {object[]} args 
 */
export function mergeObject(target={},isMergeArray=true,...args){
    if(typeof isMergeArray != 'boolean') isMergeArray = Boolean(isMergeArray);
    args.map(item=>{
        for(let key in item){
                if(Object.prototype.toString.apply(item[key]) === "[object Object]" && target[key]){
                        mergeObject(target[key],isMergeArray,item[key]);
                }
                else if(isMergeArray && Object.prototype.toString.apply(item[key]) === "[object Array]" && target[key]){
                        mergeObject(target[key],true,item[key]);
                }
                else{
                    target[key] = item[key];
                }
        }
    });
    return target;
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