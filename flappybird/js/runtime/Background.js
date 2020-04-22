import {Sprite} from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

// 用于具体的对象创建并调用父类的构造方法
export default class Background extends Sprite {
    constructor() {
        const imgNum = Math.floor(Math.random() * 2);
        var image = Sprite.getImage('bg_day');
        if (imgNum == 1) {
            image = Sprite.getImage('bg_night');
        }
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height);
    }
}