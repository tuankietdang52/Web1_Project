function naviactive(pageactive){
    if (pageactive.className == "navi-active") return;

    let nonactive = document.getElementsByClassName("navigation")[0];

    for (let i = 0; i < nonactive.children.length; i++){
        let nonactivepage = nonactive.children[i];
        if (nonactivepage.children[0].className == "navi-active"){
            nonactivepage.children[0].className = "navi-nonactive";
        }
    }

    pageactive.className = "navi-active";
}




function activeoption(pageactive){
    if (pageactive.className == "active") return;

    let nonactive = document.getElementsByClassName("special-offer-option")[0];

    for (let i = 0; i < nonactive.children.length; i++){
        let nonactivepage = nonactive.children[i];
        if (nonactivepage.children[0].className == "active"){
            nonactivepage.children[0].className = "nonactive";
        }
    }

    pageactive.className = "active";
}