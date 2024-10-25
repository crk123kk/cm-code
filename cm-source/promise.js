/**
 * Promise需要传入一个executor执行函数
 * executor执行函数中需要传入两个参数,一个是resolve()一个是rejected()
 * 这两个参数的作用在于改变Promise对象的状态
 * let p = new Promise(function(resolve, reject) {
        resolve("success");
    });
    p.then(function(data){
        console.log(data);
    }, function(err){
        console.log(err);
    })
 */
function Promise(executor) {
  // 避免异步的时候this丢失
  let self = this;
  // 默认值：成功的值和失败的原因
  self.value = undefined;
  self.reason = undefined;

  // 保存当前promise的状态
  self.status = "pending";

  function resolve(value) {
    if (self.status === "pending") {
      self.value = value;
      self.status = "resolved";
    }
  }

  function reject(reason) {
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
    }
  }
  // executor()是立即执行的,是同步函数
  executor(resolve, reject);
}

// then方法需要传入两个参数,分别是成功的回调和失败的回调
Promise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  if (self.status === "resolved") {
    onFulfilled(self.value);
  }
  if (self.status === "rejected") {
    onRejected(self.reason);
  }
};

function promiseAll(promises) {
  // 返回一个promise实例
  return new Promise((resolve, reject) => {
    // 做一个判断参数是否是数组
    if (!Array.isArray(promises)) {
      return reject(new TypeError("arguments must be Array"));
    }

    let count = 0,
      newValues = new Array(promises.length); // 接收新的结果参数 建立一个伪数组
    for (let i = 0; i < promises.length; i++) {
      // 运用promise特性 只会有一个状态
      Promise.resolve(promises[i]).then(
        (res) => {
          count++;
          newValues[i] = res; // 把每次返回成功的数据添加到数组中
          if (count === promises.length) {
            // 数据接收完成
            return resolve(newValues);
          }
        },
        (rej) => reject(rej)
      );
    }
  });
}
