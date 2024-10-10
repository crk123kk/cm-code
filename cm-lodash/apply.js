/*
    在lodash源码中你会发现,有下列这段代码,那么为什么在有原生的apply的情况下，还要有这样的自定义的apply的方法呢？作者对此做出了解释，这样的做法是为了更好的代替原生的Function.prototype.apply,这样的运行会比原生的Function.prototype.apply更快。
*/
/**
* A faster alternative to `Function#apply`, this function invokes `func`
* with the `this` binding of `thisArg` and the arguments of `args`.
*
* @private
* @param {Function} func The function to invoke.
* @param {*} thisArg The `this` binding of `func`.
* @param {Array} args The arguments to invoke `func` with.
* @returns {*} Returns the result of `func`.
*/
function apply(func, thisArg, args) {
    switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
}

// @title apply的运行机制
/*
Function.prototype.apply (thisArg, argArray)
当对带有thisArg和argArray参数的对象func调用apply方法时，将执行以下步骤:
    1、如果IsCallable(func)为false，则抛出类型错误异常(TypeError exception)。
    2、如果argArray为null或undefined，则
        返回调用func的[[Call]]内部方法的结果，提供thisArg和一个空参数列表作为传入call方法的值。
    3、如果argArray的类型不是Object，那么抛出一个TypeError异常。
    4、让len是使用参数“length”调用argArray的[[Get]]内部方法的结果,即：len = argArray[length];
    5、定义一个n,让n的值为len(32位)
    6、定义一个空数组argList
    7、定义一个index,index为0
    8、循环,如果 index < 0
        a：让indexName为index(string)
        b：让nextArg是使用indexName作为参数调用argArray的[[Get]]内部方法的结果。
        c：追加nextArg作为argList的最后一个元素。
        d：index + 1
    9、返回调用func的[[Call]]内部方法的结果，提供thisArg作为这个值，argList作为参数列表。

综上：apply的内部机制其实质就是通过一些判断和转换,最后变成调用func的[[Call]]的方法来调用
*/

// call的运行机制
/*
Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )
当使用参数thisArg和可选参数arg1、arg2等对对象func调用调用方法时，采取以下步骤:
    1、如果IsCallable(func)为false，则抛出类型错误异常。
    2、定义一个空数组argList
    3、如果使用多个参数调用此方法，则从左到右依次从arg1开始追加每个参数作为argList的最后一个元素
    4、返回调用func的[[Call]]内部方法的结果，提供thisArg作为这个值，argList作为参数列表。

综上：call的内部机制其实质上也是通过一系列转换最后变成调用func的[[Call]]的方法来调用
*/

// 实例说明
function test() {
    return 3;
}
function testCall() {
    test.call(null, 1, 2, 3);
}

function testApply() {
    test.apply(null, [1, 2, 3]);
}

function testCallTime() {
    let t1 = new Date();
    let i = 0;
    while (i < 10000000) {
        i++;
        testCall();
    }
    let t2 = new Date();
    console.log("testCallTime", t2 - t1);
}

function testApplyTime() {
    let t1 = new Date();
    let i = 0;
    while (i < 10000000) {
        i++;
        testApply();
    }
    let t2 = new Date();
    console.log("testApplyTime", t2 - t1);
}
testCallTime();//testCallTime 28
testApplyTime();//testApplyTime 1029
// 参考网址
/*
    http://es5.github.io/#x15.3.4.3
*/