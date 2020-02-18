//sprite = "";
//duration = 0;

export class Clip {
    constructor() {
        this.reset();
    }

    reset(){
        this.frames = [];
        this.currentIndex = 0;
        this.nextAt = 0;
        this.paused = false;
    }

    currentFrame(){
        return this.frames[this.currentIndex]
    }

    rewind(){
        this.currentIndex = 0;
    }

    stop(){
        this.paused = true;
    }

    play(){
        this.paused = false;
    }
}

