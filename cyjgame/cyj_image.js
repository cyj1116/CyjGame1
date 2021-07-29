class CyjImage {
    constructor(game, name, width, height) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = width || this.texture.width
        this.h = height || this.texture.height

    }
    static new(game, name, width, height) {
        const i = new this(game, name, width, height)
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

