let walkerSprite=[];
let ctx = null;
window.addEventListener("load",()=>{
	setStandard();
	addBackground("#lobbyAnimation","images/lobbyBackground.jpg");
	fadeInElement("#lobbyAnimation",1500);
	fadeInElement("iframe",3500);
	canvas = document.querySelector("#lobbyAnimation");
	ctx = canvas.getContext("2d");
	walkerSprite.push(new walker(1920,680));
	tick();
})

const tick=()=>{
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(let index = 0;index<walkerSprite.length;index++){
		walkerSprite[index].tick();
	}
	window.requestAnimationFrame(tick);
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
		}
		this.tiledImage.tick(this.x,this.y,ctx);
	}
}