// 根据 传入的 times 生成一个需要调用多次才正在执行实际函数的函数
_.after = function (times, func) {
    if (times <= 0) return func();
    return function () {
        if (--times < 1) {
            return func.apply(this, arguments);
        }
    };
};