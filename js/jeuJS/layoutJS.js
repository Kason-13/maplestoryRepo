const arrangeBoard=(whichBoard,data)=>{
    const BoardLimit = 7;
    const width = window.innerWidth / BoardLimit;
    for(let index = 0;index<BoardLimit;index++){
        if(index>=data.length){
            let div = document.createElement("div");
            div.style.width = width;
            whichBoard.appendChild(div);
        }else{
            appendCard(data,index,whichBoard);
        }
    }
}

const arrangeHand=(whichHand,data)=>{
    console.log("inside arrangehand");
    const handLimit = 8;
    const width = window.innerWidth / handLimit;
    for(let index  = 0;index<handLimit;index++){
        if(index > data.length){
            let div = document.createElement("div");
            div.style.width = width;
            whichHand.appendChild(div);
        }
        else{
            appendCard(data,index,whichHand);
        }
    }
}

const appendCard=(data,index,leBoard)=>{
    cardNameAndImage = getNameAndImage(data[index].id);
    let html = document.getElementById("CardTemplate").innerHTML;
    let div = document.createElement("div");
    div.innerHTML = html;
    div.style.color="red";
    div.querySelector("h2").innerText = cardNameAndImage.name;
    div.querySelector(".uid").innerText = data[index].uid;
    div.querySelector("#CardImage").style.backgroundImage = "url("+cardNameAndImage.imgSrc+")";
    div.querySelector("#CardImage").style.backgroundSize = "contain";
    div.querySelector("#CardImage").style.backgroundRepeat = "no-repeat";
    if(data[index].mechanics.length>0){
        for(let mechanicsIndex = 0;mechanicsIndex<data[index].mechanics.length;mechanicsIndex++)
            div.querySelector(".ability").innerText += data[index].mechanics[mechanicsIndex] + "\n";
    }
    div.querySelector(".hp").innerText = "HP: " + data[index].hp;
    div.querySelector(".atk").innerText = "ATK: "+data[index].atk;
    div.querySelector(".cost").innerText = "COST: "+data[index].cost;
    leBoard.appendChild(div);
}