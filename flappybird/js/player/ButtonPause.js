import {Sprite} from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

export class ButtonPause extends Sprite {
    constructor() {
        const image = Sprite.getImage('button_pause');
        super(image, 0, 0,
            image.width, image.height,
            DataStore.getInstance().canvas.width - image.width, 0,
            image.width, image.height);

        this.border = {
            x: DataStore.getInstance().canvas.width - image.width,
            y: 0,
            w: DataStore.getInstance().canvas.width,
            h: image.height
        }
    }
}