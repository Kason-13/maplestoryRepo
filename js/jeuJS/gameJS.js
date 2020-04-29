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

let firstState = true;

//for audio
let playing = false;

let errorList={
    "CARD_IS_SLEEPING": "VOTRE CARTE N'EST PAS PRET",
    "MUST_ATTACK_TAUNT_FIRST": "VOUS DEVEZ ATTACKER L'ENNEMY AVEC TAUNT EN PREMIER",
    "WRONG_TURN":"CE N'EST PAS VOTRE TOURS",
    "CARD_NOT_FOUND":"CARTE NON DISPONIBLE",
    "NOT_ENOUGH_ENERGY": "PAS ASSEZ D'ENERGY POUR JOUER LA CARTE"
}

window.addEventListener('load',()=>{
    document.querySelector("#endTurn").onclick=()=>{
        action("END_TURN");
    };
    document.querySelector("#heroPower").onclick=()=>{
        action("HERO_POWER");
    };
    document.querySelector("#opponentHero").onclick=()=>{
        selectedTargetID = 0;
        action("ATTACK");
    }

    playerHpNode = document.querySelector("#PlayerHP");
    opponentHpNode = document.querySelector("#OpponentHP");
    playerField = document.querySelector("#PlayerField");
    
    loadBackground();

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
        if(reponse != '"WAITING"' && firstState)
        {
            firstState = false;
            loadHeroPicture(JSON.parse(reponse)["opponent"]["heroClass"])
        }

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

const loadAudio=(index)=>{
    let audioUrl = "";
    switch (index) {
        case 0:
            audioUrl="audio/arena/zakum.mp3";
            break;
        case 1:
            audioUrl="audio/arena/templeOfTime.mp3";
            break;
        case 2:
            audioUrl="audio/arena/elluel.mp3";
            break;
        case 3:
            audioUrl="audio/arena/huntingGround.mp3"
            break;
        default:
            audioUrl="audio/arena/zakum.mp3";
            break;
    }

    document.addEventListener("click",()=>{
        if(!playing){
             let audio = new Audio();
             audio.src = audioUrl;
             audio.volume=0.2;
             audio.muted = false;
             audio.play();
             playing = !playing;
        }
    }) 
}

// pour charger un different background randomly par partie
const loadBackground=()=>{
    //returns between 0 and 3
    let index = Math.floor(Math.random() * Math.floor(4));
    let arenaBackground = document.querySelector("#BoardContainer");
    switch (index) {
        case 0:
            arenaBackground.style.backgroundImage="url('images/arenaBackground/zakumsAltar.png')";
            break;
        case 1:
            arenaBackground.style.backgroundImage="url('images/arenaBackground/templeOfTimeArena.jpg')";
            break;
        case 2:
            arenaBackground.style.backgroundImage="url('images/arenaBackground/elluel.png')";
            break;
        case 3:
            arenaBackground.style.backgroundImage="url('images/arenaBackground/trainingGround.jpg')";
            break;
        default:
            arenaBackground.style.backgroundImage="url('images/arenaBackground/zakumsAltar.png')";
            break;
    }
    loadAudio(index);
}

// changer le picture de l'adversaire selon le hero
const loadHeroPicture=(hero)=>{
    let heroIMG = document.querySelector("#opponentHero");
    switch (hero) {
        case "Hunter":
            heroIMG.style.backgroundImage = "url('images/classImage/Hunter.jpg')";
            break;
        case "Warrior":
            heroIMG.style.backgroundImage = "url('images/classImage/Warrior.jpg')";
            break;
        case "Priest":
            heroIMG.style.backgroundImage = "url('images/classImage/priest.jpg')";
            break;
        case "Warlock":
            heroIMG.style.backgroundImage = "url('images/classImage/Black_Mage.png')";
            break;
        case "Rogue":
            heroIMG.style.backgroundImage = "url('images/classImage/rogue.jpg')";
            break;
        case "Paladin":
            heroIMG.style.backgroundImage = "url('images/classImage/paladin.jpg')";
            break;
        case "Shaman":
            heroIMG.style.backgroundImage = "url('images/classImage/shaman.jpg')";
            break;
        case "Druid":
            heroIMG.style.backgroundImage = "url('images/classImage/druid.jpg')";
            break;
        default:
            heroIMG.style.backgroundImage = "url('images/classImage/Black_Mage.png')";
            break;
    }
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
    {
        action("PLAY");
        selectedTargetID = null;
        selectedCardID = null;
    }
}

/* 
    METHODE POUR VERIFIER SI LA CARTE EST DANS LE FIELD ADVERSE
    PARAM1: LISTE DE CARTE DE L'ADVERSE
    PARAM2: ID DU TARGET
    RETURN: VRAIS/FAUX
*/
const findTarget=(opponentFieldList,target)=>{
    cardID={};
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
        if(action == "ATTACK"){
            if(!errorList.hasOwnProperty(JSON.parse(msg)))
                $( "body" ).effect( "shake" );
            if(errorList.hasOwnProperty(JSON.parse(msg)))
                showErrorBox(errorList[JSON.parse(msg)]);
        }
        if(action == "PLAY")
        {
            if(errorList.hasOwnProperty(JSON.parse(msg)))
                showErrorBox(errorList[JSON.parse(msg)]);
        }
    })
}



