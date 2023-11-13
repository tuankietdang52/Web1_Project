function sortbyratecount(order){
    let sortarray = arrayproduct;
    switch(order){
        case "asc":
            return sortarray.sort((a, b) => a[0].rateCount - b[0].rateCount);
        case "desc":
            return sortarray.sort((a, b) => b[0].rateCount - a[0].rateCount);
        default:
            return;
    }
}

function sortbyprice(order){
    let sortarray = arrayproduct;
    switch(order){
        case "asc":
            return sortarray.sort((a, b) => a[0].price - b[0].price);
        case "desc":
            return sortarray.sort((a, b) => b[0].price - a[0].price);
        default:
            return;
    }
}

function sortbystar(order){
    let sortarray = arrayproduct;
    switch(order){
        case "asc":
            return sortarray.sort((a, b) => a[0].star - b[0].star);
        case "desc":
            return sortarray.sort((a, b) => b[0].star - a[0].star);
        default:
            return;
    }
}

function sortpromoproduct(promoname){
    let index = 0;
    let array = [];
    for (let i = 0; i < arrayproduct.length; i++){
        if (arrayproduct[i][0].promo.name != promoname) continue;
        array[index] = arrayproduct[i];
        index++;
    }

    return array;
}