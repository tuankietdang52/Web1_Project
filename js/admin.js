const menuoption = ["chart", "product", "order", "user"];
let choice = menuoption[0];


function Menuchange(clickelement){
    let menu = document.getElementsByClassName("menu")[0];

    for (let i = 0; i < menu.children.length; i++){
        if (menu.children[i].className == "active"){
            menu.children[i].className = "nonactive";
        }
    }

    clickelement.className = "active";
    choice = findchoice();
    changecontent(choice);
}

function findchoice(){
    let menu = document.getElementsByClassName("menu")[0];

    for (let i = 0; i < menu.children.length; i++){
        if (menu.children[i].className == "active"){
            return menuoption[i-1];
        }
    }

    return null;
}

function changecontent(choice){
    let showcontent;
    switch (choice){
        case "chart":
            showcontent = document.getElementsByClassName("chart-content-sect")[0];
            break;
        case "product":
            showcontent = document.getElementsByClassName("product-content-sect")[0];
            loadProduct();
            break;
        case "order":
            showcontent = document.getElementsByClassName("order-content-sect")[0];
            loadOrder();
            break;
    }

    changedisplay(showcontent);
}

function changedisplay(showcontent){
    let contentcontainer = document.getElementsByClassName("main-content-container")[0];

    for (let i = 0; i < contentcontainer.children.length; i++){
        contentcontainer.children[i].style = "display: none";
    }
    
    showcontent.style = "display: block !important";
}

//  Lấy dữ liệu sản phẩm
function loadProduct(){
    let productlist = document.getElementById("product-list");
    let data = getProductData();
    if (!data) return;

    productlist.innerHTML = "";

    //  Hiển thị sản phẩm
    for (let i = 0; i < data.length; i++){
        const item = data[i];
        const html = `
            <td>
                <img src="${item.img}" alt="">
            </td>
            <td>
                <span>${item.name}</span>
            </td>
            <td>
                <span>${item.company}</span>
            </td>
            <td>
                <span>${convertPriceToText(item.price)}</span>
            </td>
            <td>
                <button class="btn btn-edit" onclick="openProductDetail('${item.masp}')">Sửa</button>
                <button class="btn btn-delete" onclick="deleteProduct(this)">Xóa</button>
            </td>
        `;

        //  Tạo thẻ tr
        const htmlObject = document.createElement('tr');
        htmlObject.innerHTML = html;

        //  Thêm vào danh sách
        productlist.append(htmlObject);
    }
}

//  Chuyển đổi giá tiền sang dạng text
function convertPriceToText(price){
    try {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    } catch (error) {
        return "0";
    }
}
// Xóa sản phẩm
function deleteProduct(element){
    //  Xác nhận xóa
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    //  Xóa sản phẩm
    let productlist = document.getElementById("product-list");
    let data = getProductData();
    let index = element.parentNode.parentNode.rowIndex - 1;

    productlist.deleteRow(index);
    data.splice(index, 1);

    //  Lưu lại dữ liệu
    setProductData(JSON.stringify(data));
    loadProduct();
}

// Đóng cửa sổ chi tiết sản phẩm
function closeProductDetail() {
    document.getElementsByClassName("product-detail-container")[0].style = "display: none";
}

// Mở cửa sổ chi tiết sản phẩm
function openProductDetail(product = null) {
    document.getElementsByClassName("product-detail-container")[0].style = "display: block";

    // Clear data
    document.getElementById("product-name").value = "";
    document.getElementById("product-company").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-img").value = "";
    document.getElementById("product-promo").value = "";
    document.getElementById("product-promo-price").value = "";
    document.getElementById("product-screen").value = "";
    document.getElementById("product-os").value = "";
    document.getElementById("product-camera").value = "";
    document.getElementById("product-camera-front").value = "";
    document.getElementById("product-cpu").value = "";
    document.getElementById("product-ram").value = "";
    document.getElementById("product-rom").value = "";
    document.getElementById("product-microUSB").value = "";
    document.getElementById("product-battery").value = "";
    document.getElementById("product-masp").value = "";
    document.getElementById("product-masp-old").value = "";

    //  Nếu có sản phẩm thì hiển thị thông tin sản phẩm
    if (!product) return;
    product = findProduct(product);
    if (!product) return;

    document.getElementById("product-name").value = product.name;
    document.getElementById("product-company").value = product.company;
    document.getElementById("product-price").value = product.price;
    // document.getElementById("product-img").value = product.img;
    document.getElementById("product-promo").value = product.promo.name;
    document.getElementById("product-promo-price").value = product.promo.value;
    document.getElementById("product-screen").value = product.detail.screen;
    document.getElementById("product-os").value = product.detail.os;
    document.getElementById("product-camera").value = product.detail.camera;
    document.getElementById("product-camera-front").value = product.detail.cameraFront;
    document.getElementById("product-cpu").value = product.detail.cpu;
    document.getElementById("product-ram").value = product.detail.ram;
    document.getElementById("product-rom").value = product.detail.rom;
    document.getElementById("product-microUSB").value = product.detail.microUSB;
    document.getElementById("product-battery").value = product.detail.battery;
    document.getElementById("product-masp").value = product.masp;
    document.getElementById("product-masp-old").value = product.masp;
}

//  Tìm kiếm sản phẩm
function findProduct(masp){
    let data = getProductData();
    for (let i = 0; i < data.length; i++){
        if (data[i].masp == masp) return data[i];
    }
    return null;
}

//  Lưu sản phẩm
function saveProduct(){
    //  Lấy thông tin sản phẩm
    const name = document.getElementById("product-name").value;
    const company = document.getElementById("product-company").value;
    const price = document.getElementById("product-price").value;
    const promo = document.getElementById("product-promo").value;
    const promovalue = document.getElementById("product-promo-price").value;
    const screen = document.getElementById("product-screen").value;
    const os = document.getElementById("product-os").value;
    const camera = document.getElementById("product-camera").value;
    const cameraFront = document.getElementById("product-camera-front").value;
    const cpu = document.getElementById("product-cpu").value;
    const ram = document.getElementById("product-ram").value;
    const rom = document.getElementById("product-rom").value;
    const microUSB = document.getElementById("product-microUSB").value;
    const battery = document.getElementById("product-battery").value;
    const masp = document.getElementById("product-masp").value;
    const maspOld = document.getElementById("product-masp-old").value;

    const imgName = "../img/products/oppo-a3s-32gb-600x600.jpg";

    // Kiểm tra thông tin sản phẩm
    if (name == "") {
        alert("Vui lòng nhập tên sản phẩm");
        return;
    }
    if (company == "") {
        alert("Vui lòng nhập tên hãng");
        return;
    }
    if (price == "") {
        alert("Vui lòng nhập giá sản phẩm");
        return;
    }
    if (masp == "") {
        alert("Vui lòng nhập mã sản phẩm");
        return;
    }
    //  Kiểm tra sản phẩm đã tồn tại chưa
    const checkProduct = findProduct(masp);
    if (checkProduct != null && checkProduct.masp != maspOld){
        alert("Mã sản phẩm đã tồn tại");
        return;
    }

    // Kiểm tra giá trị khuyến mãi
    if ((promo == "giamgia" || promo == "tragop" || promo == "giareonline") && promovalue == ""){
        alert("Vui lòng nhập giá trị khuyến mãi");
        return;
    }

    //  Nếu không có sản phẩm cũ thì thêm sản phẩm mới
    if (maspOld == ""){
        if (imgName == ""){
            alert("Vui lòng chọn ảnh sản phẩm");
            return;
        }

        //  Thêm sản phẩm
        let product = new Product(name, 
            company, 
            imgName, 
            price, 
            0, 
            0, 
            {
                name: promo,
                value: promovalue
            }, 
            {
                screen: screen,
                os: os,
                camera: camera,
                cameraFront: cameraFront,
                cpu: cpu,
                ram: ram,
                rom: rom,
                microUSB: microUSB,
                battery: battery
            }, 
            masp);
        let data = getProductData();
        data.push(product);
        setProductData(data);
        alert("Thêm sản phẩm thành công");
    } else {
        //  Sửa sản phẩm
        var product = findProduct(maspOld);
        product.name = name;
        product.company = company;
        product.price = price;
        product.promo.name = promo;
        product.promo.value = promovalue;
        product.detail.screen = screen;
        product.detail.os = os;
        product.detail.camera = camera;
        product.detail.cameraFront = cameraFront;
        product.detail.cpu = cpu;
        product.detail.ram = ram;
        product.detail.rom = rom;
        product.detail.microUSB = microUSB;
        product.detail.battery = battery;
        product.masp = masp;

        let data = getProductData();
        for (let i = 0; i < data.length; i++){
            if (data[i].masp == maspOld){
                data[i] = product;
                break;
            }
        }
        setProductData(JSON.stringify(data));
        alert("Sửa sản phẩm thành công");
    }

    loadProduct();
    closeProductDetail();
}

// Lấy dữ liệu đơn hàng
function loadOrder(){
    let orderlist = document.getElementById("order-list");
    if (!orderlist) return;

    orderlist.innerHTML = "";
    let dataOrder = getOrderData();

    //  Hiển thị đơn hàng
    for (let i = 0; i < dataOrder.length; i++){
        const item = dataOrder[i];
        if (!item.sp) continue;
        const html = `
            <tr>
                <td>
                    <img src="${item.sp.img}" alt="">
                </td>
                <td>
                    <span>${item.sp.name}</span>
                </td>
                <td>
                    <span>${item.sp.company}</span>
                </td>
                <td>
                    <span>${item.soluong}</span>
                </td>
                <td>
                    <span>${convertPriceToText((convertPriceToNumber(item.sp.price) * parseInt(item.soluong)) || 0)}</span>
                </td>
                <td>
                    <span>${item.tinhtrang}</span>
                </td>
                <td>
                    <span>${item.ngaydat}</span>
                </td>
                <td>
                    <button class="btn btn-edit">Cập nhật</button>
                    <button class="btn btn-delete">Hủy</button>
                </td>
            </tr>
        `;

        //  Tạo thẻ tr
        const htmlObject = document.createElement('tr');
        htmlObject.innerHTML = html;

        //  Thêm vào danh sách
        orderlist.append(htmlObject);
    }
}

//  Lấy dữ liệu đơn hàng
function convertPriceToNumber(price){
    return parseInt(price.toString().replace(/\./g, ""));
}