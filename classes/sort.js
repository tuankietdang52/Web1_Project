function sortbyratecount(order){
    switch(order){
        case "asc":
            return arrayproduct.sort((a, b) => a.rateCount - b.rateCount);
        case "desc":
            return arrayproduct.sort((a, b) => b.rateCount - a.rateCount);
        default:
            return;
    }
}

function sortbyprice(order){
    switch(order){
        case "asc":
            return arrayproduct.sort((a, b) => a.price - b.price);
        case "desc":
            return arrayproduct.sort((a, b) => b.price - a.price);
        default:
            return;
    }
}

function sortbystar(order){
    switch(order){
        case "asc":
            return arrayproduct.sort((a, b) => a.star - b.star);
        case "desc":
            return arrayproduct.sort((a, b) => b.star - a.star);
        default:
            return;
    }
}