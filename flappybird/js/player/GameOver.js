import {Sprite} from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

export class GameOver extends Sprite {
    constructor() {
        const image = Sprite.getImage('gameOver');
        super(image,
            0, 0,
            image.width, image.height,
            DataStore.getInstance().canvas.width / 4.5, DataStore.getInstance().canvas.height / 3,
            image.width, image.height);
    }
}