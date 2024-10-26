//自定义方法比原生方法的性能慢
/*
http://www.cnblogs.com/ziyunfei/archive/2012/09/16/2687165.html
虽然使用自定义的函数更清晰,但自定义的函数肯定没有原生方法快.举个例子:

var a = ["aaa  ", "  bbb", "  ccc  "]

a.map(function(x) { return x.trim(); });               // ['aaa', 'bbb', 'ccc']
a.map(Function.prototype.call, String.prototype.trim); // ['aaa', 'bbb', 'ccc']
上面使用map方法来trim掉每个数组元素的空格,使用原生的方法虽然难理解.
*/
var a = ["aaa  ", "  bbb", "  ccc  "];
// a.map(function(x) {
//   return x.trim();
// });
// a.map(Function.prototype.call, String.prototype.trim);
function test1() {
  var t1 = new Date();
  a.map(function (x) {
    return x.trim();
  });
  var t2 = new Date();
  var time = t2 - t1;
  console.log("自定义:", time);
}
function test2() {
  var t1 = new Date();
  a.map(Function.prototype.call, String.prototype.trim);
  var t2 = new Date();
  var time = t2 - t1;
  console.log("原生:", time);
}
test1(); //自定义: 13
test2(); //原生: 5
