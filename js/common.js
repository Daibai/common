/**
 * js常用方法
 * @author https://github.com/zhongjiajian
 */


/**
 * 获取格式化的日期
 * @param {objct|number|string} date - 日期对象|时间戳|'2019-1-1'
 * @param {object} option - 配置对象
 * @param {boolean} option.style - 格式'YY-MM-DD hh:mm:ss'
 * @return {string} - 返回格式化的日期【"2019-01-12 16:00:00"】
 */
export function formateDate(date, {
    style = 'YY-MM-DD hh-mm-ss',
    frontJoin = '-'
} = {
        style: 'YY-MM-DD hh:mm:ss',
        frontJoin: '-'
    }) {
    if (!date) date = new Date();
    else if (typeof date === 'number' || typeof date === 'string') date = new Date(date);
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    let hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    let mid = style.match(/\s+/),
        midJoin = style.substr(mid.index, mid.length);

    let fullRes = [year, month, day].map(item => formateNumnber(item)).join(frontJoin) + midJoin + [hours, minutes, seconds].map(item => formateNumnber(item)).join(':');
    let midInx = fullRes.indexOf(midJoin);
    let front = fullRes.slice(midInx - mid.index, midInx),
        behind = fullRes.substr(midInx + mid.length, style.length - mid.index - mid.length);

    return front + midJoin + behind;

    function formateNumnber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    }
}



export function copy(srcData) {
    let getType = data => {
        return Object.prototype.toString.call(data).slice(8, -1);
    }
    let target;
    if (getType(srcData) === 'Object') target = {};
    else target = [];
    function inner(src, target) {
        for (let key in src) {
            if (getType(src[key]) === 'Object') {
                target[key] = {};
                inner(src[key], target[key]);

            } else if (getType(src[key]) === 'Array') {
                target[key] = [];
                inner(src[key], target[key]);
            } else {
                target[key] = src[key];
            }
        }
        return target;
    }

    return inner(srcData, target);

}



/**
 * 千位分隔符
 */
export const thousandBitSeparator = (() => {
    let DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g
    let MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g
    return (num) => num && num.toString()
        .replace(DIGIT_PATTERN, (m) => m.replace(MILI_PATTERN, ','))
})()

/**
 * 正则相关
 */
export class Regular {
    constructor() { }
    //匹配非空文本
    text(data) {
        if (/\S+/.test(data) && data) return true;
        else return false;
    }
    //匹配手机号
    phone(data) {
        // return /^1[3|4|5|7|8|9][0-9]{9}$/.test(data);
        return /^1\d{10}$/.test(data);
    }
    //匹配手机号（不严格）
    phone(data) {
        return /^1\d{10}$/.test(data);
    }
    //匹配数字(各种数字)
    number(data) {
        return /^((0\.\d*[1-9]+\d*)|([1-9]+0*((\.\d+)|(\d*))))$/.test(data);
    }
    //匹配正整数
    posInt(data) {
        return /^[1-9]\d*$/.test(data);
    }
    //保留3位以内的小数
    in3xiaoshu(data) {
        return /^(([1-9]\d*)|((0|([1-9]\d*))\.\d{1,3}))$/.test(data);
    }
}



// url query2Json

export const query2Json = (path) => {
    let res = {};
    if (!path || typeof path != 'string') return res;
    let paramArr = path.split('?')[1].split('&');
    for (let item of paramArr) {
        let key = item.split('=')[0], value = item.split('=')[1];
        res[key] = value;
    }
    return res;
}
