function sortbyratecount(order, array = null){
    let sortarray = array || arrayproduct;

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
    let sortarray = array || arrayproduct;

    switch(order){
        case "asc":
            return sortarray.sort((a, b) => a[0].price - b[0].price);
        case "desc":
            return sortarray.sort((a, b) => b[0].price - a[0].price);
        default:
            return;
    }
}

function sortbyamountprice(amount1, order, amount2 = 0){
    switch (order){
        case "below":
            return sortbypricebelow(amount1);
            break;
        case "above":
            return sortbypriceabove(amount1);
        case "mintomax":
            return sortbymintomax(amount1, amount2);
        default:
            return null;
    }
}

function sortbypricebelow(amount){
    let temparray = [];
    for (let i = 0; i < arrayproduct.length; i++){
        if (arrayproduct[i][0].numprice > amount) continue;

        temparray.push(arrayproduct[i]);
    }
    return temparray;
}

function sortbypriceabove(amount){
    let temparray = [];
    for (let i = 0; i < arrayproduct.length; i++){
        if (arrayproduct[i][0].numprice < amount) continue;

        temparray.push(arrayproduct[i]);
    }
    return temparray;
}

function sortbymintomax(amount1, amount2){
    let temparray = [];
    for (let i = 0; i < arrayproduct.length; i++){
        if (arrayproduct[i][0].numprice < amount1 || arrayproduct[i][0].numprice > amount2) continue;

        temparray.push(arrayproduct[i]);
    }
    return temparray;
}

function sortbystar(order, array = null){
    let sortarray = array || arrayproduct;

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