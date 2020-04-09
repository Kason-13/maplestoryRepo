let glowIndex = null;

const arrangeBoard=(whichBoard,data)=>{
    const BoardLimit = 7;
    const width = window.innerWidth / BoardLimit;
    for(let index = 0;index<BoardLimit;index++){
        if(index>=data.length){
            let div = document.createElement("div");
            div.style.width = width+"px";
            whichBoard.appendChild(div);
        }else{
            appendCard(data,index,whichBoard,width);
        }
    }
}

const arrangeHand=(whichHand,data)=>{
    const handLimit = 8;
    const width = window.innerWidth / handLimit;
    for(let index  = 0;index<handLimit;index++){
        if(index >= data.length){
            let div = document.createElement("div");
            div.style.width = width+"px";
            whichHand.appendChild(div);
        }
        else{
            appendCard(data,index,whichHand,width);
        }
    }
}
/* 
    ajout de event listener pour les cartes en main et sur le field du joueur
*/
const addClickListener=(div,toAddFunction,index,uid)=>{
    div.onclick=function(){
        clearGlow();
        if(div.id == "PlayerField")
            selectedFromField = true;
        else{
            selectedFromField = false;
            addGlow(index);
        }
        toAddFunction(uid);
    }
}
/* 
    methode pour clear le glowing effect d'un carte selected si on click sur une carte differente de
    la main ou du field
*/
const clearGlow=()=>{
    glowIndex = null
    document.querySelectorAll("div").forEach(element => {
        element.style.border = "none";
    });
}
/* 
    methode pour ajouter un glowing effect quand on click sur la carte selected en main ou du field du joueur
*/
const addGlow=(index)=>{
    glowIndex = index;
}

const appendCard=(data,index,leBoard,width)=>{
    cardNameAndImage = getNameAndImage(data[index].id);
    let html = document.getElementById("CardTemplate").innerHTML;
    let div = document.createElement("div");
    div.innerHTML = html;
    div.style.width = width+"px";
    div.style.color="red";
    div.querySelector("h2").innerText = cardNameAndImage.name;
    div.querySelector(".uid").innerText = data[index].uid;
    if(leBoard.id == "PlayerHand" || leBoard.id == "PlayerField")
        addClickListener(div,selectCardID,index,div.querySelector(".uid").innerText)
    div.querySelector("#CardImage").style.backgroundImage = "url("+cardNameAndImage.imgSrc+")";
    if(glowIndex == index && leBoard.id == "PlayerHand")
        div.style.border = "4px solid skyblue";
    if(data[index].mechanics.length>0){
        for(let mechanicsIndex = 0;mechanicsIndex<data[index].mechanics.length;mechanicsIndex++)
            div.querySelector(".ability").innerText += data[index].mechanics[mechanicsIndex];
            div.querySelector(".ability").innerHTML+="<br>"
    }
    div.querySelector(".hp").innerText = "HP: " + data[index].hp;
    div.querySelector(".atk").innerText = "ATK: "+data[index].atk;
    div.querySelector(".cost").innerText = "COST: "+data[index].cost;
    leBoard.appendChild(div);
}