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
    window.localStorage.setItem("ListProducts", list_products);
    setArrayProducts();
}

function getAccountData(){
    return JSON.parse(window.localStorage.getItem("ListAccounts"));
}

function setAccountData(newdata = null){
    if(!newdata) return;
    try{
        newdata = JSON.parse(newdata);
    }
    catch(e){
        console.log(e);
    }
    
    list_accounts = newdata || list_accounts;
    window.localStorage.setItem("ListAccounts", list_accounts);
    setArrayAccounts();
}

function checkAdmin(account){
    if (account != admin) return false;
    else return true;
}

function setArrayProducts(){
    if (list_products.length <= 0) return;
    for (let i = 0; i < list_products.length; i++){
        let promo = new Promo(list_products[i].promo.name, list_products[i].promo.value);
        let product = new Product(list_products[i].name, list_products[i].company, list_products[i].img, list_products[i].price, list_products[i].star, list_products[i].rateCount, promo, list_products[i].detail, list_products[i].masp);
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