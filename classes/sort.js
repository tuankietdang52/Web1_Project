function sortbyratecount(order, array = null){
    let sortarray = [];

    if (array) sortarray = array;
    else sortarray = arrayproduct;

    switch(order){
        case "asc":
            return sortarray.sort((a, b) => a[0].rateCount - b[0].rateCount);
        case "desc":
            return sortarray.sort((a, b) => b[0].rateCount - a[0].rateCount);
        default:
            return;
    }
}

function sortbyprice(order, array = null){
    let sortarray = [];
    
    if (array) sortarray = array;
    else sortarray = arrayproduct;

    switch(order){
        case "asc":
            return sortarray.sort((a, b) => a[0].price - b[0].price);
        case "desc":
            return sortarray.sort((a, b) => b[0].price - a[0].price);
        default:
            return;
    }
}

function sortbystar(order, array = null){
    let sortarray = [];
    
    if (array) sortarray = array;
    else sortarray = arrayproduct;

    switch(order){
        case "asc":
            return sortarray.sort((a, b) => a[0].star - b[0].star);
        case "desc":
            return sortarray.sort((a, b) => b[0].star - a[0].star);
        default:
            return;
    }
}

function sortbyamountstar(amount, array = null){
    let sortarray = [];
    let temparray = [];
    
    if (array) temparray = array;
    else temparray = arrayproduct;

    for (let i = 0; i < temparray.length; i++){
        if (temparray[i][0].star <= amount) continue;
        sortarray.push(temparray[i]);
    }

    return sortarray;
}

function sortpromoproduct(promoname, array = null){
    let sortarray = [];
    let temparray = [];
    
    if (array) temparray = array;
    else temparray = arrayproduct;
    
    for (let i = 0; i < temparray.length; i++){
        if (temparray[i][0].promo.name != promoname) continue;
        sortarray.push(temparray[i]);
    }

    return sortarray;
}