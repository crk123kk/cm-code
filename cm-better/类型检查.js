//安全的类型检测
function isArray(value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}
function isFunction(value) {
    return Object.prototype.toString.call(value) == "[object Function]";
}
function isRegExp(value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
}
function isNativeJSON(value) {
    var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON) == "[object JSON]";
    return isNativeJSON;
}

function isString(value) {
    return Object.prototype.toString.call(value) == "[object String]";
}

function isUndefined(value) {
    return Object.prototype.toString.call(value) == "[object Undefined]";
}

function isNumber(value) {
    return Object.prototype.toString.call(value) == "[object Number]";
}

function isNull(value) {
    return Object.prototype.toString.call(value) == "[object Null]";
}

function isObject(value) {
    return Object.prototype.toString.call(value) == "[object Object]";
}

function isBoolean(value) {
    return Object.prototype.toString.call(value) == "[object Boolean]";
}

function isDate(value) {
    return Object.prototype.toString.call(value) == "[object Date]";
}

function isError(value) {
    return Object.prototype.toString.call(value) == "[object Error]";
}

function isSymbol(value) {
    return Object.prototype.toString.call(value) == "[object Symbol]";
}

function isPromise(value) {
    return Object.prototype.toString.call(value) == "[object Promise]";
}

function isSet(value) {
    return Object.prototype.toString.call(value) == "[object Set]";
}

function isMap(value) {
    return Object.prototype.toString.call(value) == "[object Map]";
}

function isBigInt(value) {
    return Object.prototype.toString.call(value) == "[object BigInt64Array]";
}

function isProxy(value) {
    return Object.prototype.toString.call(value) == "[object Proxy]";
}

function isReflect(value) {
    return Object.prototype.toString.call(value) == "[object Reflect]";
}

function isJSON(value) {
    return Object.prototype.toString.call(value) == "[object JSON]";
}