class Ball extends CyjImage {
    constructor(game, name, width, height) {
        super(game, name, width, height);
        this.setUp()
    }
    setUp() {
        this.x = 100
        this.y = 200
        this.speedX = 5
        this.speedY = 5
        this.fired = false
    }
    move() {
        if (this.fired) {
            // log('move')
            // 碰撞边框
            if (this.x < 0 || this.x > 400) {
                this.speedX *= -1
            }
            if (this.y < 0 || this.y > 300) {
                this.speedY *= -1
            }
            // move
            this.x += this.speedX
            this.y += this.speedY
        }
    }
    fire() {
        this.fired = true
    }
    反弹() {
        this.speedY *= -1
    }
    hasPoint(x, y) {
        let xIn = x >= this.x && x <= this.x + this.w
        let yIn = y >= this.y && y <= this.y + this.h
        return xIn && yIn
    }
}

