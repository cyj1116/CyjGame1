// const SceneEnd = (game) => {
//     let s = {
//         game: game,
//
//     }
//     game.registerAction('r', () => {
//         let s = SceneTitle.new(game)
//         game.replaceScene(s)
//     })
//     // 初始化
//     s.draw = () => {
//         //draw labels
//         game.context.fillText(`游戏结束, 按 r 返回标题界面`, 100, 200)
//
//     }
//     s.update = () => {
//
//     }
//     return s
// }

class SceneEnd extends CyjScene {
    constructor(game) {
        super(game)
        game.registerAction('r', () => {
            let s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        //draw labels
        this.game.context.fillText(`游戏结束, 按 r 返回标题界面`, 100, 200)
    }
    update() {

    }
}