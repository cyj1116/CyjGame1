class Block {
    // position 是 [0, 0] 格式
    constructor(game, position) {
        this.texture = game.textureByName('block')
        log(this, 'this.texture')
        this.w = this.texture.width
        // this.h = height || this.texture.height
        this.h = this.texture.height
        this.p = position
        this.setUp()
    }
    setUp() {
        this.x = this.p[0]
        this.y = this.p[1]
        this.alive = true
        this.lives = this.p[2] || 1
    }
    kill() {
        this.lives--
        if (this.lives < 1) {
            this.alive = false
        }
    }
    collide(b) {
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
        return this.alive && (rectIntersects(this, b) || rectIntersects(b, this))
    }
}