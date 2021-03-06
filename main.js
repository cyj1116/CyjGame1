const loadLevel = (game, n) => {
    n = n - 1
    let level = levels[n]
    window.blocks = []
    for (let i = 0; i < level.length; i++) {
        // position
        const p = level[i]
        let b = new Block(game, p)
        window.blocks.push(b)
    }
    return window.blocks
}

// 为了调试, 两个全局变量
// window.paused = false
// 初始化 blocks
// let blocks = []

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
            window.blocks = loadLevel(game, Number(k))
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
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }


    const game = CyjGame.instance(30, images, (g) => {
        let s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()