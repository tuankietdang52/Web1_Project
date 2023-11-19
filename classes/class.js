let arrayproduct = [];
let arrayaccounts = [];

class Product{
    constructor(name, company, img, price, star, rateCount, promo, detail, masp){
        this.name = name;
        this.company = company;
        this.img = img;
        this.price = price;
        this.star = star;
        this.rateCount = rateCount;
        this.promo = promo;
        this.detail = detail;
        this.masp = masp; 
        this.numprice = this.toNumPrice(price);
        this.promovaluenum = this.toNumPrice(this.promo.value);
        this.beforesaleprice = this.checkCheapOnlPromo();
    }

    toNumPrice(num){
        let tempnumprice = "";
        for (let i = 0; i < num.length; i++){
            if (num[i] == '.') continue;

            tempnumprice += num[i];
        }
        return parseFloat(tempnumprice);
    }

    checkCheapOnlPromo(){
        if (this.promo.name != "giareonline") return;

        this.beforesaleprice = this.numprice;
        this.numprice = this.promovaluenum;
    }
}

class Promo{
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}