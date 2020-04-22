/**
 * 游戏基础的精灵基类,获得图片变量,并画出来
 */
import DataStore from "./DataStore.js";

export class Sprite {

    constructor(img = null,
                imgX = 0, imgY = 0,
                imgW = 0, imgH = 0,
                canvasX = 0, canvasY = 0,
                canvasW = 0, canvasH = 0) {
        this.img = img;
        this.imgX  = imgX;
        this.imgY = imgY;
        this.imgW  = imgW;
        this.imgH = imgH;
        this.canvasX = canvasX;
        this.canvasY = canvasY;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
    }

    /**
     * 绘制图片
     * @param img 要绘制的图片源
     * @param imgX 绘制起点图片的X坐标
     * @param imgY 绘制起点图片的Y坐标
     * @param imgW 绘制图片宽度
     * @param imgH 绘制图片高度
     * @param canvasX 显示在canvasX坐标处
     * @param canvasY 显示在canvasY坐标处
     * @param canvasW 显示在canvas的宽度
     * @param canvasH 显示在canvas的高度
     */
    draw(img = this.img,
         imgX = this.imgX, imgY = this.imgY,
         imgW = this.imgW, imgH = this.imgH,
         canvasX = this.canvasX, canvasY = this.canvasY,
         canvasW = this.canvasW, canvasH = this.canvasH) {

        this.ctx.drawImage(
                img,
                imgX, imgY,
                imgW, imgH,
                canvasX, canvasY,
                canvasW, canvasH
        );
    }

    static getImage(key) {
        return DataStore.getInstance().res.get(key);
    }
}
