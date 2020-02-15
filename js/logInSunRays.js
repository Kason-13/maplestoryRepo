class Sunray{
    constructor(x,y,startX,startY){
        this.endX = this.x;
        this.endY = this.y;
        this.x = x;
        this.y = y;
        this.limitX = 120;
        this.limitY = 75;
        this.startX = startX;
        this.startY = startY;
    }

    tick(){
        if(this.x <= this.limitX && this.limitY <= this.limitY){
            this.x = this.endX;
            this.y = this.endY;
        }
        thix.x--;
        this.y-=2;
    }
}