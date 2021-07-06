const log = console.log.bind(console)

const imageFromPath = (path) => {
    const img = new Image()
    img.src = path
    return img
}

// 矩形相交
const rectIntersects = (a, b) => {
    // AB两矩形相交
    // b 在 a 中
    // b 左上角的 x 在 a 的里面
    // b 的 y 在 a 的里面
    // 还要考虑一次 a 在 b 中
    // 有bug
    if (b.y > a.y && b.y < a.y + a.image.height) {
        if (b.x > a.x && b.x < a.x + a.image.width ) {
            log('相撞')
            return true
        }
    }
    return false
}