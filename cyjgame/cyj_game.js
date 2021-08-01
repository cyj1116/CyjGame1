class CyjGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        // this.fps = fps
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
        window.addEventListener('keyup', function(event) {
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
        this.context.drawImage(cyjImage.texture, cyjImage.x, cyjImage.y)
    }
    // update
    update() {
        // log(this.fps, 'fps')
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    // 递归 动态调试
    runLoop() {
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
    textureByName(name) {
        let img = this.images[name]
        return img
    }
    imageByName(name) {
        // log(g.images, 'g.images')

        let img = this.images[name]
        let image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        this.scene = scene
        // 开始运行
        setTimeout(() => {
            this.runLoop()
        }, 1000/window.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    __start(scene) {
        this.runCallback(this)
    }

    init() {
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
