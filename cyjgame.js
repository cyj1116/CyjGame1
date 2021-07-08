const CyjGame = (fps, images, runCallback) => {
    // images 是一个对象, 里面是图片的名字, 程序会在所有图片载入成功后运行
    let g = {
        actions: {},
        keydowns: {},
        images: {}
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
    window.fps = 60

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

    //
    let loads = []
    // 预先载入所有图片
    let names = Object.keys(images)
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const path = images[name];
        const img = new Image()
        img.src = path
        img.onload = () => {
            // 存入 g.images 中
            g.images[name] = img
            // 所有图片都载入成功后, 调用run
            log('hello 载入图片', loads.length, images.length)
            loads.push(1)
            if (loads.length === names.length) {
                log('hello 载入图片')
                g.run()
            }
        }
    }
    g.imageByName = (name) => {
        log(g.images, 'g.images')

        let img = g.images[name]
        let image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.run = () => {
        runCallback(g)
        // 开始运行
        setTimeout(() => {
            runLoop()
        }, 1000/fps)

    }



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