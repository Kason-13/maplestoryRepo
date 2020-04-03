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
        traitement(reponse);
        setTimeout(state,1000);
    })
}

const traitement=(data)=>{
    console.log(data);
    document.getElementById("PlayerHand").innerHTML = "";
    let html = document.getElementById("CardTemplate");
    /* for(let cardIndex = 0;cardIndex<data["hand"].length;cardIndex++){
        let div = document.createElement("div");
        div.innerHTML = html;
        div.querySelector("h2").innerText = data["hand"][cardIndex].id;
        if(data["hand"][cardIndex].mechanics.length<0){
            for(let mechanicsIndex = 0; mechanicsIndex<data["hand"][cardIndex].mechanics.length; mechanicsIndex++)
                div.querySelector(".ability").innerHTML += data["hand"][cardIndex].mechanics + "\n";
        }
        div.querySelector(".hp").innerHTML = data["hand"][cardIndex].hp;
        div.querySelector(".atk").innerHTML = data["hand"][cardIndex].atk;
        div.querySelector(".cost").innerHTML = data["hand"][cardIndex].cost;
        document.getElementById("PlayerHand").appendChild(div);
    } */
}

