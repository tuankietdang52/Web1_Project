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