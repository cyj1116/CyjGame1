const Ball = () => {
    let image = imageFromPath('ball.png')
    let o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.move = () => {
        if (o.fired) {
            // log('move')
            // 碰撞边框
            if (o.x < 0 || o.x > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY *= -1
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = () => {
        o.fired = true
    }
    o.反弹 = () => {
        o.speedY *= -1
    }
    return o
}
