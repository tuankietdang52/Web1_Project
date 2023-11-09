function sortbyratecount(order){
    switch(order){
        case "asc":
            arrayproduct.sort((a, b) => a.rateCount - b.rateCount);
            return;
        case "desc":
            arrayproduct.sort((a, b) => b.rateCount - a.rateCount);
            return;
        default:
            return;
    }
}

function sortbyprice(order){
    switch(order){
        case "asc":
            arrayproduct.sort((a, b) => a.price - b.price);
            return;
        case "desc":
            arrayproduct.sort((a, b) => b.price - a.price);
            return;
        default:
            return;
    }
}

function sortbystar(order){
    switch(order){
        case "asc":
            arrayproduct.sort((a, b) => a.star - b.star);
            return;
        case "desc":
            arrayproduct.sort((a, b) => b.star - a.star);
            return;
        default:
            return;
    }
}