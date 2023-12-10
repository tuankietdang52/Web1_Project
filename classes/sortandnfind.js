// SORT //

function sortbyratecount(order, array = null){
    let sortarray = array || arrayproduct;

    switch (order){
        case "asc":
            return sortarray.sort((a, b) => a.rateCount - b.rateCount);
        case "desc":
            return sortarray.sort((a, b) => b.rateCount - a.rateCount);
        default:
            return;
    }
}

function sortbyprice(order, array = null){
    let sortarray = array || arrayproduct;

    switch (order){
        case "asc":
            return sortarray.sort((a, b) => a.numprice - b.numprice);
        case "desc":
            return sortarray.sort((a, b) => b.numprice - a.numprice);
        default:
            return;
    }
}

function sortbyname(order, array = null){
    let sortarray = array || arrayproduct;
    
    switch (order){
        case "asc":
            return sortarray.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        case "desc":
            return sortarray.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
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
        price = array[i].promo.name == "giareonline" ? array[i].promovaluenum : array[i].numprice;
        if (price > amount) continue;

        temparray.push(array[i]);
    }
    return temparray;
}

function sortbypriceabove(amount, array){
    let temparray = [];
    let price = 0;
    for (let i = 0; i < array.length; i++){
        price = array[i].promo.name == "giareonline" ? array[i].promovaluenum : array[i].numprice;
        if (price < amount) continue;

        temparray.push(array[i]);
    }
    return temparray;
}

function sortbymintomax(amount1, amount2, array){
    let temparray = [];
    let price = 0;
    for (let i = 0; i < array.length; i++){
        price = array[i][0].promo.name == "giareonline" ? array[i].promovaluenum : array[i].numprice;
        if (price < amount1 || price > amount2) continue;

        temparray.push(array[i]);
    }
    return temparray;
}

function sortbystar(order, array = null){
    let sortarray = array || arrayproduct;

    switch(order){
        case "asc":
            return sortarray.sort((a, b) => a.star - b.star);
        case "desc":
            return sortarray.sort((a, b) => b.star - a.star);
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
        if (temparray[i].star <= amount) continue;
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
        if (temparray[i].promo.name != promoname) continue;
        sortarray.push(temparray[i]);
    }

    return sortarray;
}

function sortbycompany(companyname, array = null){
    let temparray = array || arrayproduct;
    let sortarray = [];

    for (let i = 0; i < temparray.length; i++){
        if (temparray[i].company != companyname) continue;

        sortarray.push(temparray[i]);
    }

    return sortarray;
}

// FIND //

function findbyproductcode(productcode, array = null){
    if (!array) array = arrayproduct;

    for (let i = 0; i < array.length; i++){
        if (array[i].masp != productcode) continue;
        
        return array[i];
    }

    return null;
}

function findUserByUsername(username, array = null){
    if (!array) array = arrayaccounts;

    for (let i = 0; i < array.length; i++){
        if (array[i].username == username) return array[i];
    }

    return null;
}