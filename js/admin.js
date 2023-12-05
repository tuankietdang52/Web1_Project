getData();
setProductData(list_products);
setListUser(list_accounts);

window.onload = function(){
    let defaultcontent = document.getElementsByClassName("chart-content-sect")[0];

    defaultcontent.style.display = "grid";
}

function getData(){
    list_products = getProductData() || list_products;
    list_accounts = getListUser() || list_accounts;
}

function Menuchange(clickelement, content){
    if (clickelement.className == "active") return;

    let menu = document.getElementsByClassName("menu")[0];

    for (let i = 0; i < menu.children.length; i++){
        if (menu.children[i].className == "active"){
            menu.children[i].className = "nonactive";
        }
    }

    clickelement.className = "active";
    changeContent(content);
}

function changeContent(content){
    switch (content){
        case "thongke":
            adjustDisplay("chart-content-sect");
            break;
        case "sanpham":
            adjustDisplay("product-content-sect");
            break;
        case "donhang":
            adjustDisplay("order-content-sect");
            break;
        case "khachhang":
            adjustDisplay("customer-content-sect");
            break;
    }
}

function adjustDisplay(section){
    let contentsect = document.getElementsByClassName("main-content-container")[0];
    let showcontent = document.getElementsByClassName(section)[0];

    for (let i = 0; i < contentsect.children.length; i++){
        contentsect.children[i].style.display = "none";
    }

    showcontent.style.display = "flex";
}

function writeProduct(product, index){
    let productsect = document.getElementsByClassName("product-data-container")[0];

    let productcode = product[0].masp;
    let productname = product[0].name;
    let productprice = product[0].price;
    let productpromo = [product[0].promo.name, product[0].promo.value];

    let promotext = getPromoText(productpromo[0], productpromo[1]);

    productsect.innerHTML += (`
        <div class="product-data">
            <div class="number">
                <span>${index}</span>
            </div>
            <div class="product-code">
                <span>${productcode}</span>
            </div>
            <a href="chitietsanpham.html?${productcode}" target="_blank" class="product-name">
                <span>${productname}</span>
            </a>
            <div class="product-price">
                <span>${productprice}</span>
            </div>
            <div class="product-promo">
                <span>${promotext}</span>
            </div>
            <div class="action">
                <button class="adjust-button" onclick="adjustProduct('${productcode}')">
                    <i class="fa-solid fa-wrench"></i>
                </button>
                <button class="remove-button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    `)
}

function closeChangeTab(){
    let changesect = document.getElementsByClassName("change-container")[0];
    changesect.style.transform = "scale(0)";

    changesect.innerHTML = (`
        <button class="close" onclick="closeChangeTab()">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `);
}

function writeListProduct(){
    for (let i = 0; i < arrayproduct.length; i++){
        writeProduct(arrayproduct[i], i + 1);
    }
}

function getPromoText(promoname, promovalue){
    switch (promoname){
        case "giareonline":
            return `Giá rẻ online (${promovalue})`;
        case "giamgia":
            return `Giảm ${promovalue}`;
        case "tragop":
            return `Trả góp ${promovalue}%`
        default:
            return "";
    }
}

function adjustProduct(productcode){
    let adjustproduct = findbyproductcode(productcode);

    let changesect = document.getElementsByClassName("change-container")[0];

    changesect.style.transform = "scale(1)";
    
    changesect.innerHTML += (`
       <div class="product-change-container">
            <div class="product-title"><h1>${adjustproduct[0].name}</h1></div>
       </div>
    `);
    
}