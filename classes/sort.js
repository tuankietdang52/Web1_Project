function sortbyratecount(order, array = null){
    let sortarray = array || arrayproduct;

    switch (order){
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

    switch (order){
        case "asc":
            return sortarray.sort((a, b) => a[0].numprice - b[0].numprice);
        case "desc":
            return sortarray.sort((a, b) => b[0].numprice - a[0].numprice);
        default:
            return;
    }
}

function sortbyname(order, array = null){
    let sortarray = array || arrayproduct;
    
    switch (order){
        case "asc":
            return sortarray.sort((a, b) => a[0].name.toLowerCase().localeCompare(b[0].name.toLowerCase()));
        case "desc":
            return sortarray.sort((a, b) => b[0].name.toLowerCase().localeCompare(a[0].name.toLowerCase()));
        default:
            return;
    }
}

function sortbyamountprice(amount1, order, array = null, amount2 = 0){
    let sortarray = array || arrayproduct;
    switch (order){
        case "below":
            return sortbypricebelow(amount1, sortarray);
        case "above":
            return sortbypriceabove(amount1, sortarray);
        case "mintomax":
            return sortbymintomax(amount1, amount2, sortarray);
        default:
            return null;
    }
}

function sortbypricebelow(amount, array){
    let temparray = [];
    let price = 0;
    for (let i = 0; i < array.length; i++){
        price = array[i][0].promo.name == "giareonline" ? array[i][0].promovaluenum : array[i][0].numprice;
        if (price > amount) continue;

        temparray.push(array[i]);
    }
    return temparray;
}

function sortbypriceabove(amount, array){
    let temparray = [];
    let price = 0;
    for (let i = 0; i < array.length; i++){
        price = array[i][0].promo.name == "giareonline" ? array[i][0].promovaluenum : array[i][0].numprice;
        if (price < amount) continue;

        temparray.push(array[i]);
    }
    return temparray;
}

function sortbymintomax(amount1, amount2, array){
    let temparray = [];
    let price = 0;
    for (let i = 0; i < array.length; i++){
        price = array[i][0].promo.name == "giareonline" ? array[i][0].promovaluenum : array[i][0].numprice;
        if (price < amount1 || price > amount2) continue;

        temparray.push(array[i]);
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

function sortbycompany(companyname, array = null){
    let temparray = array || arrayproduct;
    let sortarray = [];

    for (let i = 0; i < temparray.length; i++){
        if (temparray[i][0].company != companyname) continue;

        sortarray.push(temparray[i]);
    }

    return sortarray;
}