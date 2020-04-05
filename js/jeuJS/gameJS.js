let cardList=[];

let selectedCardID=null;
let selectedCard = false;

let playerField = null;
let opponentField = null;

window.addEventListener('load',()=>{
    playerField = document.querySelector("#PlayerField");
    playerField.onclick=()=>{
        clickPlayerBoard()
    };
    opponentField= document.querySelector("#OpponentField");
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
        traitementField(JSON.parse(reponse)["board"],JSON.parse(reponse)["opponent"]["board"]);
        setTimeout(state,1000);
    })
}

/* 
    METHODE POUR ACTUALISER LE FIELD
    PARAM 1: LISTE BOARD DU JOUEUR PROVENNANT DE L'API
    PARAM 2: LISTE BOARD DU OPPONENT PROVENNANT DE L'API
*/
// refactor into a function later -> repeated code
const traitementField=(playerBoard,opponentBoard)=>{
    playerField.innerHTML = "";
    const numOnFieldPlayer = playerBoard.length;
    let html = document.getElementById("CardTemplate").innerHTML;
    playerField.style.gridTemplateColumns = "repeat("+numOnFieldPlayer+",1fr)";

    for(let cardIndex = 0;cardIndex<numOnFieldPlayer;cardIndex++){
        let div = document.createElement("div");
        div.innerHTML = html;
        div.style.color="white";
        div.querySelector("h2").innerText = playerBoard[cardIndex].id;
        div.querySelector(".uid").innerText = playerBoard[cardIndex].uid;

        if(playerBoard[cardIndex].mechanics.length<0){
            for(let mechanicsIndex = 0; mechanicsIndex<playerBoard[cardIndex].mechanics.length; mechanicsIndex++)
                div.querySelector(".ability").innerText += playerBoard[cardIndex].mechanics[mechanicsIndex] + "\n";
        }

        div.querySelector(".hp").innerText = playerBoard[cardIndex].hp;
        div.querySelector(".atk").innerText = playerBoard[cardIndex].atk;
        div.querySelector(".cost").style.display = "none";
        playerField.appendChild(div);
    }

    opponentField.innerHTML = "";
    const numOnFieldOpponent = opponentBoard.length;
    html = document.getElementById("CardTemplate").innerHTML;
    opponentField.style.gridTemplateColumns = "repeat("+numOnFieldOpponent+",1fr)";

    for(let cardIndex = 0;cardIndex<numOnFieldOpponent;cardIndex++){
        let div = document.createElement("div");
        div.innerHTML = html;
        div.style.color="white";
        div.querySelector("h2").innerText = opponentBoard[cardIndex].id;
        div.querySelector(".uid").innerText = opponentBoard[cardIndex].uid;

        if(opponentBoard[cardIndex].mechanics.length<0){
            for(let mechanicsIndex = 0; mechanicsIndex<opponentBoard[cardIndex].mechanics.length; mechanicsIndex++)
                div.querySelector(".ability").innerText += opponentBoard[cardIndex].mechanics[mechanicsIndex] + "\n";
        }

        div.querySelector(".hp").innerText = opponentBoard[cardIndex].hp;
        div.querySelector(".atk").innerText = opponentBoard[cardIndex].atk;
        div.querySelector(".cost").style.display = "none";
        opponentField.appendChild(div);
    }


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

    for(let cardIndex = 0;cardIndex<numOfCards;cardIndex++){
        let div = document.createElement("div");
        div.innerHTML = html;
        div.style.color = "white";
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
    if(!selectedCard)
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
                uid : selectedCardID
            }
            break;
        case "ATTACK":
            passedData={
                which: action,
                uid : selectedCardID
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

