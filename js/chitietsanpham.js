let product = getProduct();
let randomproduct = getRandomProduct();

function getProduct(){
    let current = splitlink();
    let currentproduct = current[1];

    for (let i = 0; i < arrayproduct.length; i++){
        if (currentproduct == arrayproduct[i][0].masp){
            return arrayproduct[i];
        }
    }
    
    return null;
}

function getRandomProduct(){
    let temparray = [];

    for (let i = 0; i < 5; i++){
        let random = Math.floor(Math.random() * arrayproduct.length);

        if (arrayproduct[random] == product || temparray.includes(arrayproduct[random])){
            i--;
            continue;
        }

        temparray.push(arrayproduct[random]);
    }

    return temparray;
}

function getName(){
    return product[0].name;
}

function getStar(){
    let star = "";
    let amountstar = product[0].star;
    let i = 0;

    while (i < 5){
        if (i < amountstar) star += '<i class="fa fa-star"></i>';
        else star += '<i class="fa fa-star-o"></i>';
        i++;
    }

    return star;
}

function getrateCount(){
    let rateCount = product[0].rateCount;
    return rateCount + " Đánh giá";
}

function getImg(){
    return product[0].img;
}

function getPrice(){
    if (product[0].promo.name == "giareonline") return product[0].promo.value;
    return product[0].price;
}

function writeNameandReview(){
    let sect = document.getElementsByClassName("product-name-container")[0];

    sect.innerHTML += (`
        <h1 class="name">` + getName() + `</h1>
        <div class="star-container">` + getStar() + `</div>
        <span class='product-ratecount'>` + getrateCount() + `</span>
    `)
}

function writeProductDetail(){
    let sect = document.getElementsByClassName("product-detail-container")[0];

    sect.innerHTML += (`
        <img class="img" src="` + getImg() + `" alt="` + getName() + `">
        <div class="detail-container">
            <div class="price-container">
                <h1 class="price">` + getPrice() + `</h1>
                ` + writeDetailPromoTag() + `
            </div>
            ` + writeship() + `
            <div class="promo-container">
                <h2>KHUYẾN MÃI</h2>
                <div class="promo-detail-container">
                    <i class="fa-solid fa-circle-check"></i>
                    <p class="promo-detail">
                        ` + getPromoValue() + `
                    </p>
                </div>
            </div>
            <div class="customer-profit-container">
                <div>
                    <i class="fa-solid fa-gift"></i>
                    <span>Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp lưng</span>
                </div>
                <div>
                    <i class="fa-solid fa-mobile-screen-button"></i>
                    <span>Bảo hành chính hãng 12 tháng</span>
                </div>
                <div style="border: none;">
                    <i class="fa-solid fa-rotate"></i>
                    <span>1 đổi 1 trong 1 tháng nếu lỗi, đổi sản phẩm tại nhà trong 1 ngày</span>
                </div>
            </div>
            <button class="addtocart" onclick="Addproducttocart(event, product[0].masp, product[0].name)">
                <b>
                    <i class="fa-solid fa-cart-plus"></i>
                    Thêm vào giỏ hàng
                </b>
                <span>Giao hàng trong 1 giờ hoặc nhận tại cửa hàng</span>
            </button>
        </div>
        <div class="product-info">
            <div class="product-info-title">
                <b>Thông số kỹ thuật</b>
            </div>
            <div>
                <span class="system">Màn hình</span>
                <span class="system-detail">` + getSystemDetail("screen") + `</span>
            </div>
            <div>
                <span class="system">Hệ điều hành</span>
                <span class="system-detail">` + getSystemDetail("os") + `</span>
            </div>
            <div>
                <span class="system">Camera</span>
                <span class="system-detail">` + getSystemDetail("camera") + `</span>
            </div>
            <div>
                <span class="system">Camera Trước</span>
                <span class="system-detail">` + getSystemDetail("cameraFront") + `</span>
            </div>
            <div>
                <span class="system">CPU</span>
                <span class="system-detail">` + getSystemDetail("cpu") + `</span>
            </div>
            <div>
                <span class="system">RAM</span>
                <span class="system-detail">` + getSystemDetail("ram") + `</span>
            </div>
            <div>
                <span class="system">ROM</span>
                <span class="system-detail">` + getSystemDetail("rom") + `</span>
            </div>
            <div>
                <span class="system">Thẻ nhớ</span>
                <span class="system-detail">` + getSystemDetail("microUSB") + `</span>
            </div>
            <div style="border:none;">
                <span class="system">Dung lượng pin</span>
                <span class="system-detail">` + getSystemDetail("battery") + `</span>
            </div>
        </div>
    `)
}

function writeDetailPromoTag(){
    let promo = product[0].promo.name;
    let promovalue = product[0].promo.value;

    if (promo == "") return "";
    return editDetailPromoTag(promo, promovalue);
}

function editDetailPromoTag(promo, value){
    switch (promo){
        case "moiramat":
            return "<label class='promotag moiramat'>Mới ra mắt</label>";
        case "tragop":
            return "<label class='promotag tragop'>Trả góp " + value + "%</label>";
        case "giareonline":
            return "<span class='beforesale'>" + product[0].price + "<span>đ</span></span>";
        case "giamgia":
            return (`
                <label class='promotag giamgia'>
                    <i class="fa-solid fa-bolt"></i>
                    Giảm ` + value + `đ
                </label>
            `);
    }
}

function writeship(){
    if (product[0].promo.name != "giareonline") return "";

    return (`
        <div class="ship">
            <div class="ship-icon">
                <i class="fa-regular fa-clock"></i>
            </div>
            <h1>NHẬN HÀNG TRONG 1 GIỜ</h1>
        </div>
    `)
}

function getPromoValue(){
    let promo = product[0].promo.name;

    switch (promo){
        case "giareonline":
            return getGiareonlinePromo();
        
        case "moiramat":
            return (`
                Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi trả lỗi trong vòng 2 tháng.
            `)

        case "giamgia":
            return (`Sản phẩm sẽ được giảm 
                    <span>` + product[0].promo.value + `đ</span>
                    khi mua hàng online bằng thẻ VPBank hoặc tin nhắn SMS
                `)

        case "tragop":
            return (`
                Khách hàng có thể mua trả góp sản phẩm với 
                <span>lãi suất 0%</span> 
                với thời hạn 6 tháng kể từ khi mua hàng.
            `)

        default:
            return (`
                Cơ hội trúng <span>61 xe Wave Alpha</span> khi trả góp Home Credit
            `);
    }
}

function getGiareonlinePromo(){
    let promovalue = product[0].beforesaleprice - product[0].numprice;

    promovalue = toTextPrice(promovalue);

    let promodetail = (`Sản phẩm sẽ được giảm 
                        <span>` + promovalue + `đ</span>
                        khi mua hàng online bằng thẻ VPBank hoặc tin nhắn SMS
                    `)

    return promodetail;
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

function ReverseString(str){
    // tách, đảo ngược, ghép //
    return str.split('').reverse().join('');
}

function getSystemDetail(systemitem){
    switch (systemitem){
        case "screen":
            return product[0].detail.screen;
        case "os":
            return product[0].detail.os;
        case "camera":
            return product[0].detail.camera;
        case "cameraFront":
            return product[0].detail.cameraFront;
        case "cpu":
            return product[0].detail.cpu;
        case "ram":
            return product[0].detail.ram;
        case "rom":
            return product[0].detail.rom;
        case "microUSB":
            return product[0].detail.microUSB;
        case "battery":
            return product[0].detail.battery;
        default:
            return "";
    }
}
