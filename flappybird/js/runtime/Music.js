export class Music {

    static getInstance() {
        if (!Music.instance) {
            Music.instance = new Music();
        }
        return Music.instance;
    }

    // constructor() {
    //     this.bgmAudio = new Audio();
    //     this.bgmAudio.loop = true;
    //     this.bgmAudio.src = './audio/bgm.mp3';
    //     this.playBgm();
    // }

    // playBgm() {
    //     this.bgmAudio.play();
    // }
}