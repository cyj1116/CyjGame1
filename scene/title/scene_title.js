class SceneTitle extends CyjScene {
    constructor(game) {
        super(game)
        game.registerAction('k', () => {
            let s = new Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        //draw labels
        this.game.context.fillText(`按 K 开始游戏`, 100, 200)
    }
    update() {

    }
}