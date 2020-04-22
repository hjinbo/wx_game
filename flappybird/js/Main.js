import ResourcesLoader from "./base/ResourcesLoader.js";
import DataStore from "./base/DataStore.js";
import Background from "./runtime/Background.js";
import Director from "./Director.js";
import {Land} from "./runtime/Land.js";
import {Birds} from "./player/Birds.js";
import {Score} from "./player/Score.js";
import {GameOver} from "./player/GameOver.js";
import {ButtonResume} from "./player/ButtonResume.js";
import {ButtonPause} from "./player/ButtonPause.js";
import {Music} from "./runtime/Music.js";

export default class Main {

	constructor() {
		this.canvas = wx.createCanvas();
		this.ctx = this.canvas.getContext('2d');
		// const image = wx.createImage();
		// image.src = './res/bg_day.png';
		// image.onload = () => {
		// 	this.ctx.drawImage(image, 0, 0, image.width, image.height,
		// 		 0, 0, this.canvas.width, this.canvas.height);
		// }
		const loader = ResourcesLoader.create();
		this.dataStore = DataStore.getInstance();
		this.director = Director.getInstance();
		loader.onload(map => this.onResourceFirstLoad(map));
	}
    
  	onResourceFirstLoad(map) {
		this.dataStore.ctx = this.ctx;
		this.dataStore.canvas = this.canvas;
		this.dataStore.res = map;
		this.init();
  	}
    
	init() {
        this.director.isGameOver = false;
  		// 将子类放入存储器中
		this.dataStore
			.put('background', Background)
			.put('land', Land)
            .put('pipes', [])
			.put('birds', Birds)
			.put('score', Score)
			.put('gameOver', GameOver)
			.put('button_pause', ButtonPause)
			.put('button_resume', ButtonResume)
			.put('music', Music);
		// 事先创建两个管道数组
        this.director.createPipes();
        // 事先创建三个小鸟
        this.registerBirdEvent();
		// 导演类画出该图片
		this.director.run();
	}
    
	registerBirdEvent() {
  		this.dataStore.canvas.addEventListener('click', e => {
  			// 屏蔽掉JS的事件冒泡
  			e.preventDefault();
  			// 如果游戏结束点击则直接开始游戏，否则触发小鸟的向上飞事件
  			if (this.director.isGameOver) {
  				this.init();
			} else {
  				this.director.birdFlyEvent();
			}
		});
	}
}

