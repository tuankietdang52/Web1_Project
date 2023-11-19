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

function writeamountremain(amount, link){
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
function ReviewProduct(parentclassname, link = "#"){
    let product = getProductFrame(parentclassname);
    let productremain = product.length >= 5 ? product.length - 5 : 0;
    for (let i = 0; i < 5; i++){
        if (!product[i]) break;
        writeproduct(product[i], parentclassname);
    }
    writeamountremain(productremain, link);
}

// viet filter cua cong ty vao html //
function companyfilter(){

    let companyhref = getNewFilterPath("company");

    let filercontainer = document.getElementsByClassName("company-filter-container")[0];

    filercontainer.innerHTML += (`
        <a class="company iphone" href="` + companyhref + `company=Apple">
            <img src="../img/company/Apple.jpg" alt="apple">
        </a>
        <a class="company samsung" href="` + companyhref + `company=Samsung">
            <img src="../img/company/Samsung.jpg" alt="samsung">
        </a>
        <a class="company huawei" href="` + companyhref + `company=Huawei">
            <img src="../img/company/Huawei.jpg" alt="huawei">
        </a>
        <a class="company oppo" href="` + companyhref + `company=Oppo">
            <img src="../img/company/Oppo.jpg" alt="oppo">
        </a>
        <a class="company xiaomi" href="` + companyhref + `company=Xiaomi">
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
                <a href="` + bfpricehref + `price=above13m"><div><span>Trên 13 triệu</span></div></a>
            </div>
        </div>
        <div class="filter sale">
            <div class="filter-box">
                <span class="filter-box-txt">Khuyến mãi  </span>
            </div>
            <div class="filter-choice">
                <a href="` + bfsalehref + `promo=giamgia"><div><span>Giảm giá</span></div></a>
                <a href="` + bfsalehref + `promo=tragop"><div><span>Trả góp</span></div></a>
                <a href="` + bfsalehref + `promo=moiramat"><div><span>Mới ra mắt</span></div></a>
                <a href="` + bfsalehref + `promo=giareonline"><div><span>Giá rẻ online</span></div></a>
            </div>
        </div>
        <div class="filter star">
            <div class="filter-box">
                <span class="filter-box-txt">Số lượng sao  </span>
            </div>
            <div class="filter-choice">
                <a href="` + bfstarhref + `star=2"><div><span>Trên 2 sao</span></div></a>
                <a href="` + bfstarhref + `star=3"><div><span>Trên 3 sao</span></div></a>
                <a href="` + bfstarhref + `star=4"><div><span>Trên 4 sao</span></div></a>
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
                <a href="` + bfsorthref + `sort=rateasc"><div><span>Đánh giá tăng dần</span></div></a>
                <a href="` + bfsorthref + `sort=ratedesc"><div><span>Đánh giá giảm dần</span></div></a>
                <a href="` + bfsorthref + `sort=a-z"><div><span>Tên A-Z</span></div></a>
                <a href="` + bfsorthref + `sort=z-a"><div><span>Tên Z-A</span></div></a>
            </div>
        </div>
    `)
}

// trang index khi co filter //
function clearproductframe(){
    let productcontainer = document.getElementsByClassName("product-sect")[0];
    productcontainer.style.display = "none";

}

function writefiltersect(){
    if (splitlink().length <= 1) return;

    clearproductframe();

    let filterproductsect = document.getElementsByClassName("filter-product-sect")[0];
    let filterbuttonsect = document.getElementsByClassName("filter-button-container")[0];

    filterproductsect.style.display = "grid";
    filterbuttonsect.style.display = "flex";
    writerfilterproduct();
}

function writerfilterproduct(){
    let filterproduct = getFilterProduct();

    if (filterproduct.length == 0) writenoproduct("filter-product-sect");


    for (let i = 0; i < filterproduct.length; i++){
        writeproduct(filterproduct[i], "filter-product");
    }
}

function getFilterProduct(){
    let current = splitlink();

    let filterproduct = arrayproduct;

    for (let i = 1; i < current.length; i++){
        filterproduct = filter(current[i], filterproduct);
    }

    return filterproduct;
}

function filter(filterpath, filterproduct){
    let filterpathsplit = filterpath.split("=");
    let filtertype = filterpathsplit[0];
    let filterdescription = filterpathsplit[1];
    writeFilterButton(filtertype, filterdescription);

    switch (filtertype){
        case "company":
            return getFilterCompany(filterdescription, filterproduct);
        case "price":
            return getFilterPrice(filterdescription, filterproduct);
        case "promo":
            return getFilterPromo(filterdescription, filterproduct);
        case "star":
            return getFilterStar(filterdescription, filterproduct);
        case "sort":
            return getFilterSort(filterdescription, filterproduct);
    }
}

function writeFilterButton(filtertype, filterdescription){
    let removepath = splitlink().length <= 2 ? "index.html" : RemoveFilter(filtertype);

    let filterbuttonsect = document.getElementsByClassName("filter-button-container")[0];

    let text = getFilterText(filtertype, filterdescription);

    filterbuttonsect.innerHTML += (`
        <a href="` + removepath + `" class="filter-button">
            <span>` + text + `</span>
            <i class="fa-solid fa-x"></i>
        </a>
    `)
}

function getFilterText(filtertype, filterdescription){
    switch (filtertype){
        case "company":
            return filterdescription;
        case "price":
            return getPriceFilterText(filterdescription);
        case "promo":
            return getPromoFilterText(filterdescription);
        case "star":
            return getStarFilterText(filterdescription);
        case "sort":
            return getSortFilterText(filterdescription);
    }
}

function getPriceFilterText(filterdescription){
    switch (filterdescription){
        case "0-2m":
            return "Dưới 2 triệu";
        case "2m-4m":
            return "Từ 2 triệu đến 4 triệu";
        case "4m-7m":
            return "Từ 4 triệu đến 7 triệu";
        case "7m-13m":
            return "Từ 7 triệu đến 13 triệu";
        case "above13m":
            return "Trên 13 triệu";
    }
}

function getPromoFilterText(filterdescription){
    switch (filterdescription){
        case "giamgia":
            return "Giảm giá";
        case "tragop":
            return "Trả góp";
        case "moiramat":
            return "Mới ra mắt";
        case "giareonline":
            return "Giá rẻ online";
    }
}

function getStarFilterText(filterdescription){
    switch (filterdescription){
        case "2":
            return "Trên 2 sao";
        case "3":
            return "Trên 3 sao";
        case "4":
            return "Trên 4 sao";
    }
}

function getSortFilterText(filterdescription){
    switch (filterdescription){
        case "priceasc":
            return "Giá tăng dần";
        case "pricedesc":
            return "Giá giảm dần";
        case "starasc":
            return "Sao tăng dần";
        case "stardesc":
            return "Sao giảm dần";
        case "rateasc":
            return "Đánh giá tăng dần";
        case "ratedesc":
            return "Đánh giá giảm dần";
        case "a-z":
            return "A-Z";
        case "z-a":
            return "Z-A";
    }
}

function getFilterCompany(filterdescription, filterproduct){
    return sortbycompany(filterdescription, filterproduct);
}

function getFilterPrice(filterdescription, filterproduct){
    switch (filterdescription){
        case "0-2m":
            return sortbyamountprice(2000000, "below", filterproduct);
        case "2m-4m":
            return sortbyamountprice(2000000, "mintomax", filterproduct, 4000000);
        case "4m-7m":
            return sortbyamountprice(4000000, "mintomax", filterproduct, 7000000);
        case "7m-13m":
            return sortbyamountprice(7000000, "mintomax", filterproduct, 13000000);
        case "above13m":
            return sortbyamountprice(13000000, "above", filterproduct);
    }
}

function getFilterPromo(filterdescription, filterproduct){
    return sortpromoproduct(filterdescription, filterproduct);
}

function getFilterStar(filterdescription, filterproduct){
    let staramount = parseInt(filterdescription);
    return sortbyamountstar(staramount, filterproduct);
}

function getFilterSort(filterdescription, filterproduct){
    switch(filterdescription){
        case "priceasc":
            return sortbyprice("asc", filterproduct);
        case "pricedesc":
            return sortbyprice("desc", filterproduct);
        case "starasc":
            return sortbystar("asc", filterproduct);
        case "stardesc":
            return sortbystar("desc", filterproduct);
        case "rateasc":
            return sortbyratecount("asc",filterproduct);
        case "ratedesc":
            return sortbyratecount("desc",filterproduct);
        case "a-z":
            return sortbyname("asc", filterproduct);
        case "z-a":
            return sortbyname("desc", filterproduct); 
    }
}