/**
 * 数组乱序
 */

function mixArr(arr) {
    return arr.sort(() => {
        return Math.random() - 0.5
    })
}


/**
 * 数组去重
 *  Array.from(new Set(arr))
 *  [...new Set(arr)]
 */

function removeDup(arr) {
    let result = []
    let hashMap = {}
    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i]
        if (!hashMap[temp]) {
            hashMap[temp] = true
            result.push(temp)
        }
    }
    return result
}

/**
 * 扁平化：flatten
 */

function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)), [])
}

/**
 * 过滤：filter
 */

Array.prototype.myFilter = function (fn, context) {
    if (typeof fn !== 'function') {
        throw new TypeError('no function')
    }
    let arr = this
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let temp = fn.call(context, arr[i], i, arr)
        if (temp) {
            result.push(arr[i])
        }
    }
    return result
}