let spriteList = [];

window.addEventListener("load",()=>{
    canvas = document.querySelector("#logInContainer");
    ctx = canvas.getContext("2d");
    tick();
})

const tick =()=>{
    ctx.drawline
    window.requestAnimationFrame(tick);
}