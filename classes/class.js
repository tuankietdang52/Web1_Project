let arrayproduct = [];
let arrayaccounts = [];

// đối tượng user
function User(username, pass, ho, ten, email, isLocked, products, donhang) {
	this.ho = ho || '';
	this.ten = ten || '';
	this.email = email || '';
	this.username = username;
	this.pass = pass;
	this.products = products || [];
	this.donhang = donhang || [];
    this.isLocked = isLocked;
}

function equalUser(u1, u2) {
	return (u1.username == u2.username && u1.pass == u2.pass);
}

function getProductCartAmount(){
    let user = getCurrentUser();
    if (!user) return 0;
    
    let amount = 0;

    for (let i = 0; i < user.products.length; i++){
        amount += user.products[i].soluong;
    }

    return amount;
}

// end đôi tượng user



class Product{
    constructor(name, company, img, price, star, rateCount, promo, detail, masp, soldamount){
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
        this.soldamount = soldamount || 0;

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

function toTextPrice(price){
    let pricetext = price.toString();
    let text = "";

    let count = 0;
    for (let i = pricetext.length - 1; i >= 0 ; i--){
        text += pricetext[i];
        count++;

        if (count % 3 == 0 && pricetext[i - 1]) text += ".";
    }

    text = ReverseString(text);
    return text;
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