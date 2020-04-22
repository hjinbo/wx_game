import DataStore from "./base/DataStore.js";
import {DownPipe} from "./runtime/DownPipe.js";
import {UpPipe} from "./runtime/UpPipe.js";

// 导演类,控制游戏逻辑例如画出具体图片内容
export default class Director {

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 1;
        this.isGameOver = false;
        this.isRunning = true;
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    // 构造管道数组(因为是同时出现)
    createPipes() {
        const minTop = DataStore.getInstance().canvas.height / 8;
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        var pipeType = Math.floor(Math.random() * 2);
        this.dataStore.get('pipes').push(new UpPipe(top, pipeType));
        this.dataStore.get('pipes').push(new DownPipe(top, pipeType));
    }

    // 小鸟的向上飞事件
    birdFlyEvent() {
        const bird = this.dataStore.get('birds');
        for (let i = 0; i <= 2; i++) {
            bird.birdCurCanvasY[i] = bird.birdCanvasY[i];
        }
        bird.time = 0;
    }

    // 小鸟的碰撞检测和计分
    birdCheck() {
        // 获取陆地
        const land = this.dataStore.get('land');
        // 获取其中一只鸟
        const bird = this.dataStore.get('birds');
        if (bird.birdCanvasY[0] + bird.birdImgH[0] + 5 >= land.canvasY) {
            this.isGameOver = true;
        }
        // 获取管道
        const pipes = this.dataStore.get('pipes');

        // 构建小鸟模型
        const birdBorder = {
            top: bird.birdCanvasY[0],
            bottom: bird.birdCanvasY[0] + bird.birdImgH[0],
            left: bird.birdCanvasX[0],
            right: bird.birdCanvasX[0] + bird.birdImgW[0]
        };

        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];
            const pipeBorder = {
                top: pipe.canvasY,
                bottom: pipe.canvasY + pipe.canvasH,
                left: pipe.pipeX,
                right: pipe.pipeX + pipe.imgW
            };
            if (Director.isStrike(birdBorder, pipeBorder)) {
                this.isGameOver = true;
            }
        }
        const score = this.dataStore.get('score');
        if (bird.birdCanvasX[0] > pipes[0].pipeX + pipes[0].imgW && score.isScore) {
            score.scoreNumber++;
            score.isScore = false;
        }
    }

    static isStrike(bird, pipe) {
        let result = true;

        if (bird.top > pipe.bottom
            || bird.bottom < pipe.top
            || bird.right < pipe.left
            || bird.left > pipe.right)
            result = false;

        return result;
    }

    run() {
        this.birdCheck();
        if (this.isGameOver) {
            // console.log("游戏结束");
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.get('gameOver').draw();
            this.dataStore.get('button_resume').draw();
            this.dataStore.destroy();
            return;
        }
        // 背景
        this.dataStore.get('background').draw();
        // 管道
        this.drawPipes();
        // 陆地
        this.dataStore.get('land').draw();
        // 小鸟
        this.dataStore.get('birds').draw();
        // 计分器
        this.dataStore.get('score').draw();
        // 暂停按钮
        // this.dataStore.get('button_pause').draw();
        // 定时器
        let timer = requestAnimationFrame(() => this.run());
        this.dataStore.put('timer', timer);
    }

    drawPipes() {
        const pipes = this.dataStore.get('pipes');
        if (pipes[0].pipeX + pipes[0].canvasW <= 0 && pipes.length == 4) {
            pipes.shift();
            pipes.shift();
        }
        // 当存在两组管道时再创建
        if (pipes[0].pipeX <= (DataStore.getInstance().canvas.width - pipes[0].canvasW) / 2
            && pipes.length == 2) {
            this.createPipes();
            this.dataStore.get('score').isScore = true;
        }
        this.dataStore.get('pipes').forEach(function(pipe) {
            pipe.draw();
        });
    }
}