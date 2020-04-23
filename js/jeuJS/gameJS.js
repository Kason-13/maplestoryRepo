let cardList=[];
let opponentBoardList = null;

let selectedCardID=null;
let selectedCard = false;
let selectedTargetID = null;

let opponentHpNode = null;
let playerHpNode = null;

let playerField = null;
let opponentField = null;

let shakedScreen = false;

window.addEventListener('load',()=>{
    document.querySelector("#endTurn").onclick=()=>{
        action("END_TURN");
    };
    document.querySelector("#opponentHero").onclick=()=>{
        selectedTargetID = 0;
        action("ATTACK");
    }

    playerHpNode = document.querySelector("#PlayerHP");
    opponentHpNode = document.querySelector("#OpponentHP");
    playerField = document.querySelector("#PlayerField");
    
    playerField.onclick=()=>{
        clickPlayerBoard();
    };
    opponentField= document.querySelector("#OpponentField");
    opponentField.onclick=()=>{
        clickOpponentBoard(opponentBoardList);
    };
    state();
})

const state =()=>{
    $.ajax({
        url: "ajaxController.php",
        type: "POST"
    })
    .done(function(msg){
        let reponse = msg;
        if(reponse == '"LAST_GAME_LOST"')
        {
            if(shakedScreen == false)
                $( "body" ).effect( "shake" );
            modifyEndBox("YOU LOST!","RESPAWN AT THE NEAREST TOWN");
            shakedScreen = true;
        }
        else if(reponse == '"LAST_GAME_WON"')
            modifyEndBox("YOU WON!","RETURN TO THE NEAREST TOWN AS THE CHAMPION");
        else if(reponse == '"WAITING"')
            document.querySelector("#WaitingBox").style.display = "block";
        else{
            document.querySelector("#WaitingBox").style.display = "none";
            traitementHand(JSON.parse(reponse));
            traitementOppenent(JSON.parse(reponse)["opponent"]);
            opponentBoardList = JSON.parse(reponse)["opponent"]["board"];
            traitementField(JSON.parse(reponse)["board"],opponentBoardList);
            setHp(opponentHpNode,playerHpNode,JSON.parse(reponse));
        }
        setTimeout(state,1000);
    })
}

const setHp=(opponentNode,playerNode,data)=>{
    playerNode.innerText = data.hp + " HP";
    playerNode.innerHTML +="<br>";
    playerNode.innerText += data.mp + " MP";
    playerNode.innerHTML +="<br>";
    playerNode.innerText += "TIME: " + data.remainingTurnTime;
    
    opponentNode.innerText = data.opponent.hp + " HP";
    opponentNode.innerHTML += "<br>";
    opponentNode.innerText += data.opponent.mp + " MP";
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
        div.style.backgroundColor="rgb(35,35,35)";
        div.style.textAlign="center";
        document.getElementById("OpponentHand").appendChild(div);
    }
}

/* 
    methode pour verifier si une carte est selected
    RETURN:VRAIS/FAUX
*/
const playSelectedCard=()=>{
    if(!playFromHand)
        return 0;
    glowIndex = null;
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
    cardID={};
    console.log(selectedCardID);
    console.log(selectedTargetID);
    for(let index = 0;index<opponentFieldList.length;index++){
        cardID[opponentFieldList[index].uid] = opponentFieldList[index].uid
    }
    if(target in cardID)
        return 1;
    return 0;
}

/* 
    verifie si la cible est valide
    PARAM: TARGET ID
    RETURN: VRAIS/FAUX
*/
const validTarget=(opponentBoard)=>{
    if(playFromHand && selectedCard)
        if(findTarget(opponentBoard,selectedTargetID))
            return 1;
    return 0;
}
/* 
    METHODE POUR QUAND ON CLICK SUR LE BOARD DU OPPONENT
    PARAM: TARGET ID
    SI VALIDE: APPELLE LA FONCTION ACTION AVEC "ATTACK" EN PARAM
*/
const clickOpponentBoard=(opponentList)=>{
    validAction = validTarget(opponentList);
    if(validAction)
    {
        action("ATTACK");
    }
    selectedTargetID = null;
    selectedCardID = null;
}

/* METHOD POUR CONSTRUCTION DES DATAS QU'ON VA UTILISER POUR APPELLER L'API
    FAIT AUSSI UN APPELLE A L'API
    PARAM: L'ACTION
*/
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
                uid : selectedCardID,
                targetUid : selectedTargetID
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
        console.log(msg)
    })
}

