class Product{
    constructor(name, company, img, price, star, rateCount, promo, detail, masp){
        this.name = name;
        this.company = company;
        this.img = img;
        this.price = price;
        this.star = star;
        this.rateCount = rateCount;
        this.promo = promo;
        this.detail = detail;
        this.masp = masp; 
    }  
}

let arrayproduct = [];
let arrayaccounts = [];


function setArrayProducts(){
    if (list_products.length <= 0) return;
    for (let i = 0; i < list_products.length; i++){
        let product = new Product(list_products[i].name, list_products[i].company, list_products[i].img, list_products[i].price, list_products[i].star, list_products[i].rateCount, list_products[i].promo, list_products[i].detail, list_products[i].masp);
        arrayproduct.push([product]);
    }
}