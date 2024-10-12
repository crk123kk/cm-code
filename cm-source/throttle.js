//为什么会有函数节流
/*
    基于上文的场景，我们完成了用户 resize 浏览器后 mydiv 的高度与宽度一致的这个需求。
    这时候产品来了，说“你们这个有点奇怪呀，我放手之后他才变化，有点突兀，我在拖动的时候不能也让他变化一致吗？”
    这就很尴尬了，好不容易想出来的防抖，就这样 pass 了？不，轮到节流登场了。
*/
//什么是函数节流
/*
    需求：优化用户体验，我们需要用户在 resize 浏览器窗口的过程中，height 与 width 也能保持一致，时刻触发函数肯定是不可以的，所以需要优化频率。
    resize 过程中如果重复调用一个函数，让其以 500ms 的间隔执行，而非重复执行。
    throttle-函数节流：一个水龙头在滴水，可能一次性会滴很多滴，但是我们只希望它每隔 500ms 滴一滴水，保持这个频率。即我们希望函数在以一个可以接受的频率重复调用。
*/
//基本模式
function resizeDiv() {
    var div = document.getElementById("mydiv");
    div.style.height = div.offsetWidth + "px";
    console.log("resize");
}
/*
    方式一：
*/
function throttle(fn, interval) {
    var _self = fn; // 保存需要被延迟执行的函数引用
    var firstTime = true; // 是否初次调用
    var timer; // 定时器
    return function () {
        var args = arguments;
        var _me = this;
        if (firstTime) {
            // 如果是第一次调用不需要延迟执行
            _self.call(_me, args);
            firstTime = false;
        }
        if (timer) {
            // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }
        timer = setTimeout(function () {
            // 延迟一段时间执行
            clearTimeout(timer); // 清除定时器 避免下一次return false
            timer = null;
            _self.call(_me, args);
        }, interval || 1000);
    };
}
//window.onresize = throttle(resizeDiv, 1000);
/*
    方式二：
*/
function throttle(fn, wait, immediate) {
    let timer = null;
    let callNow = immediate;

    return function () {
        let context = this,
            args = arguments;

        if (callNow) {
            fn.apply(context, args);
            callNow = false;
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, wait);
        }
    };
}
// window.onresize = throttle(resizeDiv, 1000);
// var btn = document.getElementById("btn");
// function clickInfo() {
//  console.log("click click click");
// }
// btn.onclick = throttle(clickInfo, 1000, false);
//不断点击按钮,每隔1000ms输出一次信息