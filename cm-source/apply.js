function fn1() {
    console.log('1', this);
    console.log(arguments);
}

Function.prototype.apply = function (context, args) {
    context = context ? Object(context) : window;
    // {}.fn = fn1;通过这种方式,将fn1的this指向了{}
    context.fn = this;
    if (!args) {
        return context.fn();
    }
    let r = eval('context.fn(' + args + ')');
    delete context.fn;
    return r;
}


fn1.apply('hello', [1, 2, 3, 4])

//改版
Function.prototype.myApply = function (context) {
    if (typeof this !== "function") {
        throw new TypeError("not function");
    }
    context = context || window;
    context.fn = this;
    let result;
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
};