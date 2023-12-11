const menuoption = ["chart", "product", "order", "user"];
let choice = menuoption[0];

let isEditProduct = false;


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
        case "user":
            showcontent = document.getElementsByClassName("user-content-sect")[0];
            loadUser();
            break;
        default:
            showcontent = null;
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
                <span>${item.price}đ</span>
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
let imgpath = "";

function openProductDetail(product = null) {
    document.getElementsByClassName("product-detail-container")[0].style = "display: block";
    isEditProduct = false;

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
    product = findbyproductcode(product, arrayproduct);
    if (!product) return;

    // neu sua thi chinh co hieu thanh true
    isEditProduct = true;
    imgpath = product.img;

    document.getElementById("product-name").value = product.name;
    document.getElementById("product-company").value = product.company;
    document.getElementById("product-price").value = product.price;
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
    const checkProduct = findbyproductcode(masp, arrayproduct);
    if (checkProduct != null && checkProduct.masp != maspOld && !isEditProduct){
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
        if (imgpath == ""){
            alert("Vui lòng chọn ảnh sản phẩm");
            return;
        }

        //  Thêm sản phẩm
        let product = new Product(name, 
            company, 
            imgpath, 
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
        var product = findbyproductcode(maspOld, arrayproduct);
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
        product.img = imgpath;


        setProductData(arrayproduct);
        alert("Sửa sản phẩm thành công");
    }

    loadProduct();
    closeProductDetail();
}

// Lấy dữ liệu đơn hàng

let isOneOrder = false;
let count = 0;
let lock = false;

function getInformationOrder(informationName, order){
    switch (informationName){
        case "img":
            return `<img src="${order.sp.img}" alt="">`;

        case "name":
            return `<span>${order.sp.name}</span>`

        case "user":
            return `<span>${order.user}</span>`
        
        case "amount":
            return `<span>${order.soluong}</span>`

        case "price":
            return `<span>${calculatePrice(order.sp.numprice, order.soluong)}đ</span>`
    }
}

function writeInformationOrder(informationName, ordercode){
    let information = "";
    let order = getOrderData();
    
    for (let i = 0; i < order.length; i++){
        if (ordercode != order[i].madonhang) continue;

        information += getInformationOrder(informationName, order[i]);

        // dem xem co bao nhieu san pham trong 1 don hang
        // lock se khoa trong nhung lan them thuoc tinh tiep theo 
        // de tranh count bi tang len sau khi dem xong co bao nhieu san pham trong 1 order
        if (!lock) count++;
    }

    if (count > 1) isOneOrder = true;

    lock = true;

    return information;
}

function loadOrder(){
    let orderlist = document.getElementById("order-list");
    if (!orderlist) return;

    orderlist.innerHTML = "";
    let dataOrder = getOrderData();

    //  Hiển thị đơn hàng
    for (let i = 0; i < dataOrder.length; i++){
        const item = dataOrder[i];
        if (!item.sp) continue;

        // kiem tra co phai trong cung 1 don hang khong
        if (isOneOrder){
            i += count - 1;
            isOneOrder = false;
            continue;
        }

        count = 0;
        
        const html = `
            <tr>
                <td>
                    <div class="lmao">
                        ${writeInformationOrder("img", item.madonhang)}
                    </div>
                </td>
                <td>
                    <div class="lmao">
                        ${writeInformationOrder("name", item.madonhang)}
                    </div>
                </td>
                <td>
                    <div class="lmao">
                        ${writeInformationOrder("user", item.madonhang)}
                    </div>
                </td>
                <td>
                    <div class="lmao">
                        ${writeInformationOrder("amount", item.madonhang)}
                    </div>
                </td>
                <td>
                    <div class="lmao">
                        ${writeInformationOrder("price", item.madonhang)}
                    </div>
                </td>
                <td>
                    <span>${item.tinhtrang}</span>
                </td>
                <td>
                    <span>${item.ngaydat}</span>
                </td>
                <td>
                    <button class="btn btn-edit" onclick="confirmOrder(this)">Cập nhật</button>
                    <button class="btn btn-delete" onclick="cancelOrder(this)">Hủy</button>
                </td>
            </tr>
        `;

        //  Tạo thẻ tr
        const htmlObject = document.createElement('tr');
        htmlObject.innerHTML = html;

        //  Thêm vào danh sách
        orderlist.append(htmlObject);

        // xong 1 order thi unlock
        lock = false;
    }
}

// Hủy đơn hàng
function cancelOrder(element){
    //  Xác nhận hủy
    if (!confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

    //  Hủy đơn hàng
    let orderlist = document.getElementById("order-list");
    let data = getOrderData();
    let index = element.parentNode.parentNode.rowIndex - 1;

    // Cập nhật lại tình trạng đơn hàng
    data[index].tinhtrang = "Đã hủy bởi Admin";
    saveOrderDataForUser(data[index]);

    // Xóa đơn hàng sau khi chọn
    orderlist.deleteRow(index);
    data.splice(index, 1);

    //  Lưu lại dữ liệu
    setOrderData(JSON.stringify(data));
    loadOrder();
}

// Duyệt đơn hàng
function confirmOrder(element){
    //  Duyệt đơn hàng
    let orderlist = document.getElementById("order-list");
    let data = getOrderData();
    let index = element.parentNode.parentNode.rowIndex - 1;

    // Cập nhật lại tình trạng đơn hàng
    data[index].tinhtrang = "Đã duyệt";
    saveOrderDataForUser(data[index]);

    // Xóa đơn hàng sau khi chọn
    orderlist.deleteRow(index);
    data.splice(index, 1);

    //  Lưu lại dữ liệu
    setOrderData(JSON.stringify(data));
    loadOrder();
}

// tính tiền r chuyển lại sang dạng text
function calculatePrice(price, amount){
    price *= amount;
    return toTextPrice(price);
}

// User Manage //

function loadUser(){
    let userlist = document.getElementsByClassName("user-list")[0];
    if (!userlist) return;

    userlist.innerHTML = "";

    for (let i = 0; i < arrayaccounts.length; i++){
        let user = arrayaccounts[i];

        let lockcolor = (userlock) => userlock ? "style='background-color: red'" : "";

        userlist.innerHTML += (`
            <tr ${lockcolor(user.isLocked)}>
                <td>${user.ho + " " + user.ten}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${user.pass}</td>
                <td>
                    ${checkLocked(user.username)}
                </td>
            </tr>
        `)
    }
}

function checkLocked(username){
    let user = findUserByUsername(username);

    let buttonsect = "";

    if (user.isLocked){
        buttonsect += (`<button class="btn btn-edit" onclick="unlockAccount('${username}')">Mở khóa</button>`);
        return buttonsect;
    }

    buttonsect += (`
        <button class="btn btn-edit" onclick="lockAccount('${username}')">Khoá tài khoản</button>
        <button class="btn btn-delete" onclick="deleteAccount('${username}')">Xóa</button>`
    )

    return buttonsect;
}

function lockAccount(username){
    let user = findUserByUsername(username);

    user.isLocked = true;
    setListUser(arrayaccounts);
    loadUser();
}

function unlockAccount(username){
    let user = findUserByUsername(username);

    user.isLocked = false;
    setListUser(arrayaccounts);
    loadUser();
}

function deleteAccount(username){
    if (!window.confirm(`Bạn thật sự muốn xóa tài khoản ${username}?`)) return;

    for (let i = 0; i < arrayaccounts.length; i++){
        if (username != arrayaccounts[i].username) continue;

        arrayaccounts.splice(i, 1);
    }

    deleteAccountOrder(username);
    setListUser(arrayaccounts);
    loadUser();
    loadOrder();
}

function deleteAccountOrder(username){
    for (let i = 0; i < list_orders.length; i++){
        if (username != list_orders[i].user) continue;

        list_orders.splice(i, 1);
        i--;
    }
    
    setOrderData(list_orders);
}

// Save img using FileReader

function changeImg(input){
    let inputfile = input.files;
    let file = inputfile[0];

    const filereader = new FileReader();
    filereader.addEventListener(
        "load",
        () => {
            // filreader.result sẽ cho ra hình ảnh dưới dạng chuỗi base64
            imgpath = filereader.result;
        }
    )

    // truyền file vào
    // method này sẽ kích hoạt sự kiện load 
    filereader.readAsDataURL(file);
}