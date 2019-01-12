/**
 * js常用方法
 */


 /**
  * 获取格式化的日期
  * @param {objct} date - 日期对象 
  * @param {object} option - 配置对象
  * @param {boolean} option.hasTime - 是否需要时间(12:00:00) default：true
  * @param {string} option.joinSymbol - 日期的连接符号 default："-"
  * @return {string} - 返回格式化的日期【"2019-01-12 16:00:00"】
  */

function formateDate(date,{hasTime=true,joinSymbol='-'}={hasTime:true,joinSymbol:'-'}){
    if(!date) date = new Date();
    let _ = joinSymbol,
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;
    if(hasTime){
        let hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        if(hours < 10) hours = '0' + hours;
        if(minutes < 10) minutes = '0' + minutes;
        if(seconds < 10) seconds = '0' + seconds;
        return `${year}${_}${month}${_}${day} ${hours}:${minutes}:${seconds}`;
    }else{
        return `${year}${_}${month}${_}${day}`;
    }
}