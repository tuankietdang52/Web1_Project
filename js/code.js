// JS cho thuoc tinh chung //

function setThingsup(){
    setProductData(list_products);
    getData();
    
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
            <input type="text" class="searchbar" placeholder="Search">
            <button class="searchbutton">Tìm kiếm</button>
        </div>
        <div class="keyword"><span>Từ khóa:</span> 
            <li><a href="#">Samsung</a></li>
            <li><a href="#">Iphone</a></li>
            <li><a href="#">Huawei</a></li>
            <li><a href="#">Oppo</a></li>
            <li><a href="#">Xiaomi</a></li>
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