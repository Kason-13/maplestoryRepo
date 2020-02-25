let playing = false;
window.addEventListener("load",()=>{
   document.addEventListener("click",()=>{
       if(!playing){
            let audio = new Audio();
            audio.src = "audio/msLogin.mp3";
            audio.volume=0.2;
            audio.muted = false;
            audio.play();
            playing = !playing;
       }
   }) 
})