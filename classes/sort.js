function sortbyratecount(order){
    switch(order){
        case "asc":
            return arrayproduct.sort((a, b) => a[0].rateCount - b[0].rateCount);
        case "desc":
            return arrayproduct.sort((a, b) => b[0].rateCount - a[0].rateCount);
        default:
            return;
    }
}

function sortbyprice(order){
    switch(order){
        case "asc":
            return arrayproduct.sort((a, b) => a[0].price - b[0].price);
        case "desc":
            return arrayproduct.sort((a, b) => b[0].price - a[0].price);
        default:
            return;
    }
}

function sortbystar(order){
    switch(order){
        case "asc":
            return arrayproduct.sort((a, b) => a[0].star - b[0].star);
        case "desc":
            return arrayproduct.sort((a, b) => b[0].star - a[0].star);
        default:
            return;
    }
}

function sortnewproduct(){
    let index = 0;
    let array = [];
    for (let i = 0; i < arrayproduct.length; i++){
        if (arrayproduct[i][0].promo.name != "moiramat") continue;
        array[index] = arrayproduct[i];
        index++;
    }

    return array;
}