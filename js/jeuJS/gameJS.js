let cardList=[];
let selectedCardID=null;
let selectedCard = false;

window.addEventListener('load',()=>{
    document.querySelector("#PlayerField").onclick=action();
    setTimeout(state,1000);
})

const state =()=>{
    $.ajax({
        url: "ajaxController.php",
        type: "POST"
    })
    .done(function(msg){
        let reponse = msg;
        traitementHand(JSON.parse(reponse));
        traitementOppenent(JSON.parse(reponse)["opponent"]);
        setTimeout(state,1000);
    })
}

/* 
    METHODE PERMETTANT D'AVOIR LE ID DE LA CARTE SELECTED
    PARAM: ID DE LA CARTE
*/
const selectCardID=(id)=>{
    selectedCard = true;
    selectedCardID = id;
    console.log("selected: ",selectedCardID);
}


/* 
    METHODE QUI MANIPULE LA DIV PLAYERHAND POUR AFFICHER LES CARTES QU'ON A EN MAIN
    PARAM: OBJECT PROVENANT DE L'API
*/
const traitementHand=(data)=>{
    document.getElementById("PlayerHand").innerHTML = "";
    const numOfCards = data["hand"].length;
    let html = document.getElementById("CardTemplate").innerHTML;
    document.getElementById("PlayerHand").style.gridTemplateColumns = "repeat("+numOfCards+",1fr)";

    for(let cardIndex = 0;cardIndex<data["hand"].length;cardIndex++){
        let div = document.createElement("div");
        div.innerHTML = html;
        div.style.color = "white";
        document.getElementById("PlayerHand").appendChild(div);
        div.querySelector("h2").innerText = data["hand"][cardIndex].id;
        div.querySelector(".uid").innerText = data["hand"][cardIndex].uid;

        div.onclick=()=>{
            selectCardID(div.querySelector(".uid").innerText);
        }

        if(data["hand"][cardIndex].mechanics.length<0){
            for(let mechanicsIndex = 0; mechanicsIndex<data["hand"][cardIndex].mechanics.length; mechanicsIndex++)
                div.querySelector(".ability").innerText += data["hand"][cardIndex].mechanics[mechanicsIndex] + "\n";
        }

        div.querySelector(".hp").innerText = data["hand"][cardIndex].hp;
        div.querySelector(".atk").innerText = data["hand"][cardIndex].atk;
        div.querySelector(".cost").innerText = data["hand"][cardIndex].cost;
        document.getElementById("PlayerHand").appendChild(div);
    }
}

/* 
    METHODE POUR TRAITER L'ETAT DU OPPONENT
    PARAM: OBJECT OPPONENT PROVENANT DE L'API
*/
const traitementOppenent=(data)=>{
    document.getElementById("OpponentHand").innerHTML="";
    const numOfCards = data["handSize"];
    document.getElementById("OpponentHand").style.gridTemplateColumns = "repeat("+numOfCards+",1fr)";

    for(let cardNum = 0;cardNum<data["handSize"];cardNum++){
        let div = document.createElement("div");
        div.style.color = "white";
        const textNode = document.createTextNode("MAGIX");
        div.appendChild(textNode);
        document.getElementById("OpponentHand").appendChild(div);
    }
}
const playSelectedCard=()=>{
    if(!selectedCardID)
        return 0; 
    return 1;
}
const clickPlayerBoard=()=>{
    validAction = playSelectedCard();
    if(validAction)
        action("PLAY");
}

const action=(action)=>{
    passedData={}
    switch (action) {
        case "PLAY":
            passedData={
                which: action,
                uid = selectedCardID
            }
            break;
        case "ATTACK":
            passedData={
                which: action,
                uid = selectedCardID
                /* to add targeted card */
            }
            break;
        case "END_TURN":
        passedData={
            which: action,
        }
            break;
        case "HERO_POWER":
            passedData={
                which: action,
            }
            break;
    }
    $.ajax({
        url: "ajaxPlay.php",
        type: "POST",
        data:passedData
    })
    .done(function(msg){
        console.log(msg);
    })
}

