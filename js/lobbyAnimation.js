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
	spriteList.push(new Walker(1920,680));
	spriteList.push(new WalkerPet(2000,680));
	spriteList.push(new Dropper(1650,455));
	spriteList.push(new WalkerTwo(0,680));
	spriteList.push(new ZombieShroom(-150,680))
	
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
			spriteList.push(new MesoBag(1525,310));
			mesoBagDelay = 0;
		}
	}
	window.requestAnimationFrame(tick);
}

class MesoBag{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.speed = 2;
		this.hover = false;
	}

	tick(){
		if(this.y<=230){
			this.hover = true;
		}
		if(this.hover){
			if(this.y<=310)
				this.y+=this.speed;
			else if(this.y>=320)
				this.y-=this.speed;
		}else{
			this.y-=this.speed;
		}
		ctx.drawImage(mesoBagIMG,this.x,this.y,250,250);
	}
}

class Dropper{
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

class Walker{
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

class WalkerPet{
	constructor(x,y){
		this.x=x;
		this.y=y;

		this.columnCount = 8;
		this.rowCount = 1;
		this.refreshDelay = 80;
		this.scale = 1.2;
		this.columnLoop = true;
		this.sitting = false;
		this.tiledImage = new TiledImage("images/sprites/walkerPetWalking.png",this.columnCount,this.rowCount,this.refreshDelay,this.columnLoop,this.scale);
		this.tiledImage.changeRow(0);
		this.tiledImage.setFlipped(false);
		this.tiledImage.changeMinMaxInterval(0,7);
	}

	tick(){
		if(this.x >= 800)
			this.x-=1.5;
		else{
			if(!this.sitting){
				this.sitting = !this.sitting;
				this.refreshDelay = 160;
				this.tiledImage = new TiledImage("images/sprites/walkerPetSitting.png",this.columnCount,this.rowCount,this.refreshDelay,this.columnLoop,this.scale);
				this.tiledImage.changeRow(0);
				this.tiledImage.setFlipped(false);
				this.tiledImage.changeMinMaxInterval(0,7);
			}
		}
		this.tiledImage.tick(this.x,this.y,ctx);
	}
}

class WalkerTwo{
	constructor(x,y){
		this.x=x;
		this.y=y;

		this.leftOffSide = -150;
		this.rightOffSide = 2070;

		this.speed = 2;

		this.columnCount = 4;
		this.rowCount = 1;
		this.refreshDelay = 80;
		this.scale = 1.2;
		this.columnLoop = true;
		this.tiledImage = new TiledImage("images/sprites/blueGuyWalk.png",this.columnCount,this.rowCount,this.refreshDelay,this.columnLoop,this.scale);
		this.tiledImage.changeRow(0);
		this.tiledImage.setFlipped(true);
		this.tiledImage.changeMinMaxInterval(0,3);
	}
	tick(){
		if(this.x>this.rightOffSide){
			this.tiledImage.setFlipped(false);
			this.speed = -2;
		}
		if(this.x<this.leftOffSide){
			this.tiledImage.setFlipped(true);
			this.speed = 2;
		}
		this.x+=this.speed;
		this.tiledImage.tick(this.x,this.y,ctx);
	}
}

class ZombieShroom{
	constructor(x,y){
		this.x=x;
		this.y=y;

		this.leftOffSide = -150;
		this.rightOffSide = 2070;

		this.speed = 2;

		this.columnCount = 4;
		this.rowCount = 1;
		this.refreshDelay = 80;
		this.scale = 1.2;
		this.columnLoop = true;
		this.tiledImage = new TiledImage("images/sprites/zombieShroomSprite.png",this.columnCount,this.rowCount,this.refreshDelay,this.columnLoop,this.scale);
		this.tiledImage.changeRow(0);
		this.tiledImage.setFlipped(true);
		this.tiledImage.changeMinMaxInterval(0,3);
	}
	tick(){
		if(this.x>this.rightOffSide){
			this.tiledImage.setFlipped(false);
			this.speed = -2;
		}
		if(this.x<this.leftOffSide){
			this.tiledImage.setFlipped(true);
			this.speed = 2;
		}
		this.x+=this.speed;
		this.tiledImage.tick(this.x,this.y,ctx);
	}
}
