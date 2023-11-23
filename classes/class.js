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
        this.beforesaleprice = 0;

        this.checkCheapOnlPromo();
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

        // num value //
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

class Detail{
    constructor(screen, os, camera, cameraFront, cpu, ram, rom, microUSB, battery){
        this.screen = screen;
        this.os = os;
        this.camera = camera;
        this.cameraFront = cameraFront;
        this.cpu = cpu;
        this.ram = ram;
        this.rom = rom;
        this.microUSB = microUSB;
        this.battery = battery;
    }
}