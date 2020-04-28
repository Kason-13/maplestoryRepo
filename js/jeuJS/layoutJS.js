let glowIndex = null;
let playFromHand = false;

let errorBoxDisplayTime = 6000;

const arrangeBoard=(whichBoard,data)=>{
    const BoardLimit = 7;
    const width = whichBoard.offsetWidth / BoardLimit;
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
    const width = whichHand.offsetWidth / handLimit;
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
const addClickListener=(div,toAddFunction,uid,divID)=>{
    div.onclick=function(){
        if(divID == "PlayerField"){
            playFromHand = false;
        }
        else{
            playFromHand = true;
        }
        toAddFunction(uid);
    }
}

const appendCard=(data,index,leBoard,width)=>{
    cardNameAndImage = getNameAndImage(data[index].id);
    let html = document.getElementById("CardTemplate").innerHTML;
    let div = document.createElement("div");
    div.style.height="100%";
    div.innerHTML = html;
    div.style.width = width+"px";
    div.querySelector("h3").innerText = cardNameAndImage.name;
    div.querySelector(".uid").innerText = data[index].uid;
    if(leBoard.id == "PlayerHand" || leBoard.id == "PlayerField")
        addClickListener(div,selectCardID,div.querySelector(".uid").innerText,leBoard.id)
    else
        addClickListener(div,selectTargetID,div.querySelector(".uid").innerText)
    div.querySelector("#CardImage").style.backgroundImage = "url("+cardNameAndImage.imgSrc+")";
    if(selectedCardID != null && selectedCardID == data[index].uid)
        div.style.border = "4px solid skyblue";
    if(data[index].mechanics.length>0){
        for(let mechanicsIndex = 0;mechanicsIndex<data[index].mechanics.length;mechanicsIndex++)
        {
            if(data[index].mechanics[mechanicsIndex] == "Taunt")
            {
                div.style.backgroundImage = "url('images/imgSrc/cardTemplate2Taunt.png')";
                div.style.backgroundSize = "cover";
                div.style.backgroundRepeat = "no-repeat";
            }
            div.querySelector(".ability").innerText += data[index].mechanics[mechanicsIndex];
            if(mechanicsIndex==data[index].mechanics.length-1)
                break;
            div.querySelector(".ability").innerText+=" & "
        }
    }
    div.querySelector(".hp").innerText = "HP: " + data[index].hp;
    div.querySelector(".atk").innerText = "ATK: "+data[index].atk;
    div.querySelector(".cost").innerText = "COST: "+data[index].cost;
    leBoard.appendChild(div);
}

const modifyEndBox=(textString,textButton)=>{
    document.querySelector("#WaitingBox").style.display = "block";
    document.querySelector('#WaitingBox').querySelector("h2").innerText= textString;
    document.querySelector('#WaitingBox').querySelector("#RespawnButton").innerText = textButton;
    document.querySelector("#RespawnButton").style.display="block";
}

const showErrorBox=async(errorString)=>{
    let boxBox = document.querySelector("#WaitingBox");
    boxBox.style.display = "block";
    boxBox.querySelector("h2").innerText = errorString;
    boxBox.querySelector("#RespawnButton").style.display = "none";
}