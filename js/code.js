let product_click = false;
let donhang_click = false;

function default_click_navi(){
    let navigate_detail = document.getElementsByClassName("navigation navigation-detail")[0];

    navigate_detail.innerHTML = "";
    product_click = false;
    donhang_click = false;
}

function product_click_navi(){
    if (product_click) return;

    donhang_click = false;
    product_click = true;
    let navigate_detail = document.getElementsByClassName("navigation navigation-detail")[0];

    navigate_detail.innerHTML = "<div><li>Phone</li></div>" +
                                "<div><li>Earphone/Earbuds</li></div>" +
                                "<div><li>Accessory</li></div>";
}

function donhang_click_navi(){
    if (donhang_click) return;

    product_click = false;
    donhang_click = true;
    let navigate_detail = document.getElementsByClassName("navigation navigation-detail")[0];

    navigate_detail.innerHTML = "<div><li>Cho xet duyet</li></div>" +
                                "<div><li>Dang giao hang</li></div>" +
                                "<div><li>Giao Thanh Cong</li></div>" +
                                "<div><li>Giao That Bai</li></div>";
}