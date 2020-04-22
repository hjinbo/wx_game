import {Sprite} from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";
import Director from "../Director.js";

export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        // 保证陆地的宽度大于canvas
        super(image,
            0, 0,
            image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height,
            image.width, image.height);
        this.landX = 0;
        this.moveSpeed = Director.getInstance().moveSpeed;
    }

    // 重写draw方法, 使其左移动
    draw() {
        this.landX += this.moveSpeed;
        // 当陆地行走像素 > 陆地绘制宽度 - canvas宽度时
        if (this.landX > this.img.width + 300 - this.dataStore.canvas.width) {
            this.landX = 0;
        }
        super.draw(this.img,
            this.imgX, this.imgY,
            this.imgW , this.imgH,
            -this.landX, this.canvasY,
            this.canvasW + 300, this.canvasH);
    }
}