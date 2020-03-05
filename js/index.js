let fadeState = false;
window.addEventListener("load",()=>{
    fadeInElement("#logInContainer",1000);
    fadeInElement("#formContainer",4000);
    fadeInAndOut("#idTitle",fadeState,3500);
})