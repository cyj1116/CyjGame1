class Paddle extends CyjImage {
    constructor(game, name, width, height) {
        super(game, name, width, height);
        this.setUp()
    }
    setUp() {
        this.x = 100
        this.y = 250
        this.speed = 15
    }
    move(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - this.w) {
            x = 400 - this.w
        }
        this.x = x
    }
    moveLeft() {
        // o.x -= o.speed
        // if (o.x < 0) {
        //     o.x = 0
        // }
        this.move(this.x - this.speed)
    }
    moveRight() {
        // o.x += o.speed
        // if (o.x > 400 - o.image.width) {
        //     o.x = 400 - o.image.width
        // }
        this.move(this.x + this.speed)
    }
    collide(b) {
        return (rectIntersects(this, b) || rectIntersects(b, this))
    }
}