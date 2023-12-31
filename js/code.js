// JS cho thuoc tinh chung //
getData();
setProductData(list_products);
setArrayAccounts();
setOrderData(JSON.stringify(list_orders));

function setThingsup(){
    addheader();
    addButtonToTop();
    addAlertBox();
    adjustProductCartAmount();
}

function getData(){
    list_products = getProductData() || list_products;
    list_orders = getOrderData() || list_orders;
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
            <a class="user-option-container">
                <i class="icon account user-option-effect"></i>
                Tài khoản 
            </a>
            <div class="menuUser hide">
                <a href="nguoidung.html"> Trang người dùng</a>
                <a onclick="if(window.confirm('Xác nhận đăng xuất ?')) logOut();">Đăng xuất</a>
            </div>
        </div>    
        <div class="cart">
            <a href="giohang.html" class="user-option-container">
                <i class="icon cart user-option-effect">
                    <span class="cart-number"></span>
                </i>
                <span>Giỏ hàng</span>
            </a>
        </div>
    </div>
<!-- For mobile -->
    <button class="mobile-menu" onclick="addMenu()">
        <i class="fa-solid fa-bars"></i>
    </button>
</section>
<div class="menu-sect">
    <div class="menu-container">
        <div class="menu">
            <div class="mobile searchbox">
                <input type="text" class="searchbar" onkeyup="Searching(event)" placeholder="Search">
                <a href="#" class="searchbutton">Tìm kiếm</a>
                <div class="searchresult-dropdown"></div>
            </div>
            <hr>
            <div class="mobile-user-option">
                <div class="user">
                    <a class="user-option-container">
                        <i class="icon account user-option-effect"></i>
                        Tài khoản 
                    </a>
                    <div class="menuUser hide">
                        <a href="nguoidung.html"> Trang người dùng</a>
                        <a onclick="if(window.confirm('Xác nhận đăng xuất ?')) logOut();">Đăng xuất</a>
                    </div>
                </div>    
                <div class="cart">
                    <a href="giohang.html" class="user-option-container">
                        <i class="icon cart user-option-effect">
                            <span class="cart-number"></span>
                        </i>
                        <span>Giỏ hàng</span>
                    </a>
                </div>
            </div>
            <hr>
            <div class="mobile-navigation-container">
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
                <hr>
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
            </div>
            <hr>
            <button class="close-menu" onclick="closeMenu()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    </div>
</div>
<!-- End Mobile Page -->
`);
}

// RESPONSIVE WEB //

function addMenu(){
    let menu = document.getElementsByClassName("menu-container")[0];
    menu.style.transform = "translateX(0)";

    let menusect = document.getElementsByClassName("menu-sect")[0];
    menusect.style.transform = "translateX(0)";
}

function closeMenu(){
    let menu = document.getElementsByClassName("menu-container")[0];
    menu.style.transform = "translateX(1500px)";
    
    setTimeout(() => {
        let menusect = document.getElementsByClassName("menu-sect")[0];
        menusect.style.transform = "translateX(1500px)";
    }, 200);
}

// Footer //

function addfooter(){
    document.body.innerHTML += (`
    <footer class="copy-right">
        <p><a href="index.html">LDD Phone Store</a> - All rights reserved <i class="fa-regular fa-copyright"></i> 2023 - Designed by
            <span style="color: whitesomke; font-weight: bold">group 16th</span></p>
    </footer>
    `)
}

// them button len dau trang //
function addButtonToTop(){
   document.body.innerHTML += '<button class="icon scrolltotop-button" onclick="totop()"></button>' 
}

function totop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// ket thuc phan button len dau trang //

// alert box khi lua chon //

function addAlertBox(){
    document.body.innerHTML += (`
        <div class="alert-box">
            <h2></h2>
        </div>
    `)
}

// CAC HAM DUNG CHUNG //

// VIET SAN PHAM VA KHUNG SAN PHAM //

// viet san pham //

function writeProduct(product, sectionclassname){
    let productcode = product.masp;
    let nameproduct =  product.name;
    let imgsrc = product.img;

    let productsect = document.getElementsByClassName(sectionclassname)[0];

    productsect.innerHTML += (`
    <a href="chitietsanpham.html?` + productcode + `" class="product">
        <img class="product-img" src="` + imgsrc + `" alt="` + productcode + `">
        ` + writePromoTag(product) + `
        <span class="product-name">` + nameproduct + `</span>
        <div class="product-price">` + 
            writePrice(product) +
        `</div>
        <div class="star-container">` + addStarAndRatecount(product) + `</div>
        <button class="addtocart-button icon" onclick="Addproducttocart(event, '` + productcode + `', '` + nameproduct + `');"></button>
    </a>
    `);
}

function addStarAndRatecount(product){
    let star = "";
    let i = 0;
    let amountstar = product.star;

    while (i < 5){
        if (i < amountstar) star += '<i class="fa fa-star"></i>';
        else star += '<i class="fa fa-star-o"></i>';
        i++;
    }

    let ratecount = product.rateCount;
    let ratecounttag = `<span class="ratecountdisplay">` + ratecount + " đánh giá" + `</span>`;
    star += ratecounttag;

    return star;
}

function writePrice(product){
    switch (product.promo.name){
        case "giareonline":
            return (`
                <strong>` + product.promo.value +  `đ</strong>
                <span>` + product.price + `đ<span>
            `);

        default:
            return (`
                <strong>` + product.price + `đ</strong>
            `)
    }
}

function writePromoTag(product){
    let promo = product.promo.name;
    let promovalue = product.promo.value;

    if (promo == "") return "";
    return editPromoTag(promo, promovalue);
}

function editPromoTag(promo, value){
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

function writeAmountRemain(amount, link){
    let productsect = document.getElementsByClassName("product-container")[frameindex];
    productsect.innerHTML += (`
        <a href="`+ link + `" class="see-all"></a>
    `)
    let seeallbutton = document.getElementsByClassName("see-all")[frameindex];
    seeallbutton.innerHTML += (`
         <h1>Xem thêm <span>` + amount + `</span> sản phẩm</h1>
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
        writeProduct(product[i], parentclassname);
    }
    if (link != "") writeAmountRemain(productremain, link);
}

// KET THUC VIET SAN PHAM VA KHUNG //

// loc filter //
function splitlink(){
    // lấy path hiện tại
    let current = window.location.href.toString().split(/[?&]/);
    return current;
}

// tao path cho filter //
function getNewFilterPath(filtername){

    let current = splitlink();
    
    // path lọc luôn có ? sau path mặc định
    let newcurrent = "?";

    // nếu path length sau khi split = 1 thì trả về ? + path lọc (làm ở phần home)
    if (current.length == 1) return newcurrent;
    
    for (let i = 1; i < current.length; i++){
        // tách tên và điều kiện lọc (price=0-2m => price và 0-2m)
        let filterpath = current[i].split("=");
        // check tồn tại điều kiện đã lọc
        if (filterpath[0].includes(filtername)) continue;
        
        // ghép chuỗi path mới
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

function writeNoProduct(classname){
    let sect = document.getElementsByClassName(classname)[0];

    sect.innerHTML += (`
        <div class="noproduct-container">
            <h1 class="noproduct">Không tìm thấy sản phẩm</h1>
        </div>
    `)
}

function Searching(e){
    // lấy cha của thanh search
    let searchbarsect = e.target.parentElement;


    let searchbarvalue = searchbarsect.getElementsByClassName("searchbar")[0].value;
    let searchbutton = searchbarsect.getElementsByClassName("searchbutton")[0];
    
    let value = searchbarvalue.toLowerCase();

    // ấn phím enter
    if (e.keyCode === 13) Search(searchbutton, value);

    // hiển thị drop down
    let result_dropdown = searchbarsect.getElementsByClassName("searchresult-dropdown")[0];

    if (!value){
        result_dropdown.style.display = "none";
        return;
    }
    
    getSearchProduct(value, "dropdown", result_dropdown);
    result_dropdown.style.display = "grid";
}


function Search(searchbutton, value){  
    if (!value) return;

    searchbutton.click();
}

function getSearchProduct(value, type = "filter", result_dropdown = null){

    // ham nay co 2 dang la show product o phan tim kiem (dropdown) va lay product khi click search //
    // filter lay product, dropdown show product //

    // làm mới dropdown
    if (result_dropdown) result_dropdown.innerHTML = "";
    
    value = value.toLowerCase();
    
    if (type == "filter") value = getSearchFilterText(value);

    let searchproduct = [];

    for (let i = 0; i < arrayproduct.length; i++){
        let productname = arrayproduct[i].name.toLowerCase();
        // check sản phẩm có chứa kí tự đã nhập không
        if (!CompareCheck(value, productname)) continue;
        
        if (type == "filter") searchproduct.push(arrayproduct[i]);
        else if (type == "dropdown") addProducttoSearchDropDown(arrayproduct[i], result_dropdown);
    }
    
    getSearchPath(value);
    return searchproduct;
}

function CompareCheck(value, productname){

    // check ten vat pham co chua nhung chuoi da nhap khong //

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

function addProducttoSearchDropDown(product, result_dropdown){
    // ghi sản phẩm đã tìm được vào phần dropdown
    // show product o phan tim kiem (chua click tim kiem) //
    
    result_dropdown.innerHTML += (`
        <a href="chitietsanpham.html?` + product.masp + `" class="search-product">
            <span>` + product.name + `</span>
        </a>
    `)
}

function getSearchPath(value){
    let searchbutton = document.getElementsByClassName("searchbutton")[0];
    
    // sửa path của button
    let path = "index.html?search=" + value; // search value = sa => search=sa

    searchbutton.setAttribute("href", path);
}

function Addproducttocart(e, productcode, name){
    e.preventDefault();
    
    themVaoGioHang(productcode, name);
    adjustProductCartAmount();
}

// tang so luong vat pham trong gio hang //

function adjustProductCartAmount(){
    var user = getCurrentUser();
    if ( user ){
        let cart_num = document.getElementsByClassName("cart-number");
        let amount = getProductCartAmount();
    
        for (let i = 0; i < 2; i++){
            cart_num[0].innerHTML = amount;
            cart_num[1].innerHTML = amount;
        }
    }
}

// thêm vào giỏ hàng
function animateCartNumber() {
    // Hiệu ứng cho icon giỏ hàng
    let cn = document.getElementsByClassName('cart-number')[0];
    cn.style.transform = 'scale(1.5)';
    cn.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    cn.style.color = 'white';
    setTimeout(function () {
        cn.style.transform = 'scale(1)';
        cn.style.backgroundColor = 'transparent';
        cn.style.color = 'red';
    }, 1200);
}

function themVaoGioHang(masp, name) {
    var user = getCurrentUser();
    var cartNumer = document.getElementsByClassName('cart-number')[0];


    if (!user) {
        alert('Bạn cần đăng nhập để mua hàng !');
        return;
    }
    if (user.isLocked) {
        addAlertBox('Tài khoản của bạn đã bị khóa bởi Admin.', '#aa0000', '#fff', 10000);
        return;
    }
    var t = new Date();
    var daCoSanPham = false;;

    for (var i = 0; i < user.products.length; i++) { // check trùng sản phẩm
        if (user.products[i].ma == masp) {
            user.products[i].soluong++;
            daCoSanPham = true;
            break;
        }
    }

    if (!daCoSanPham) { // nếu không trùng thì mới thêm sản phẩm vào user.products
        user.products.push({
            "ma": masp,
            "soluong": 1,
            "date": t
        });
    }

    animateCartNumber();
    editAlertBox('Đã thêm ' + name + ' vào giỏ.', 'rgba(23, 198, 113, 0.749)', '#fff', 3500);

    setCurrentUser(user); // cập nhật giỏ hàng cho user hiện tại
    updateListUser(user); // cập nhật list user
    capNhat_ThongTin_CurrentUser(); // cập nhật giỏ hàng
}

function editAlertBox(text, bgcolor, textcolor, time) {
    let al = document.getElementsByClassName('alert-box')[0];

    let altext = al.querySelector("h2");
    altext.innerHTML = text;

    al.style.backgroundColor = bgcolor;
    al.style.opacity = 1;
    al.style.zIndex = 200;

    if (textcolor) al.style.color = textcolor;
    if (time)
        setTimeout(function () {
            al.style.opacity = 0;
            al.style.zIndex = 0;
        }, time);
}

// Đảo ngược chuỗi //
function ReverseString(str){
    // tách, đảo ngược, ghép //
    return str.split('').reverse().join('');
}
