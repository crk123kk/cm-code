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