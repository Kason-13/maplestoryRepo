let spriteList = [];

window.addEventListener("load",()=>{
    canvas = document.querySelector("#logInContainer");
    ctx = canvas.getContext("2d");
    console.log("inside");
    for(let i = 0;i<4;i++){
        console.log("new sunray");
        spriteList.push(new Sunray(100+10*i,500+20*i,800,20));
    }
    tick();
})

const tick =()=>{
    spriteList.forEach(element => {
        element.tick()
        element.drawRay();
    });
    window.requestAnimationFrame(tick);
}

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

    drawRay(){
        ctx.fillstyle("rgba(255,255,255,0.)");
        ctx.beginPath();
        ctx.moveTo(this.startX,this.startY);
        ctx.lineTo(this.x,this.y);
        ctx.lineTo(this.x-25,this.y-20);
        ctx.fill();
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