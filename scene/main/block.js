const Block = (game, position) => {
    // position 是 [0, 0] 格式
    let p = position
    let img = game.imageByName('block')

    let o = {
        x: p[0],
        y: p[1],
        alive: true,
        lives: p[2] || 1,
    }

    o.image = img.image
    o.w = img.w
    o.h = img.h
    o.kill = () => {
        o.lives--
        if (o.lives < 1) {
            o.alive = false
        }
    }

    o.collide = (b) => {
        // AB两矩形相交
        // b 在 a 中
        // b 左上角的 x 在 a 的里面
        // b 的 y 在 a 的里面
        // if (b.y > o.y && b.y < o.y + o.image.height) {
        //     if (b.x > o.x && b.x < o.x + o.image.width ) {
        //         log('相撞')
        //         return true
        //     }
        // }
        // return false
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}
