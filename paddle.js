const Paddle = () => {
    let image = imageFromPath('paddle.png')
    let o = {
        image: image,
        x: 100,
        y: 250,
        speed: 15,
    }
    o.move = (x) => {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function () {
        // o.x -= o.speed
        // if (o.x < 0) {
        //     o.x = 0
        // }
        o.move(o.x - o.speed)
    }

    o.moveRight = () => {
        // o.x += o.speed
        // if (o.x > 400 - o.image.width) {
        //     o.x = 400 - o.image.width
        // }
        o.move(o.x + o.speed)
    }
    // 碰撞挡板
    o.collide = (ball) => {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width ) {
                log('相撞')
                return true
            }
        }
        return false
    }
    return o
}
