
/**
 * 观察者模式：eventEmitter
 */
class EventEmitter {
    // 定义事件中心
    constructor() {
        this.events = {}
    }
    // 监听
    on(name, cb) {
        if (!this.events[name]) {
            this.events[name] = [cb]
        } else {
            this.events[name].push(cb)
        }
    }
    // 触发
    emit(name, ...arg) {
        if (this.events[name]) {
            this.events[name].forEach((fn) => {
                fn.call(this, ...arg)
            })
        }
    }
    // 取消
    off(name, cb) {
        if (this.events[name]) {
            this.events[name] = this.events[name].filter((fn) => {
                return fn != cb
            })
        }
    }
    // 只监听一次
    once(name, cb) {
        var onlyOnce = () => {
            cb.apply(this, arguments)
            this.off(name, onlyOnce)
        }
        this.on(name, onlyOnce)
        return this
    }
}
