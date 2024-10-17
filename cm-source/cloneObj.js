/**
 * 深拷贝
 */
function cloneObj(obj) {
    if (typeof obj !== 'object') return obj
    let newObj = obj.constructor === Array ? [] : {}
    if (window.JSON) {
        newObj = JSON.parse(JSON.stringify(obj))
    } else {
        for (let key in obj) {
            newObj[key] = typeof obj[key] === 'object' ? cloneObj(obj[key]) : obj[key]
        }
    }
    return newObj
}