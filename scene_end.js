const SceneEnd = (game) => {
    let s = {
        game: game,

    }
    // 初始化
    s.draw = () => {
        //draw labels
        game.context.fillText(`游戏结束`, 100, 200)

    }
    s.update = () => {

    }
    return s
}