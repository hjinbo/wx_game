import DataStore from "../base/DataStore.js";
import {Sprite} from "../base/Sprite.js";

export class Score extends Sprite {
    constructor() {
        super();
        this.scoreNumber = 0;
        // 每通过一次只加一次
        this.isScore = true;
        this.numGap = 5;
    }

    draw() {
        var scoreString = '' + this.scoreNumber;
        for (let i = 0; i < scoreString.length; i++) {
            var c = scoreString.charAt(i);
            var image = Sprite.getImage('score' + c);
            super.draw(image, 0, 0,
                image.width, image.height,
                (image.width - this.numGap) * i, 0,
                image.width , image.height);
        }
    }
}