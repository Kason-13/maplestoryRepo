window.addEventListener('load',()=>{
    setTimeout(state,1000);
})

const state =()=>{
    $.ajax({
        url: "ajax-state.php",
        type: "POST"
    })
    .done(function(msg){
        console.log(msg);
        let reponse = JSON.parse(msg);
        console.log(reponse);
        setTimeout(state,1000);
    })
}

