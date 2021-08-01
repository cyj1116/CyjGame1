// const log = (s) => {
//     e('#id-text-log').value += '\n' + s
// }

const log = console.log.bind(console, '---Log:')

const e = sel => document.querySelector(sel)

const imageFromPath = (path) => {
    const img = new Image()
    img.src = path
    return img
}

const imageByName = (name) => {

}

// 矩形相交
const aInb = (x, x1, x2) => {
    return x >= x1 && x <= x2
}

const rectIntersects = (a, b) => {
    // log(a.y, b.y, 'ab')
    // AB两矩形相交
    // b 在 a 中
    // b 左上角的 x 在 a 的里面
    // b 的 y 在 a 的里面
    // 还要考虑一次 a 在 b 中
    // 有bug
    // log(a, b, 'ab')
    // if (b.y > a.y && b.y < a.y + a.h) {
    //     if (b.x > a.x && b.x < a.x + a.w ) {
    //         // log('相撞')
    //         return true
    //     }
    // }
    // return false
    if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
        if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
            return true
        }
    }
    return false
}