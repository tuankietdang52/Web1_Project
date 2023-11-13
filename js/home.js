// Slideshow by owl library //

let frameindex = 0;
let producthot = [];
let newproduct = [];

function getData(){
    getProductHot();
    getNewProduct();
}

function getProductHot(){;
    producthot = sortbyratecount("desc");
    for (let i = 0; i < producthot.length; i++){
        if (producthot[i][0].star <= 2){
            producthot.splice(i, 1);
            i--;
        }
    }
}

function getNewProduct(){
    newproduct = sortnewproduct();
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

function writeamountofitemframe(amount, link = '#'){
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

function ReviewProductHot(){
    let producthotremain = producthot.length - 5;
    for (let i = 0; i < 5; i++){
        if (!producthot[i]) break;
        writeproduct(i, producthot, "product-hot");
    }
    writeamountofitemframe(producthotremain);
}

function ReviewNewProduct(){
    let newproductremain = newproduct.length >= 5 ? newproduct.length - 5 : 0;
    for (let i = 0; i < 5; i++){
        if (!newproduct[i]) break;
        writeproduct(i, newproduct, "new-product");
    }
    writeamountofitemframe(newproductremain);
}