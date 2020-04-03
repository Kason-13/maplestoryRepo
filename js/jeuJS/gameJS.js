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
        console.log(reponse);
        /* traitement(reponse); */
        setTimeout(state,1000);
    })
}

const traitement=(data)=>{
    for(let i = 0;i<data["hand"].length;i++){

    }
}

