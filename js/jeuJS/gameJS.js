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
        traitement(JSON.parse(reponse));
        setTimeout(state,1000);
    })
}

const traitement=(data)=>{
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
}

