class CyjGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        let self = this
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = false
        })
        this.init()
    }
    // 创建单例
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(cyjImage) {
        this.context.drawImage(cyjImage.image, cyjImage.x, cyjImage.y)
    }
    // update
    update = () => {
        this.scene.update()
    }
    // draw
    draw = () => {
        this.scene.draw()
    }
    //
    registerAction = (key, callback) => {
        this.actions[key] = callback
    }
    // 递归 动态调试
    runLoop = () => {
        log(window.fps, 'window.fps')
        // events
        let actions = Object.keys(this.actions)
        for (let i = 0; i < actions.length; i++) {
            const key = actions[i];
            if (this.keydowns[key]) {
                // 如果按键被按下, 调用注册的 actions
                this.actions[key]()
            }
        }
        //update
        this.update()
        //clear
        this.context.clearRect(0 ,0 ,this.canvas.width ,this.canvas.height)
        //draw
        this.draw()
        // next run loop
        setTimeout(() => {
            this.runLoop()
        }, 1000/window.fps)
    }

    imageByName = (name) => {
        // log(g.images, 'g.images')

        let img = this.images[name]
        let image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene = (scene) => {
        this.scene = scene
        // 开始运行
        setTimeout(() => {
            this.runLoop()
        }, 1000/window.fps)
    }

    replaceScene = (scene) => {
        this.scene = scene
    }

    __start = (scene) => {
        this.runCallback(this)
    }

    init = () => {
        //
        let loads = []
        // 预先载入所有图片
        log(this.images, 'this.images')
        let names = Object.keys(this.images)
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const path = this.images[name];
            const img = new Image()
            img.src = path
            img.onload = () => {
                // 存入 g.images 中
                this.images[name] = img
                // 所有图片都载入成功后, 调用run
                log('hello 载入图片', loads.length, this.images.length)
                loads.push(1)
                if (loads.length === names.length) {
                    log('hello 载入图片')
                    this.__start()
                }
            }
        }
    }
}

// const CyjGame = (fps, images, runCallback) => {
//     // images 是一个对象, 里面是图片的名字, 程序会在所有图片载入成功后运行
//     let g = {
//         scene: null,
//         actions: {},
//         keydowns: {},
//         images: {}
//     }
//     const canvas = document.querySelector('#id-canvas')
//     const context = canvas.getContext('2d')
//     g.canvas = canvas
//     g.context = context
//     // draw
//     g.drawImage = (cyjImage) => {
//         g.context.drawImage(cyjImage.image, cyjImage.x, cyjImage.y)
//     }
//     // events
//     window.addEventListener('keydown', (event) => {
//         g.keydowns[event.key] = true
//     })
//     window.addEventListener('keyup', (event) => {
//         g.keydowns[event.key] = false
//     })
//     // update
//     g.update = () => {
//         g.scene.update()
//     }
//     // draw
//     g.draw = () => {
//         g.scene.draw()
//     }
//     //
//     g.registerAction = (key, callback) => {
//         g.actions[key] = callback
//     }
//     //timer
//     window.fps = 30
//
//     // 递归 动态调试
//     const runLoop = () => {
//         log(window.fps, 'window.fps')
//         // events
//         let actions = Object.keys(g.actions)
//         for (let i = 0; i < actions.length; i++) {
//             const key = actions[i];
//             if (g.keydowns[key]) {
//                 // 如果按键被按下, 调用注册的 actions
//                 g.actions[key]()
//             }
//         }
//         //update
//         g.update()
//         //clear
//         context.clearRect(0 ,0 ,canvas.width ,canvas.height)
//         //draw
//         g.draw()
//         // next run loop
//         setTimeout(() => {
//             runLoop()
//         }, 1000/window.fps)
//     }
//
//     //
//     let loads = []
//     // 预先载入所有图片
//     let names = Object.keys(images)
//     for (let i = 0; i < names.length; i++) {
//         const name = names[i];
//         const path = images[name];
//         const img = new Image()
//         img.src = path
//         img.onload = () => {
//             // 存入 g.images 中
//             g.images[name] = img
//             // 所有图片都载入成功后, 调用run
//             log('hello 载入图片', loads.length, images.length)
//             loads.push(1)
//             if (loads.length === names.length) {
//                 log('hello 载入图片')
//                 g.__start()
//             }
//         }
//     }
//     g.imageByName = (name) => {
//         log(g.images, 'g.images')
//
//         let img = g.images[name]
//         let image = {
//             w: img.width,
//             h: img.height,
//             image: img,
//         }
//         return image
//     }
//
//     g.runWithScene = (scene) => {
//         g.scene = scene
//         // 开始运行
//         setTimeout(() => {
//             runLoop()
//         }, 1000/fps)
//     }
//
//     g.replaceScene = (scene) => {
//         g.scene = scene
//     }
//
//     g.__start = (scene) => {
//         runCallback(g)
//     }
//
//
//
//     // timer 60fps
//     // setInterval(() => {
//     //     // events
//     //     let actions = Object.keys(g.actions)
//     //     for (let i = 0; i < actions.length; i++) {
//     //         const key = actions[i];
//     //         if (g.keydowns[key]) {
//     //             // 如果按键被按下, 调用注册的 actions
//     //             g.actions[key]()
//     //         }
//     //     }
//     //     //update
//     //     g.update()
//     //     //clear
//     //     context.clearRect(0 ,0 ,canvas.width ,canvas.height)
//     //     //draw
//     //     g.draw()
//     // }, 1000/fps)
//
//     return g
// }