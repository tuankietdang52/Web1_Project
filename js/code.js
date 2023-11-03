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