class App {
    constructor(){
        this.slice = Array.prototype.slice;
        this.fnList = [];
        this.store = {};
    }
    invertPromise(){
        const fnList = [];
        this.slice.call(arguments).map(fn => {
            if(typeof fn === 'function'){
                const p = (store)=>{
                    return new Promise(resolve => {
                        fn(store,resolve);
                    });
                };
                fnList.push(p);
            }
        });
        return fnList;
    }
    register(arr){
        this.fnList = this.fnList.concat(arr);
    }
    // use注册的callback，同步执行
    use(...args){ 
        this.register(this.invertPromise(...args));
    }
    // all注册的callback，异步执行，类似于Promise.all()
    all(...args){
        const all = this.invertPromise(...args);
        this.fnList.push(all);
    }
    async go(...args){
        this.register(this.invertPromise(...args));
        try{
            for(let i = 0; i < this.fnList.length; i++){
                let fn = this.fnList[i];
                if(Array.isArray(fn)){
                    await Promise.all(fn.map(f=>f(this.store)));
                }else{
                    await fn(this.store);
                }
            }
        }catch(err){
            this.errorCallback(err);
        }
        
    }
    error(errorCallback){
        if(typeof errorCallback === 'function') this.errorCallback = errorCallback;
    }
};

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Midleware = factory);
}(this, App));