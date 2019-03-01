//以下函数参考《JavaScript设计模式与开发实践》

/**
 * 获取单例
 */
var getSingle = function(fn){
    let result;
    return function(){
        return result || (result = fn.apply(this,arguments));
    }
};

/**
 * 动态装饰函数
 */
Function.prototype.after = function(afterfn){
    var _self = this;
    return function(){
        var ret = _self.apply(this,arguments);
        afterfn.apply(this,arguments);
        return ret;
    }
};