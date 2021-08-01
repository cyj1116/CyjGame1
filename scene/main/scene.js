class Scene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.setup()
        this.mouseEvent()
    }
    setup() {
        this.paddle = new Paddle(this.game, 'paddle')
        this.ball = new Ball(this.game, 'ball')
        this.score = 0
        this.enableDrag = false
        window.blocks = loadLevel(this.game, 1)
        this.game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        this.game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        this.game.registerAction('f', () => {
            this.ball.fire()
        })

    }
    draw() {
        // draw 背景
        this.game.context.fillStyle = 'gray'
        this.game.context.fillRect(0, 0, 400, 300)
        //draw
        // game.context.drawImage(paddle.image, paddle.x, paddle.y)
        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)

        // draw blocks
        for (let i = 0; i < window.blocks.length; i++) {
            const block = window.blocks[i];
            if (block.alive) {
                this.game.drawImage(block)
            }
        }

        //draw babels
        this.game.context.fillText(`分数 ${this.score}`, 10, 290)

    }
    update() {
        if (window.paused) {
            return
        }
        this.ball.move()
        // 判断死亡 游戏结束
        // if (this.ball.y > this.paddle.y) {
        //     // 跳转到游戏结束场景
        //
        //     let end = SceneEnd.new(this.game)
        //     this.game.replaceScene(end)
        //     return
        // }
        // 判断相撞
        // log(this.paddle, 'x')
        if (this.paddle.collide(this.ball)) {
            // 反弹
            // ball.speedY *= -1
            log('反弹')
            this.ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (let i = 0; i < window.blocks.length; i++) {
            const block = window.blocks[i];
            if (block.collide(this.ball)) {
                log('block 相撞')
                block.kill()
                this.ball.反弹()
                this.score += 100
            }
        }
        // 判断死亡 游戏结束
        if (this.ball.y > (this.paddle.y + this.paddle.h)) {
            // 跳转到游戏结束场景

            let end = SceneEnd.new(this.game)
            this.game.replaceScene(end)
            return
        }
    }
    mouseEvent() {
        this.game.canvas.addEventListener('mousedown', (event) => {
            let x = event.offsetX
            let y = event.offsetY
            log(x, y,event)
            // 检查是否点中了ball
            if (this.ball.hasPoint(x, y)) {
                // 设置拖拽状态
                this.enableDrag = true
            }
        })
        this.game.canvas.addEventListener('mousemove', (event) => {
            let x = event.offsetX
            let y = event.offsetY
            // log(x, y, 'move')
            if (this.enableDrag) {
                log(x, y, 'drag')

                this.ball.x = x
                this.ball.y = y
            }
        })
        this.game.canvas.addEventListener('mouseup', (event) => {
            let x = event.offsetX
            let y = event.offsetY
            this.enableDrag = false
            log(x, y, 'up')
        })
    }
}