// Slideshow by owl library //

let producthot = [];

$(document).ready(function(){
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
  });

function getProductHot(){
    producthot = sortbyratecount("desc");
}

function ReviewProductHot(){
    getProductHot();
    for (let i = 0; i < 5; i++){
        if (!producthot[i]) return;
        writeproduct(i, producthot);
    }
}

function writeproduct(index, productlist){
    let productcode = productlist[index][0].masp;
    let nameproduct = productlist[index][0].name;
    let productprice = productlist[index][0].price;
    let imgsrc = productlist[index][0].img;
    let producthotsect = document.getElementsByClassName("product-hot")[0];
    producthotsect.innerHTML += (`
    <a href="#" class="product">
        <img class="product-img" src="` + imgsrc + `" alt="` + productcode + `">
        <span class="product-name">` + nameproduct + `</span>
        <p class="product-price">` + productprice + `đ</p>
        <div class="star-container"></div>
        <button class="addtocart-button icon"></button>
    </a> 
    `);
}