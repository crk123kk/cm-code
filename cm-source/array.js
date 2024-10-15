/**
 * 数组乱序
 */

function mixArr(arr) {
    return arr.sort(() => {
        return Math.random() - 0.5
    })
}
