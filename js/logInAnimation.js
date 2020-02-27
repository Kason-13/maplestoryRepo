let spriteList = [];

window.addEventListener("load",()=>{
    canvas = document.querySelector("#logInContainer");
    ctx = canvas.getContext("2d");
    spriteList.push(new Sunray(100,500,285,0));
    tick();
})

const tick =()=>{
    spriteList.forEach(element => {
        element.tick();
        element.drawRay();
    });
    window.requestAnimationFrame(tick);
}

class Sunray{
    constructor(x,y,startX,startY){
        this.x = x;
        this.y = y;
        this.startX = startX;
        this.startY = startY;
        this.endX = this.x;
        this.endY = this.y;
    }

    drawRay(){
        ctx.fillStyle = "rgba(255,255,255,0.02)";
        ctx.beginPath();
        ctx.moveTo(this.startX,this.startY);
        ctx.lineTo(this.x,this.y);
        ctx.lineTo(this.x-25,this.y-20);
        ctx.fill();
    }

    tick(){
        if(this.y<70){
            return true;
        }
        this.x--;
        this.y-=2;
        return false;
    }
}