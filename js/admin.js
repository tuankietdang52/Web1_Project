const menuoption = ["chart", "product", "order", "user"];
let choice = menuoption[0];

function menuchange(clickelement){
    let menu = document.getElementsByClassName("menu")[0];

    for (let i = 0; i < menu.children.length; i++){
        if (menu.children[i].className == "active"){
            menu.children[i].className = "nonactive";
        }
    }

    clickelement.className = "active";
    choice = findchoice();
    changecontent();
}

function findchoice(){
    let menu = document.getElementsByClassName("menu")[0];

    for (let i = 0; i < menu.children.length; i++){
        if (menu.children[i].className == "active"){
            return menuoption[i];
        }
    }

    return null;
}

function changecontent(){
    let showcontent;
    switch (choice){
        case "chart":
            showcontent = document.getElementsByClassName("chart-content-sect")[0];
            break;
        case "product":
            showcontent = document.getElementsByClassName("product-content-sect")[0];
            break;
            
    }

    changedisplay(showcontent);
}

function changedisplay(showcontent){
    let contentcontainer = document.getElementsByClassName("main-content-container")[0];

    for (let i = 0; i < contentcontainer.children.length; i++){
        contentcontainer.children[i].style.display = "none";
    }

    showcontent.style.display = "grid !important";
}