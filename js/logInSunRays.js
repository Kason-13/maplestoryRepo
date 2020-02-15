class Sunray{
    constructor(x,y,startX,startY){
        this.x = x;
        this.y = y;
        this.limitX = 120;
        this.limitY = 75;
        this.startX = startX;
        this.startY = startY;
    }

    tick(){
        if(this.x <= this.limitX && this.limitY <= this.limitY){
            this.x = this.startX;
            this.y = this.startY;
        }
        thix.x--;
        this.y-=2;
    }
}