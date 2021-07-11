const Paddle = (game) => {
    let o = game.imageByName('paddle')
    // let o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 15,
    // }
    o.x = 100
    o.y = 250
    o.speed = 15

    o.move = (x) => {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.w) {
            x = 400 - o.w
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
    const aInb = (x, x1, x2) => {
        return x >= x1 && x <= x2
    }
    // 碰撞挡板
    o.collide = (ball) => {
        // if (ball.y + ball.h > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.w ) {
        //         log('相撞')
        //         return true
        //     }
        // }
        // return false
        let a = o
        let b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    return o
}
