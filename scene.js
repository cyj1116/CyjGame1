const Scene = (game) => {
    let s = {
        game: game,

    }
    // 初始化
    let paddle = Paddle(game)

    let ball = Ball(game)

    let score = 0

    // 初始化 blocks
    // let blocks = []

    blocks = loadLevel(game, 1)

    game.registerAction('a', () => {
        paddle.moveLeft()
    })
    game.registerAction('d', () => {
        paddle.moveRight()
    })
    game.registerAction('f', () => {
        ball.fire()
    })

    s.draw = () => {
        // draw 背景
        game.context.fillStyle = 'gray'
        game.context.fillRect(0, 0, 400, 300)
        //draw
        // game.context.drawImage(paddle.image, paddle.x, paddle.y)
        game.drawImage(paddle)
        game.drawImage(ball)

        // draw blocks
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.alive) {
                game.drawImage(block)
            }
        }

        //draw babels
        game.context.fillText(`分数 ${score}`, 10, 290)

    }
    s.update = () => {
        if (window.paused) {
            return
        }
        ball.move()
        // 判断死亡游戏结束
        if (ball.y > paddle.y) {
            // 跳转到游戏结束场景

            let end = SceneEnd(game)
            game.replaceScene(end)
            return
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 反弹
            // ball.speedY *= -1
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.collide(ball)) {
                log('block 相撞')
                block.kill()
                ball.反弹()
                score += 100
            }
        }
    }

    //mouse event
    let enableDrag = false
    game.canvas.addEventListener('mousedown', (event) => {
        let x = event.offsetX
        let y = event.offsetY
        log(x, y,event)
        // 检查是否点中了ball
        if (ball.hasPoint(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', (event) => {
        let x = event.offsetX
        let y = event.offsetY
        // log(x, y, 'move')
        if (enableDrag) {
            log(x, y, 'drag')

            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', (event) => {
        let x = event.offsetX
        let y = event.offsetY
        enableDrag = false
        log(x, y, 'up')
    })

    return s
}