class App {
    constructor(){
        this.fnList = {};
        this.num = 0;
        this.store = {};
    }
    use(){
        this.num ++;
        var oneList = [];
        Array.prototype.slice.apply(arguments).map(fn => {
            if(typeof fn === 'function'){
                oneList.push(fn);
            }
        })
        this.fnList[this.num] = oneList;
    }
    async go(){
        var fnList = [];
        for(let i in this.fnList){
            this.fnList[i].map(fn => {
                fnList.push(function(store){
                    return new Promise(resolve => {
                        fn(resolve);
                    })
                })
            })
        }
        for(let i = 0; i < fnList.length; i++){
            await fnList[i](this.store);
        }
        
    }
};

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Midleware = factory);
}(this, App));