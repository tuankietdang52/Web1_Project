function getProductData(){
    return JSON.parse(window.localStorage.getItem("ListProducts"));
}

function setProductData(newdata = null){
    if(!newdata) return;
    try{
        newdata = JSON.parse(newdata);
    }
    catch(e){console.log(e)}

    list_products = newdata || list_products;
    window.localStorage.setItem("ListProducts", JSON.stringify(list_products));
    setArrayProducts();
}

function checkAdmin(account){
    if (account != admin) return false;
    else return true;
}

function setArrayProducts(){
    if (list_products.length <= 0) return;
    for (let i = 0; i < list_products.length; i++){
        let promo = new Promo(list_products[i].promo.name, list_products[i].promo.value);
        let detail = new Detail(list_products[i].detail.screen, list_products[i].detail.os, list_products[i].detail.camera, list_products[i].detail.cameraFront, list_products[i].detail.cpu, list_products[i].detail.ram, list_products[i].detail.rom, list_products[i].detail.microUSB, list_products[i].detail.battery)
        let product = new Product(list_products[i].name, list_products[i].company, list_products[i].img, list_products[i].price, list_products[i].star, list_products[i].rateCount, promo, detail, list_products[i].masp);
        arrayproduct.push([product]);
    }
}

function setArrayAccounts(){
    if (list_accounts.length <= 0) return;
    for (let i = 0; i < list_accounts.length; i++){
        arrayaccounts.push([product]);
    }
}


// dung sau //
function checkpromoprice(product, promoname){
    switch (promoname){
        case "giamgia":
            return product[0].numprice - product[0].promovaluenum;
        case "giareonline":
            return product[0].promo.value;
        default:
            return -1;
    }
}
// get set data của admin
function getListAdmin(){
    return JSON.parse(window.localStorage.getItem('ListAdmin'));
}
function setListAdmin(l) {
    window.localStorage.setItem('ListAdmin', JSON.stringify(l));
}


// Get data của user ( list user )
// Hàm get set cho người dùng đã login vào trang
function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser'));  //Lấy dữ liệu từ localstorage
}

function setCurrentUser(user) {
    window.localStorage.setItem('CurrentUser', JSON.stringify(user));
}

// Hàm get set cho người dùng
function getListUser(){
    var data = JSON.parse(window.localStorage.getItem('ListUser')) || []
    var l = [] ;
    for ( var d of data ){
        l.push(d);
    }
    return l;
}

function setListUser(l) {
    window.localStorage.setItem('ListUser', JSON.stringify(l));
}