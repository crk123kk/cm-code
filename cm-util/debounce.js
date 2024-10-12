//为什么会有函数防抖
window.onresize = function () {
    var div = document.getElementById("mydiv");
    div.style.height = div.offsetWidth + "px";
    console.log("resize");
};
/*
    很明显，监听浏览器窗口的 resize 事件，并基于该事件改变页面布局。首先，计算 offsetWidth 属性，如果该元素或者页面上其他元素有非常复杂的 CSS 样式，那么这个过程将会很复杂。其次，设置某个元素的高度需要对页面进行回流来令改动生效。如果页面有很多元素同时应用了相当数量的 CSS 的话，这又需要很多运算,可以通过'resize'输出的次数来观察函数调用的次数。
    浏览器中某些计算和处理要比其他的昂贵很多。例如，DOM 操作比起非 DOM 交互需要更多的内存和 CPU 时间。连续尝试进行过多的 DOM 相关操作可能会导致浏览器挂起，有时候甚至会崩溃。
    很明显，用户如果不断放大缩小浏览器窗口，那我们监听函数将会不停的被调用，倘若函数过“重”，即假设如上文描述的一般，那么对浏览器的压力将会非常之大，其高频率的更改可能会让浏览器崩溃。
*/

//基本思想
/*
    某些代码不可以在没有间断的情况下连续重复执行。第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，它会清除前一次的定时器并设置另一个。如果前一个定时器已经执行过了，这个操作(清除定时器)就没有任何意义。然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器。目的是只有在执行函数的请求停止了一段时间之后才执行。
*/

//基本模式
function resizeDiv(index) {
    var div = document.getElementById("mydiv");
    div.style.height = div.offsetWidth + "px";
    console.log("resize");
}
/*
    来自高级程序设计
*/
var processor = {
    timeoutId: null, //实际进行处理的方法
    performProcessing: function () {
        //实际执行代码
    }, //初始处理调用的方法
    process: function () {
        clearTimeout(this.timeoutId);
        var that = this;
        this.timeoutId = setTimeout(function () {
            that.performProcessing();
        }, 100);
    }
}; // 尝试开始执行processor.process()
// window.onresize = processor.process(resizeDiv);
/*
    通用方式一：
        通过debounce(fn)代替fn;
        debounce 函数接受要防抖的函数作为参数，返回值为一个匿名函数。
        返回的匿名函数首先清除之前的定时器。定时器代码使用 call()来确保方法在适当的环境中执行。
*/
function debounce(fn) {
    var timer;
    var _self = fn;
    return function () {
        clearTimeout(timer);
        var args = arguments; // fn所需要的参数
        var _me = this; // 当前的this
        timer = setTimeout(function () {
            _self.call(_me, args);
        }, 200);
    };
}
/*
    通用方式二：
*/
function debounce(fn, wait, immediate) {
    let timer = null;
    return function () {
        let args = arguments;
        let context = this;
        if (immediate && !timer) {
            fn.apply(context, args);
        }
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    };
}
// window.onresize = debounce(resizeDiv, 200, false);
// var btn = document.getElementById("btn");
// function clickInfo() {
//   console.log("click click click");
// }
// btn.onclick = debounce(clickInfo, 1000, false);
//不断点击按钮，只有最后一次点击按钮之后的1000ms之后才会输出信息