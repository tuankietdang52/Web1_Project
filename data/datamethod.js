// PRODUCT DATA //

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

function setArrayProducts(){
    if (list_products.length <= 0) return;

    for (let i = 0; i < list_products.length; i++){
        let promo = new Promo(
                            list_products[i].promo.name, 
                            list_products[i].promo.value
                        );

        let detail = new Detail(
                            list_products[i].detail.screen, 
                            list_products[i].detail.os, 
                            list_products[i].detail.camera, 
                            list_products[i].detail.cameraFront, 
                            list_products[i].detail.cpu, 
                            list_products[i].detail.ram, 
                            list_products[i].detail.rom, 
                            list_products[i].detail.microUSB, 
                            list_products[i].detail.battery
                        );
        
        let product = new Product(
                            list_products[i].name, 
                            list_products[i].company, 
                            list_products[i].img, 
                            list_products[i].price, 
                            list_products[i].star, 
                            list_products[i].rateCount, 
                            promo, 
                            detail, 
                            list_products[i].masp
                        );
        
        arrayproduct.push([product]);
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

//  ACCOUNT //

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
    setArrayAccounts();
}

function setArrayAccounts(){
    let userdata = getListUser();

    for (let i = 0; i < userdata.length; i++){
        let user = new User(userdata[i].username, userdata[i].pass, userdata[i].ho, userdata[i].ten, userdata[i].email, userdata[i].products, userdata[i].donhang);
        arrayaccounts.push(user);
    }
}

function checkNameLength(name){
    if (name.length < 5) return name;

    let newname = "";
    
    for (let i = 0; i < 5; i++){
        newname += name[i];
    }

    newname += "...";

    return newname;
}

function capNhat_ThongTin_CurrentUser() {

    var u = getCurrentUser();

    //  Get the menuUser element
    var menuUser = document.getElementsByClassName('menuUser')[0];

    if (u) {
        var userElement = document.getElementsByClassName('user')[0];
        var mobile_userElement = document.getElementsByClassName('user')[1];

        let name = checkNameLength(u.username);

        if (userElement) {
            
            var usernameNode = userElement.getElementsByTagName('a')[0].childNodes[2];
            var mobile_usernameNode = mobile_userElement.getElementsByTagName('a')[0].childNodes[2];

            if (usernameNode) {
                usernameNode.nodeValue = ' ' + name;
            }

            if (mobile_usernameNode) {
                mobile_usernameNode.nodeValue = ' ' + name;
            }

            //  Hiển thị menu người dùng
            menuUser.style.display = 'block';
        }
    } else if (menuUser) {
        //  User is not logged in, ẩn menu người dùng
        menuUser.style.display = 'none';
    }
}

// DON HANG //

function getOrderData(){
    let data = JSON.parse(window.localStorage.getItem("ListOrders"));
    if (!data) return [];
    for (let i = 0; i < data.length; i++){
        //  Lấy thông tin sản phẩm
        data[i].sp = findbyproductcode(data[i].masp, arrayproduct);
    }

    return data;
}

function setOrderData(newdata = null){
    if(!newdata) return;
    try{
        newdata = JSON.parse(newdata);
    }
    catch(e){console.log(e)}

    dataOrder = newdata || dataOrder;
    window.localStorage.setItem("ListOrders", JSON.stringify(dataOrder));
}

// random ma don hang //

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomOrderCode() {
    let result = "";
    const charactersLength = characters.length;
    for ( let i = 0; i < 7; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function saveOrderDataForUser(order){
    let user = findUserByUsername(order.user);
    
    for (let i = 0; i < user.donhang.length; i++){
        if (order.madonhang != user.donhang[i].madonhang) continue;

        user.donhang[i].tinhTrang = order.tinhtrang;
    }

    setListUser(arrayaccounts);
}
