const loadLevel = (game, n) => {
    n = n - 1
    let level = levels[n]
    let blocks = []
    for (let i = 0; i < level.length; i++) {
        // position
        const p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

// 为了调试, 两个全局变量
window.paused = false
// 初始化 blocks
let blocks = []
const enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    // window.paused = false
    // window.blocks = loadLevel(1)
    // for debug
    window.addEventListener('keydown', (event) => {
        let k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', (event) => {
        let input = event.target
        window.fps = Number(input.value)
    })
}



const __main = () => {
    const images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    let game = CyjGame(30, images, (g) => {
        let paddle = Paddle(game)

        let ball = Ball(game)

        let score = 0

        blocks = loadLevel(game, 1)

        game.registerAction('a', () => {
            paddle.moveLeft()
        })
        game.registerAction('d', () => {
            paddle.moveRight()
        })
        game.registerAction('f', () => {2
            ball.fire()
        })

        game.update = () => {
            if (paused) {
                return
            }
            ball.move()
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

        game.draw = () => {
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
    })

    enableDebugMode(game, true)

}




__main()