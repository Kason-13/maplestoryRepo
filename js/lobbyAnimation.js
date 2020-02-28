let dropperSprite=[];
window.addEventListener("load",()=>{
	setStandard();
	addBackground("#lobbyAnimation","images/lobbyBackground.jpg");
	fadeInElement("#lobbyAnimation",1500);
	fadeInElement("iframe",3500);
	canvas = document.querySelector("#lobbyAnimation");
	ctx = canvas.getContext("2d");
	// push sprites here
	// x=900 , y=700;
	dropperSprite.push(new dropper(900,700));
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
		return false;
	}
}