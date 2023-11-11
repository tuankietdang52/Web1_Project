// Slideshow by owl library //

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
    let productshot = sortbyratecount("desc");
    for (let i = 0; i < productshot.length; i++){
        console.log(productshot[i]);
        console.log("\n\n\n\n");
    }
}