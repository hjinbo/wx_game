import {Pipe} from "./Pipe.js";
import {Sprite} from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

export class DownPipe extends Pipe {
    constructor(top, pipeType) {
        var image = Sprite.getImage('pipe_up');
        if (pipeType == 1) {
            image = Sprite.getImage('pipe2_up');
        }
        super(image, top);
    }

    draw() {
        // 管道间的空隙
        let gap = DataStore.getInstance().canvas.height / 8;
        this.canvasY = this.top + gap; // 下边管道的Y坐标
        super.draw();
    }
}