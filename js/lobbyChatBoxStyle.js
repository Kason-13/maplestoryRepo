const applyStyles=iframe=>{
    let styles = {
        backgroundColor: "tomato",
        fontGoogleName:"courier",
        fontColor:"navy",
        fontSize:"15px"
    }

    iframe.contentWindow.postMessage(JSON.stringify(styles),"*");
}