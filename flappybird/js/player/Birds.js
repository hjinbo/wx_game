import {Sprite} from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

export class Birds extends Sprite {

    constructor() {
        super();
        this.imgs = [Sprite.getImage('bird0_0'), Sprite.getImage('bird0_1'), Sprite.getImage('bird0_2')];
        const birdType = Math.floor(Math.random() * 3);
        if (birdType == 0) {
            this.imgs = [Sprite.getImage('bird0_0'), Sprite.getImage('bird0_1'), Sprite.getImage('bird0_2')];
        } else if (birdType == 2) {
            this.imgs = [Sprite.getImage('bird1_0'), Sprite.getImage('bird1_1'), Sprite.getImage('bird1_2')];
        } else {
            this.imgs = [Sprite.getImage('bird2_0'), Sprite.getImage('bird2_1'), Sprite.getImage('bird2_2')];
        }
        this.birdImgX = [6, 6, 6];
        this.birdImgY = [12, 12, 12];
        this.birdImgW = [34, 34, 34];
        this.birdImgH = [24, 24, 24];
        const dataStore = DataStore.getInstance();
        // 初始位置
        const initX = dataStore.canvas.width / 4;
        const initY = dataStore.canvas.height / 3;
        this.birdCanvasX = [initX, initX, initX];
        this.birdCanvasY = [initY, initY, initY];
        this.birdCanvasW = [34, 34, 34];
        this.birdCanvasH = [24, 24, 24];
        this.index = 0;
        this.count = 0;
        this.speed = 0.2;
        this.gravity = 9.8 / 60;
        this.offsetUp = 30;
        this.birdCurCanvasY = [initY, initY, initY];
        this.time = 0;
    }

    draw() {
        if (this.index == 2) this.count = 0;
        this.index = Math.floor(this.count);
        const offsetY = (this.gravity * this.time * (this.time - this.offsetUp)) / 2;

        for (let i = 0; i <= 2; i++) {
            this.birdCanvasY[i] = this.birdCurCanvasY[i] + offsetY;
        }
        const img = this.imgs[this.index];
        super.draw(img,
            this.birdImgX[this.index], this.birdImgY[this.index],
            this.birdImgW[this.index], this.birdImgH[this.index],
            this.birdCanvasX[this.index], this.birdCanvasY[this.index],
            this.birdCanvasW[this.index], this.birdCanvasH[this.index]
        );

        this.count += this.speed;
        this.time++;
    }
}