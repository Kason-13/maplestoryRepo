window.addEventListener('load',()=>{
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

const traitementHand=(data)=>{
    document.getElementById("PlayerHand").innerHTML = "";
    let html = document.getElementById("CardTemplate").innerHTML;
    for(let cardIndex = 0;cardIndex<data["hand"].length;cardIndex++){
        let div = document.createElement("div");
        div.innerHTML = html;
        document.getElementById("PlayerHand").appendChild(div);
        div.querySelector("h2").innerText = data["hand"][cardIndex].id;
        if(data["hand"][cardIndex].mechanics.length<0){
            for(let mechanicsIndex = 0; mechanicsIndex<data["hand"][cardIndex].mechanics.length; mechanicsIndex++)
                div.querySelector(".ability").innerText += data["hand"][cardIndex].mechanics + "\n";
        }
        div.querySelector(".hp").innerText = data["hand"][cardIndex].hp;
        div.querySelector(".atk").innerText = data["hand"][cardIndex].atk;
        div.querySelector(".cost").innerText = data["hand"][cardIndex].cost;
        document.getElementById("PlayerHand").appendChild(div);
    }
};
const traitementOppenent=(data)=>{
    document.getElementById("OpponentHand").innerHTML="";
    let div = document.createElement("div");
    let cardH2 = document.createElement("h2");
    cardH2.innerText = "Magix";
    div.appendChild(cardH2);
    for(let cardNum = 0;cardNum<data["handSize"].lenght;cardNum++)
        document.getElementById("OpponentHand").appendChild(div);
}

