/**
 * call方法的特性
 * 1、改变当前函数的this指向
 * 2、让当前函数执行
 * 3、当多个call连接,会让call方法执行,并且把call中的this变成fn2无论多少个call连接,
 * （多个call连接最终都是function(context){},当最终再通过call将fn2引入,最终本质上会变成：fn2.call();）
 * fn1.call.call(fn2)  ===> fn2.call()
 */
function fn1() {
    console.log('1', this);
    console.log(arguments);
}

function fn2() {
    console.log('2', this);
}

Function.prototype.call = function (context) {
    context = context ? Object(context) : window;
    // {}.fn = fn1;通过这种方式,将fn1的this指向了{}
    // 即{}.fn的函数内容是fn1,只不过{}.fn中this的指向是{}
    context.fn = this;
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    // console.log(args);
    // console.log(args.toString());
    // 利用数组toString的特性,当数组args和字符串相连接的情况下,将数组转成字符串
    // 即：context.fn(arguments[1],arguments[2],...);
    // 通过 eval() 执行字符串中的内容,将运行得到的结果返回
    let r = eval('context.fn(' + args + ')');
    delete context.fn;
    return r;
}

let fn1Call = fn1.call;
console.log(fn1Call)

fn1.call.call(fn2);
/*
    fn1.call.call(fn2)  ======(context = fn2)========> fn2.fn = fn1.call;

                        ======(fn1.call == call == function(context){...})

                        ======(fn == fn1.call == call)=======>  fn2.call()
*/

//改版
// 将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myCall = function (context) {
    if (typeof this !== "function") {
        throw new TypeError("not function");
    }
    context = context || window;
    context.fn = this;
    let arg = [...arguments].slice(1);
    let result = context.fn(...arg);
    delete context.fn;
    return result;
};