import {Sprite} from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";
import Director from "../Director.js";

export class Pipe extends Sprite {
    constructor(image, top) {
        super(image,
            0, 0,
            image.width, image.height,
            DataStore.getInstance().canvas.width / 2, 0,
            image.width, image.height + 100);
        this.top = top;
        this.pipeX = DataStore.getInstance().canvas.width + image.width;
        this.moveSpeed = Director.getInstance().moveSpeed;
    }

    draw() {
        this.pipeX -= this.moveSpeed;
        super.draw(this.img,
            0, 0,
            this.imgW, this.imgH,
            this.pipeX, this.canvasY,
            this.canvasW, this.canvasH)
    }
}