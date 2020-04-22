import {Sprite} from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

export class ButtonResume extends Sprite{
    constructor() {
        const image = Sprite.getImage('button_resume');
        super(image,
            0, 0,
            image.width, image.height,
            DataStore.getInstance().canvas.width / 2.2, DataStore.getInstance().canvas.height / 2.2,
            image.width, image.height);

        this.border = {
            x: DataStore.getInstance().canvas.width / 2.2,
            y: DataStore.getInstance().canvas.height / 2.2,
            w: image.width,
            h: image.height
        }
    }
}