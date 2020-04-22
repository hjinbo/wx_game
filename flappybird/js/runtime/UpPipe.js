import {Pipe} from "./Pipe.js";
import {Sprite} from "../base/Sprite.js";

export class UpPipe extends Pipe {
    constructor(top, pipeType) {
        var image = Sprite.getImage('pipe_down');
        if (pipeType == 1) {
            image = Sprite.getImage('pipe2_down');
        }
        super(image, top);
    }

    draw() {
        this.canvasY = this.top - this.canvasH;
        super.draw();
    }
}