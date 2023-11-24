// JS cho thuoc tinh chung //
getData();
setProductData(list_products);

function setThingsup(){
    addheader();
    addbuttontotop();
}

function getData(){
    list_products = getProductData() || list_products;
}

// Header //

function addheader(){
    document.write(`
<header>
    <section class="navigation-sect">
        <div class="navigation-container">
            <div class="contact-us">
                <li>
                    <a class="icon fb" href="#">
                    </a>
                </li>
                <li>
                    <a class="icon twitter" href="#">
                    </a>
                </li>
                <li>
                    <a class="icon google" href="#">
                    </a>
                </li>
                <li>
                    <a class="icon youtube" href="#">
                    </a>
                </li>
            </div>
            <div class="navigation">
                <li>
                    <a href="index.html" class="icon home">
                        <p class="navi-text">Trang chủ</p>
                    </a>
                </li>
                <li>
                    <a href="tintuc.html" class="icon newnav">
                        <p class="navi-text">Tin tức</p>
                    </a>
                </li>
                <li>
                    <a href="tuyendung.html" class="icon recruit">
                        <p class="navi-text">Tuyển dụng</p>
                    </a>
                </li>
                <li>
                    <a href="gioithieu.html" class="icon info">
                        <p class="navi-text">Giới thiệu</p>
                    </a>
                </li>
                <li>
                    <a href="trungtambaohanh.html" class="icon fix">
                        <p class="navi-text">Bảo hành</p>
                    </a>
                </li>
                <li>
                    <a href="lienhe.html" class="icon contact">
                        <p class="navi-text">Liên hệ</p>
                    </a>
                </li>
            </div>
        </div>
    </section>
</header>
<section class="header-content">
    <a class="homelogo" href="index.html"><img src="../img/logo.jpg" alt="logo"></a>
    <div class="searchbar-container">
        <div class="searchbox">
            <input type="text" class="searchbar" onkeyup="Searching(event)" placeholder="Search">
            <a href="#" class="searchbutton">Tìm kiếm</a>
            <div class="searchresult-dropdown"></div>
        </div>
        <div class="keyword"><span>Từ khóa:</span> 
            <li><a href="index.html?company=Samsung">Samsung</a></li>
            <li><a href="index.html?company=Apple">Iphone</a></li>
            <li><a href="index.html?company=Huawei">Huawei</a></li>
            <li><a href="index.html?company=Oppo">Oppo</a></li>
            <li><a href="index.html?company=Xiaomi">Xiaomi</a></li>
        </div>
    </div>
    <div class="user-option">
    
    <div class="user">

    <a class="user-option-container" onclick="checkTaiKhoan();">
        <i class="icon account user-option-effect"></i>
        Tài khoản 
    </a>

    <div class="menuUser hide">
    <a href="nguoidung.html"> Trang người dùng</a>
    <a onclick="if(window.confirm('Xác nhận đăng xuất ?')) logOut();">Đăng xuất</a>
    </div>

    </div>    

        <a href="#" class="user-option-container">
            <i class="icon cart user-option-effect"></i>
            Giỏ hàng
        </a>
        </div>
</section>
`);
}

function addfooter(){
    document.body.innerHTML += (`
    <footer class="copy-right">
        <p><a href="index.html">LDD Phone Store</a> - All rights reserved <i class="fa-regular fa-copyright"></i> 2023 - Designed by
            <span style="color: whitesomke; font-weight: bold">group 16th</span></p>
    </footer>
    `)
}

// them button len dau trang //
function addbuttontotop(){
   document.body.innerHTML += '<button class="icon scrolltotop-button" onclick="totop()"></button>' 
}

function totop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// ket thuc phan button len dau trang //

// CAC HAM DUNG CHUNG //

// VIET SAN PHAM VA KHUNG SAN PHAM //

// viet san pham //

function writeproduct(product, sectionclassname){
    let productcode = product[0].masp;
    let nameproduct =  product[0].name;
    let imgsrc = product[0].img;

    let productsect = document.getElementsByClassName(sectionclassname)[0];

    productsect.innerHTML += (`
    <a href="chitietsanpham.html?` + product[0].masp + `" class="product">
        <img class="product-img" src="` + imgsrc + `" alt="` + productcode + `">
        ` + writepromotag(product) + `
        <span class="product-name">` + nameproduct + `</span>
        <div class="product-price">` + 
            writeprice(product) +
        `</div>
        <div class="star-container">` + addstarandratecount(product) + `</div>
        <button class="addtocart-button icon" onclick="Addproducttocart(event);"></button>
    </a>
    `);
}

function addstarandratecount(product){
    let star = "";
    let i = 0;
    let amountstar = product[0].star;

    while (i < 5){
        if (i < amountstar) star += '<i class="fa fa-star"></i>';
        else star += '<i class="fa fa-star-o"></i>';
        i++;
    }

    let ratecount = product[0].rateCount;
    let ratecounttag = `<span class="ratecountdisplay">` + ratecount + " đánh giá" + `</span>`;
    star += ratecounttag;

    return star;
}

function writeprice(product){
    switch (product[0].promo.name){
        case "giareonline":
            return (`
                <strong>` + product[0].promo.value +  `đ</strong>
                <span>` + product[0].price + `đ<span>
            `);

        default:
            return (`
                <strong>` + product[0].price + `đ</strong>
            `)
    }
}

function writepromotag(product){
    let promo = product[0].promo.name;
    let promovalue = product[0].promo.value;

    if (promo == "") return "";
    return editpromotag(promo, promovalue);
}

function editpromotag(promo, value){
    switch (promo){
        case "moiramat":
            return "<label class='promotag moiramat'>Mới ra mắt</label>";
        case "tragop":
            return "<label class='promotag tragop'>Trả góp " + value + "%</label>";
        case "giareonline":
            return "<label class='promotag giareonl'>Giá rẻ online</label>";
        case "giamgia":
            return (`
                <label class='promotag giamgia'>
                    <i class="fa-solid fa-bolt"></i>
                    Giảm ` + value + `đ
                </label>
            `);
    }
}

function writeamountremain(amount, link){
    let productsect = document.getElementsByClassName("product-container")[frameindex];
    productsect.innerHTML += (`
        <a href="`+ link + `" class="see-all"></a>
    `)
    let seeallbutton = document.getElementsByClassName("see-all")[frameindex];
    seeallbutton.innerHTML += (`
         <h1>Xem tất cả <span>` + amount + `</span> sản phẩm</h1>
    `)
    frameindex++;
}

function getProductFrame(parentclassname){
    switch (parentclassname){
        case "product-hot":
            return producthot;
        case "new-product":
            return newproduct;
        case "sale-product-0":
            return saleproduct0;
        case "shock-price-online":
            return shockonlproduct;
        case "product-discount":
            return productdiscount;
        case "cheap-product":
            return cheapproduct;
        case "suggest-product":
            return randomproduct;
        default:
            return null;
    }
}

// ket thuc viet san pham //

// viet khung san pham cua trang chu //
function ReviewProduct(parentclassname, link = ""){
    let product = getProductFrame(parentclassname);
    let productremain = product.length >= 5 ? product.length - 5 : 0;
    for (let i = 0; i < 5; i++){
        if (!product[i]) break;
        writeproduct(product[i], parentclassname);
    }
    if (link != "") writeamountremain(productremain, link);
}

// KET THUC VIET SAN PHAM VA KHUNG //

// loc filter //
function splitlink(){
    let current = window.location.href.toString().split(/[?&]/);
    return current;
}

// tao path cho filter //
function getNewFilterPath(filtername){

    let current = splitlink();
    
    let newcurrent = "?";

    if (current.length == 1) return newcurrent;
    
    for (let i = 1; i < current.length; i++){
        let filterpath = current[i].split("=");
        if (filterpath[0].includes(filtername)) continue;
        
        newcurrent += current[i] + "&";
    }

    return newcurrent;
}

// xoa path filter //
function RemoveFilter(filtername){
    let current = splitlink();
    
    let newcurrent = "?";
    
    for (let i = 1; i < current.length; i++){
        let filterpath = current[i].split("=");
        if (filterpath[0].includes(filtername)) continue;

        newcurrent += current[i] + "&";
    }

    let ampersand_redundant_pos = newcurrent.length - 1;
    newcurrent = newcurrent[ampersand_redundant_pos] == "&" ? newcurrent.slice(0, ampersand_redundant_pos) : newcurrent;

    return newcurrent;
}

function writenoproduct(classname){
    let sect = document.getElementsByClassName(classname)[0];

    sect.innerHTML += (`
        <div class="noproduct-container">
            <h1 class="noproduct">Không tìm thấy sản phẩm</h1>
        </div>
    `)
}

function getSearchValue(){
    let value = document.getElementsByClassName("searchbar")[0].value;
    return value;
}

function Searching(e){
    if (e.keyCode === 13) Search();


    let value = getSearchValue().toLowerCase();
    let result_dropdown = document.getElementsByClassName("searchresult-dropdown")[0];

    if (!value){
        result_dropdown.style.display = "none";
        return;
    }
    
    getSearchProduct(value, "dropdown");
    result_dropdown.style.display = "grid";
}


function Search(){  
    let value = getSearchValue();
    if (!value) return;

    let search = document.getElementsByClassName("searchbutton")[0];

    search.click();
}

function getSearchProduct(value, type = "filter"){

    // ham nay co 2 dang la show product o phan tim kiem va lay product khi click search //
    // filter lay product, dropdown show product //

    let result_dropdown = document.getElementsByClassName("searchresult-dropdown")[0];
    result_dropdown.innerHTML = "";
    
    value = value.toLowerCase();
    
    if (type == "filter") value = getSearchFilterText(value);

    let searchproduct = [];

    for (let i = 0; i < arrayproduct.length; i++){
        let productname = arrayproduct[i][0].name.toLowerCase();
        if (!CompareCheck(value, productname)) continue;
        
        if (type == "filter") searchproduct.push(arrayproduct[i]);
        else if (type == "dropdown") addProducttoSearchDropDown(arrayproduct[i]);
    }
    
    getSearchPath(value);
    return searchproduct;
}

function CompareCheck(value, productname){

    // check ten vat pham co chua nhung chuoi la nhap khong //

    let input = value.split(" ");

    for (let i = 0; i < input.length; i++){
        if (!productname.includes(input[i])) return false;
    }

    return true;
}

function getSearchFilterText(filterdescription){
    //replace %20 thanh dau cach //
    return filterdescription.replace(new RegExp("%20", "g"), " ");
}

function addProducttoSearchDropDown(product){
    // show product o phan tim kiem (chua click tim kiem) //
    let result_dropdown = document.getElementsByClassName("searchresult-dropdown")[0];
    
    result_dropdown.innerHTML += (`
        <a href="chitietsanpham.html?` + product[0].masp + `" class="search-product">
            <span>` + product[0].name + `</span>
        </a>
    `)
}

function getSearchPath(value){
    let searchbutton = document.getElementsByClassName("searchbutton")[0];
    
    let path = "index.html?search=" + value;

    searchbutton.setAttribute("href", path);
}

function Addproducttocart(e){
    e.preventDefault();
    alert("wow");
    


    
}