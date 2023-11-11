function getProductData(){
    return JSON.parse(window.localStorage.getItem("ListProducts"));
}

function setProductData(newdata){
    if(newdata) newdata = JSON.parse(newdata);
    list_products = newdata || list_products;
    let newlistproducts = list_products;
    window.localStorage.setItem("ListProducts", newlistproducts);
    setArrayProducts();
}

function getAccountData(){
    return JSON.parse(window.localStorage.getItem("ListAccounts"));
}

function setAccountData(newdata){
    if(newdata) newdata = JSON.parse(newdata);
    list_accounts = newdata || list_accounts;
    let newlistaccounts = list_accounts;
    window.localStorage.setItem("ListAccounts", newlistaccounts);
    setArrayAccounts();
}

function checkAdmin(account){
    if (account != admin) return false;
    else return true;
}