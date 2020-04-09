let cardList=[];

let selectedCardID=null;
let selectedCard = false;
let selectedTargetID = null;
let selectedFromField = false;

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
    METHODE POUR RETOURNER LE NOM DE LA CARTE ET L'IMAGE
    PARAM: ID DE LA CARTE
*/
const getNameAndImage=(cardId)=>{
    return returnedObj={
        name: cardData[cardId].name,
        imgSrc: cardData[cardId].img
    }
}

/* 
    METHODE POUR ACTUALISER LE FIELD
    PARAM 1: LISTE BOARD DU JOUEUR PROVENNANT DE L'API
    PARAM 2: LISTE BOARD DU OPPONENT PROVENNANT DE L'API
*/
// refactor into a function later -> repeated code
const traitementField=(playerBoard,opponentBoard)=>{
    playerField.innerHTML = "";
    arrangeBoard(playerField,playerBoard);

    opponentField.innerHTML = "";
    arrangeBoard(opponentField,opponentBoard);
}

/* 
    METHODE PERMETTANT D'AVOIR LE ID DE LA CARTE SELECTED
    PARAM: ID DE LA CARTE
*/
const selectCardID=(id)=>{
    selectedCard = true;
    selectedCardID = id;
}
/* 
    pour choissir le target durant une attaque
*/
const selectTargetID=(id)=>{
    selectedTarget = true;
    selectedTargetID = id;
}

/* 
    METHODE QUI MANIPULE LA DIV PLAYERHAND POUR AFFICHER LES CARTES QU'ON A EN MAIN
    PARAM: OBJECT PROVENANT DE L'API
*/
const traitementHand=(data)=>{
    let playerHand = document.getElementById("PlayerHand")
    playerHand.innerHTML = "";
    arrangeHand(playerHand,data["hand"]);
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

/* 
    methode pour verifier si une carte est selected
    RETURN:VRAIS/FAUX
*/
const playSelectedCard=()=>{
    if(!selectedCard)
        return 0;
    return 1;
}
/* 
    methode pour verifier si on summon une carte
    APPELLE LA METHODE ACTION AVEC "PLAY" EN PARAM
*/
const clickPlayerBoard=()=>{
    summonCard = playSelectedCard();
    if(summonCard)
        action("PLAY");
}

/* 
    METHODE POUR VERIFIER SI LA CARTE EST DANS LE FIELD ADVERSE
    PARAM1: LISTE DE CARTE DE L'ADVERSE
    PARAM2: ID DU TARGET
    RETURN: VRAIS/FAUX
*/
const findTarget=(opponentFieldList,target)=>{
    cardID={}
    for(let index = 0;index<opponentFieldList.length;index++)
        cardID[opponentField[index].uid] = opponentField[index][uid]
    if(target in cardID)
        return 1;
    return 0;
}

/* 
    verifie si la cible est valide
    PARAM: TARGET ID
    RETURN: VRAIS/FAUX
*/
const validTarget=(target)=>{
    if(selectedFromField && selectedCard)
        if(findTarget(opponentBoard,target))
            return 1;
    return 0;
}
/* 
    METHODE POUR QUAND ON CLICK SUR LE BOARD DU OPPONENT
    PARAM: TARGET ID
    SI VALIDE: APPELLE LA FONCTION ACTION AVEC "ATTACK" EN PARAM
*/
const clickOpponentBoard=(target)=>{
    validAction = validTarget(target);
    if(validAction)
        action("ATTACK");
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

