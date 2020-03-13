let spriteList=[];
let ctx = null;
let mesoBagDelay = 0;
let mesoBagIMG = new Image();
let menuDiv = null;
mesoBagIMG.src = "images/sprites/mesobag.png";
window.addEventListener("load",()=>{
	setStandard();
	addBackground("#lobbyAnimation","images/lobbyBackground.jpg");
	fadeInElement("#lobbyAnimation",1500);
	fadeInElement("iframe",3500);
	canvas = document.querySelector("#lobbyAnimation");
	ctx = canvas.getContext("2d");
	spriteList.push(new walker(1920,680));
	spriteList.push(new dropper(1650,455));
	
	menuDiv = document.getElementById("choiceContainer");
	tick();
})

const tick=()=>{
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(let index = 0;index<spriteList.length;index++){
		spriteList[index].tick();
	}
	if(spriteList.length<=15){
		mesoBagDelay++;
		if(mesoBagDelay>=200){
			spriteList.push(new mesoBag(1475,260));
			mesoBagDelay = 0;
		}
	}
	window.requestAnimationFrame(tick);
}

class mesoBag{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.speed = 1;
		this.hover = false;
	}

	tick(){
		if(this.y==150){
			this.hover = true;
		}
		if(this.hover){
			if(this.y >= 260)
			{
				this.y-=this.speed;
			}else if(this.y<260){
				this.y+=this.speed;
			}
		}else{
			if(this.y>=150){
				this.y-=this.speed;
		}
	}
		ctx.drawImage(mesoBagIMG,this.x,this.y)
	}
}

class dropper{
	constructor(x,y){
		this.x=x;
		this.y=y;
		
		let columnCount = 2;
		let rowCount = 1;
		let refreshDelay = 500;
		let scale = 1.4;
		let columnLoop = true;
		this.tiledImage = new TiledImage("images/sprites/idleSprite.png",columnCount,rowCount,refreshDelay,columnLoop,scale);
		this.tiledImage.changeRow(0);
		this.tiledImage.setFlipped(false);
		this.tiledImage.changeMinMaxInterval(0,1);
	}

	tick(){
		this.tiledImage.tick(this.x,this.y,ctx);
	}
}

class walker{
	constructor(x,y){
		this.x=x;
		this.y=y;

		let columnCount = 4;
		let rowCount = 2;
		let refreshDelay = 80;
		let scale = 1.2;
		let columnLoop = true;
		this.tiledImage = new TiledImage("images/sprites/sprite.png",columnCount,rowCount,refreshDelay,columnLoop,scale);
		this.tiledImage.changeRow(0);
		this.tiledImage.setFlipped(false);
		this.tiledImage.changeMinMaxInterval(0,3);
	}

	tick(){
		if(this.x >= 720)
			this.x-=2;
		else{
			this.tiledImage.changeRow(1);
			menuDiv.style.display = "block";
		}
		this.tiledImage.tick(this.x,this.y,ctx);
	}
}