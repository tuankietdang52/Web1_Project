// Slideshow by owl library //

let frameindex = 0;
let producthot = [];
let newproduct = [];
let saleproduct0 = [];
let shockonlproduct = [];
let productdiscount = [];
let cheapproduct = [];

function getData(){
    getProductHot();
    getNewProduct();
    getSaleProduct0();
    getShockOnlProduct();
    getDiscountProduct();
    getCheapProduct();
}

function getProductHot(){;
    producthot = sortbyamountstar(2);
    producthot = sortbyratecount("desc", producthot);
}

function getNewProduct(){
    newproduct = sortpromoproduct("moiramat");
}

function getSaleProduct0(){
    saleproduct0 = sortpromoproduct("tragop");
}

function getShockOnlProduct(){
    shockonlproduct = sortpromoproduct("giareonline");
}

function getDiscountProduct(){
    productdiscount = sortpromoproduct("giamgia");
}

function getCheapProduct(){
    cheapproduct = sortbyamountprice(3000000, "below");
}

$(document).ready(function(){
    slideshowowl();
});

function slideshowowl(){
    let owl = $('.owl-carousel');
	owl.owlCarousel({
		items: 1.5,
		margin: 100,
		center: true,
		loop: true,
		smartSpeed: 450,
		autoplay: true,
		autoplayTimeout: 3500,
        responsiveClass: true,
        responsive:{
            100:{
                items: 1,
            },

            1400:{
                item: 1.5,
            },
        }
	});
}

function writeproduct(index, product, sectionclassname){
    let productcode = product[index][0].masp;
    let nameproduct =  product[index][0].name;
    let imgsrc = product[index][0].img;
    let amountstar = product[index][0].star;
    let promo = product[index][0].promo.name;
    let promovalue = product[index][0].promo.value;


    let productsect = document.getElementsByClassName(sectionclassname)[0];


    productsect.innerHTML += (`
    <a href="#" class="product">
        <img class="product-img" src="` + imgsrc + `" alt="` + productcode + `">
        ` + writepromotag(promo, promovalue) + `
        <span class="product-name">` + nameproduct + `</span>
        <div class="product-price">` + 
            writeprice(product[index]) +
        `</div>
        <div class="star-container">` + addstarandratecount(amountstar, product[index]) + `</div>
        <button class="addtocart-button icon"></button>
    </a>
    `);
}

function addstarandratecount(amount, product){
    let star = "";
    let i = 0;
    while (i < 5){
        if (i < amount) star += '<i class="fa fa-star"></i>';
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

function writepromotag(promo, value){
    if (promo == "") return "";
    return editpromotag(promo, value);
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

function writeamountremain(amount, link = '#'){
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
        default:
            return null;
    }
}

function ReviewProduct(parentclassname){
    let product = getProductFrame(parentclassname);
    let productremain = product.length >= 5 ? product.length - 5 : 0;
    for (let i = 0; i < 5; i++){
        if (!product[i]) break;
        writeproduct(i, product, parentclassname);
    }
    writeamountremain(productremain);
}