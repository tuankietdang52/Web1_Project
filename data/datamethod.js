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
        newdata = newdata;
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
        let product = new Product(list_products[i].name, list_products[i].company, list_products[i].img, list_products[i].price, list_products[i].star, list_products[i].rateCount, list_products[i].promo, list_products[i].detail, list_products[i].masp);
        arrayproduct.push([product]);
    }
}

function writeproduct(index, productlist, sectionclassname){
    let productcode = productlist[index][0].masp;
    let nameproduct = productlist[index][0].name;
    let productprice = productlist[index][0].price;
    let imgsrc = productlist[index][0].img;
    let amountstar = productlist[index][0].star;

    let productsect = document.getElementsByClassName(sectionclassname)[0];
    

    productsect.innerHTML += (`
    <a href="#" class="product">
        <img class="product-img" src="` + imgsrc + `" alt="` + productcode + `">
        <span class="product-name">` + nameproduct + `</span>
        <p class="product-price">` + productprice + `đ</p>
        <div class="star-container">` + addstarandratecount(index, amountstar, productlist) + `</div>
        <button class="addtocart-button icon"></button>
    </a> 
    `);
}

function addstarandratecount(index, amount, productlist){
    let star = "";
    let i = 0;
    while (i < 5){
        if (i < amount) star += '<i class="fa fa-star"></i>';
        else star += '<i class="fa fa-star-o"></i>';
        i++;
    }

    let ratecount = productlist[index][0].rateCount;
    let ratecounttag = `<span class="ratecountdisplay">` + ratecount + " đánh giá" + `</span>`;
    star += ratecounttag;

    return star;
}