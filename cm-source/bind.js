/**
 * bind方法的特性
 * 1）bind方法可以绑定this的指向，绑定参数
 * 2）bind方法返回一个绑定后的函数（高阶函数）
 * 3）如果绑定的函数被new了，那么当前绑定函数(bindFn)的this就是当前的原函数(fn/实例)
 * 4）new出来的结果可以找到原有类的原型
 */

let obj = {
    name: "kk"
};

function fn(name, age) {
    console.log("this：", this);
    console.log("this.name：", this.name);
    console.log("name：", name);
    console.log("name：", age);
}

Function.prototype.bind = function (context) {
    // bind返回的是一个未执行的函数，但是这个未执行的函数的this还是指向绑定的this
    // 因此这里需要将this传入闭包中
    let that = this;
    // bind绑定的时候传入的参数，需要排除context这个参数
    let bindArgs = Array.prototype.slice.call(arguments, 1);
    // bind返回的是一个未执行的函数
    function fBound() {
        // 函数执行时传入的参数
        let args = Array.prototype.slice.call(arguments);
        // 通过call、apply可以实现内部this的绑定
        // 这里使用apply是为了之后可以通过数组更方便的传参
        return that.apply(
            // 如果当前函数的this指向的fBound，那么就是在执行new操作，就将this指向当前实例this
            // 如果不是new操作，则依然指向传入的context上下文想·
            this instanceof fBound ? this : context,
            bindArgs.concat(args)
        );
    }
    // Object.create()
    function Fn() { }
    // 通过将this.prototype的原型传给Fn空函数再通过new空函数来将Fn的原型和fBound关联起来
    // 1.避免this和fBound公用一个原型，而是通过原型链的方式查找
    // 2.以下步骤就是为了让new出来的bindFn的实例能够找到在fn原型上绑定的属性和方法
    Fn.prototype = this.prototype;
    fBound.prototype = new Fn();
    return fBound;
};

let bindFn = fn.bind(obj, "sh");
// bindFn(12);
fn.prototype.flag = "people";
let instance = new bindFn(12); //this: fn{}
console.log("flag：", instance.flag);


//改版
Function.prototype.mybind = function (context) {
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    let _this = this;
    let arg = [...arguments].slice(1);
    return function F() {
        // 处理函数使用new的情况
        if (this instanceof F) {
            return new _this(...arg, ...arguments);
        } else {
            return _this.apply(context, arg.concat(...arguments));
        }
    };
};