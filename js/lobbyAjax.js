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
        if(response === '"CREATED_PVP"' || response == '"JOINED_PVP"'){
            window.location.href='jeu.php';
        }else{
            document.querySelector("#buttonContainer").innerHTML = "<button id='LobbyButton'>"+response+"</button>" ;
        }
    })
}