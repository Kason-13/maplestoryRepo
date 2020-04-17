window.addEventListener("load",()=>{
    document.querySelector("#LobbyButton:first-of-type").onclick=()=>{
        setTimeout(matchMaking,1000);
    }
})

const matchMaking=()=>{
    userData = {
        type:"PVP",
        key:key
    }
    $.ajax({
        url:"ajaxMatch.php",
        type: "POST",
        data: userData
    })
    .done(function(response){
        if(response === '"CREATED_PVP"'){
            document.querySelector("#buttonContainer").innerHTML = "<button id='LobbyButton'>CREATED PVP, EN ATTENTE D'UN JOUEUR</button>" ;
        }else if(response == '"JOINED_PVP"'){
            window.location.href='jeu.php';
        }else{
            document.querySelector("#buttonContainer").innerHTML = "<button id='LobbyButton'>"+response+"</button>" ;
        }
        setTimeout(matchMaking,1000);
    })
}