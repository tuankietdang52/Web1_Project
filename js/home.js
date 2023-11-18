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

// VIET SAN PHAM VAO HTML //

function writeproduct(product, sectionclassname){
    let productcode = product[0].masp;
    let nameproduct =  product[0].name;
    let imgsrc = product[0].img;

    let productsect = document.getElementsByClassName(sectionclassname)[0];

    productsect.innerHTML += (`
    <a href="#" class="product">
        <img class="product-img" src="` + imgsrc + `" alt="` + productcode + `">
        ` + writepromotag(product) + `
        <span class="product-name">` + nameproduct + `</span>
        <div class="product-price">` + 
            writeprice(product) +
        `</div>
        <div class="star-container">` + addstarandratecount(product) + `</div>
        <button class="addtocart-button icon"></button>
    </a>
    `);
}

function addstarandratecount(product){
    let star = "";
    let i = 0;
    let amountstar = product[0].star;

    while (i < 5){
        if (i < amountstar) star += '<i class="fa fa-star"></i>';
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

function writepromotag(product){
    let promo = product[0].promo.name;
    let promovalue = product[0].promo.value;

    if (promo == "") return "";
    return editpromotag(promo, promovalue);
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

// KET THUC VIET SAN PHAM //

// viet khung san pham cua trang chu //
function ReviewProduct(parentclassname){
    let product = getProductFrame(parentclassname);
    let productremain = product.length >= 5 ? product.length - 5 : 0;
    for (let i = 0; i < 5; i++){
        if (!product[i]) break;
        writeproduct(product[i], parentclassname);
    }
    writeamountremain(productremain);
}

// viet filter cua cong ty vao html //
function companyfilter(){

    let splitchar = getNewFilterPath("company");

    let filercontainer = document.getElementsByClassName("company-filter-container")[0];

    filercontainer.innerHTML += (`
        <a class="company iphone" href="` + splitchar + `company=apple">
            <img src="../img/company/Apple.jpg" alt="apple">
        </a>
        <a class="company samsung" href="` + splitchar + `company=samsung">
            <img src="../img/company/Samsung.jpg" alt="samsung">
        </a>
        <a class="company huawei" href="` + splitchar + `company=huawei">
            <img src="../img/company/Huawei.jpg" alt="huawei">
        </a>
        <a class="company oppo" href="` + splitchar + `company=oppo">
            <img src="../img/company/Oppo.jpg" alt="oppo">
        </a>
        <a class="company xiaomi" href="` + splitchar + `company=xiaomi">
            <img src="../img/company/Xiaomi.png" alt="xiaomi">
        </a>
    `)
}

//viet filter vao html//
function writecustomfilter(){
    let bfpricehref = getNewFilterPath("price");
    let bfsalehref = getNewFilterPath("promo");
    let bfstarhref = getNewFilterPath("star");
    let bfsorthref = getNewFilterPath("sort");

    let fitersect = document.getElementsByClassName("custom-filter-container")[0];

    fitersect.innerHTML += (`
        <div class="filter price">
            <div class="filter-box">
                <span class="filter-box-txt">Giá tiền  </span>
            </div>
            <div class="filter-choice">
                <a href="` + bfpricehref + `price=0-2m"><div><span>Dưới 2 triệu</span></div></a>
                <a href="` + bfpricehref + `price=2m-4m"><div><span>Từ 2 đến 4 triệu</span></div></a>
                <a href="` + bfpricehref + `price=4m-7m"><div><span>Từ 4 đến 7 triệu</span></div></a>
                <a href="` + bfpricehref + `price=7m-13m"><div><span>Từ 7 đến 13 triệu</span></div></a>
                <a href="` + bfpricehref + `price=>13m"><div><span>Trên 13 triệu</span></div></a>
            </div>
        </div>
        <div class="filter sale">
            <div class="filter-box">
                <span class="filter-box-txt">Khuyến mãi  </span>
            </div>
            <div class="filter-choice">
                <a href="` + bfsalehref + `promo=discount"><div><span>Giảm giá</span></div></a>
                <a href="` + bfsalehref + `promo=installment"><div><span>Trả góp</span></div></a>
                <a href="` + bfsalehref + `promo=newproduct"><div><span>Mới ra mắt</span></div></a>
                <a href="` + bfsalehref + `promo=cheaponl"><div><span>Giá rẻ online</span></div></a>
            </div>
        </div>
        <div class="filter star">
            <div class="filter-box">
                <span class="filter-box-txt">Số lượng sao  </span>
            </div>
            <div class="filter-choice">
                <a href="` + bfstarhref + `star=2-5"><div><span>Trên 2 sao</span></div></a>
                <a href="` + bfstarhref + `star=3-5"><div><span>Trên 3 sao</span></div></a>
                <a href="` + bfstarhref + `star=4-5"><div><span>Trên 4 sao</span></div></a>
            </div>
        </div>
        <div class="filter sort">
            <div class="filter-box">
                <span class="filter-box-txt">Sắp xếp </span>
            </div>
            <div class="filter-choice">
                <a href="` + bfsorthref + `sort=priceasc"><div><span>Giá tăng dần</span></div></a>
                <a href="` + bfsorthref + `sort=pricedesc"><div><span>Giá giảm dần</span></div></a>
                <a href="` + bfsorthref + `sort=starasc"><div><span>Sao tăng dần</span></div></a>
                <a href="` + bfsorthref + `sort=stardesc"><div><span>Sao giảm dần</span></div></a>
                <a href="` + bfsorthref + `sort=a-z"><div><span>Tên A-Z</span></div></a>
                <a href="` + bfsorthref + `sort=z-a"><div><span>Tên Z-A</span></div></a>
            </div>
        </div>
    `)
}