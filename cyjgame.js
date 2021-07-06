const CyjGame = (fps) => {
    let g = {
        actions: {},
        keydowns: {},
    }
    const canvas = document.querySelector('#id-canvas')
    const context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = (cyjImage) => {
        g.context.drawImage(cyjImage.image, cyjImage.x, cyjImage.y)
    }
    // events
    window.addEventListener('keydown', (event) => {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', (event) => {
        g.keydowns[event.key] = false
    })
    //
    g.registerAction = (key, callback) => {
        g.actions[key] = callback
    }
    //timer
    window.fps = 30
    // 递归 动态调试
    const runLoop = () => {
        log(window.fps, 'window.fps')
        // events
        let actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            const key = actions[i];
            if (g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 actions
                g.actions[key]()
            }
        }
        //update
        g.update()
        //clear
        context.clearRect(0 ,0 ,canvas.width ,canvas.height)
        //draw
        g.draw()
        // next run loop
        setTimeout(() => {
            runLoop()
        }, 1000/window.fps)
    }

    setTimeout(() => {
        runLoop()
    }, 1000/fps)

    // timer 60fps
    // setInterval(() => {
    //     // events
    //     let actions = Object.keys(g.actions)
    //     for (let i = 0; i < actions.length; i++) {
    //         const key = actions[i];
    //         if (g.keydowns[key]) {
    //             // 如果按键被按下, 调用注册的 actions
    //             g.actions[key]()
    //         }
    //     }
    //     //update
    //     g.update()
    //     //clear
    //     context.clearRect(0 ,0 ,canvas.width ,canvas.height)
    //     //draw
    //     g.draw()
    // }, 1000/fps)

    return g
}