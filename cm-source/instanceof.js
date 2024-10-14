// 右边变量的原型存在于左边变量的原型链上
// 右边是对象，左边是对象实例
// 创建对象（new）就是把对象的原型挂载到对象实例的原型链上
function instanceOf(left, right) {
    let leftValue = left.__proto__;
    let rightValue = right.prototype;
    while (true) {
        if (leftValue === null) {
            return false;
        }
        if (leftValue === rightValue) {
            return true;
        }
        // 如果查找不到，继续顺着原型链上查找
        leftValue = leftValue.__proto__;
    }
}

function Animal(name) {
    this.name = name;
}

function People(name) {
    this.name = name;
}

let a1 = new Animal("DOG");
let flag = a1 instanceof Animal;
let flag2 = a1 instanceof People;
let flag3 = instanceOf(a1, Animal);
let flag4 = instanceOf(a1, People);
console.log("flag :", flag);
console.log("flag2 :", flag2);
console.log("flag3 :", flag3);
console.log("flag4 :", flag4);
