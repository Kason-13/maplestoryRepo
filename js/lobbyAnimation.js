let dropperSprite=[];
window.addEventListener("load",()=>{
	setStandard();
	addBackground("#lobbyAnimation","images/lobbyBackground.jpg");
	canvas = document.querySelector("#lobbyAnimation");
	ctx = canvas.getContext("2d");
	// push sprites here
	// x=1919 , y=700;
	dropperSprite.push(new dropper(1919,700));
	//
	tick();
})

const tick=()=>{
	window.requestAnimationFrame(tick);
}

class dropper{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}

	drawDropper(){

	}

	tick(){
		if(thix.x <= 0){
			return true;
		}
		this.x-=2;
		return false;
	}
}