/**
 * [].shift.call(arr1) 和 arr1.shift()的区别和联系
 * 本质上,上述两个方法是没有区别的
 * 但是,当你需要对一些如arguments这样的类数组进行操作的时候,这些类数组中并没有shift这些方法,
 * 这时候就可以通过call、apply来利用array.prototype等方式来将这些类数组转换成数组从而可以调用
 * 这些数组上的方法。
 * 
 * let arr1 = [1, 2, 3, 4, 5];
 * let a1 = arr1.shift();
 * let a1 = [].shift.call(arr1);
 * console.log(a1);
 * console.log(arr1);
 * 
 * function testArgs() {
 *   // let arg1 = arguments.shift();// arguments.shift is not a function
 *   let arg1 = [].shift.call(arguments);
 *   console.log(arg1);
 *   console.log(arguments);
 * }
 * testArgs(1, 2, 3, 4);
 */

function Animal(type) {
    this.type = type;//实例上的属性
    // 如果当前构造函数返回的是一个引用类型 需要把这个对象返回
    // 函数
    // return { name: 'crk' };
}

Animal.prototype.say = function () {
    console.log('say');
}

let ani1 = new Animal('猫');
console.log('ani1', ani1)
console.log(ani1.type);
ani1.say();


function mockNew() {
    // Constructor ==> Animal :即Constructro为传入的构造函数(Animal)
    // arguments则为剩余的arguments，就是其它参数
    let Constructor = [].shift.call(arguments);
    // let obj = Object.create(null) 不可以这么创建空对象,这样创建的空对象没有原型链,就是一个null 
    let obj = {}; // 返回的结果
    obj.__proto__ = Constructor.prototype; // 原型上的方法
    // 当构造函数返回的值为引用类型,则需要直接返回改引用类型(对象)
    let r = Constructor.apply(obj, arguments);
    return r instanceof Object ? r : obj;
}

let ani2 = mockNew(Animal, '狗');
console.log('ani2', ani2);
console.log(ani2.type);
ani2.say();

//改版1
function mockNew() {
    let Constructor = [].shift.call(arguments);
    let obj = {}; // 返回的结果
    obj.__proto__ = Constructor.prototype; // 原型上的方法
    Constructor.apply(obj, arguments);// 实例上的属性（本质上是this的指向）
    return obj
}

//改版2
function myNew(fun) {
    return function () {
        // 创建一个新对象且将其隐式原型指向构造函数原型
        let obj = {
            __proto__: fun.prototype
        };
        // 执行构造函数
        fun.call(obj, ...arguments);
        // 返回该对象
        return obj;
    };
}

function person(name, age) {
    this.name = name;
    this.age = age;
}
let obj = myNew(person)("chen", 18); // {name: "chen", age: 18}