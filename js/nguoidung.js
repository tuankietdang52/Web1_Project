var currentUser;
var tongTienTatCaDonHang = 0; // lưu tổng tiền từ tất cả các đơn hàng đã mua
var tongSanPhamTatCaDonHang = 0;

//copy object để chắc chắn rằng k bị lỗi ở các phần dữ liệu khác
function copyObject(o) {
    return JSON.parse(JSON.stringify(o));
}
window.onload = function(){
    khoiTao(); // khoi tao o login 

    currentUser = getCurrentUser();
    if (currentUser) {
        // cập nhật từ list user, do trong admin chỉ tác động tới listuser
        var listUser = getListUser();
        for (var u of listUser) {
            if (equalUser(currentUser, u)) {
                currentUser = u;
                setCurrentUser(u);
            }
        }
        addTatCaDonHang(currentUser); // hàm này cần chạy trước để tính được tổng tiền tất cả đơn hàng 
        addInfoUser(currentUser);
    
    } else {
        // chưa đăng nhập thì hiện ra
        var warning = `<h2 style="color: red; font-weight:bold; text-align:center; font-size: 2em; padding: 50px;">
                            Bạn chưa đăng nhập !!
                        </h2>`;
        document.getElementsByClassName('infoUser')[0].innerHTML = warning;
    }
    

}

// khi đã đăng nhập thì hiện ra đoạn bên dưới 
function addInfoUser(user) {
    if (!user) return;
    document.getElementsByClassName('infoUser')[0].innerHTML = `
    <hr>
    <table>
        <tr>
            <th colspan="3">THÔNG TIN KHÁCH HÀNG</th>
        </tr>
        <tr>
            <td>Tài khoản: </td>
            <td> <input type="text" value="` + user.username + `" readonly> </td>
            <td> <i class="fa fa-pencil" onclick="changeInfo(this, 'username')"></i> </td>
        </tr>
        <tr>
            <td>Mật khẩu: </td>
            <td style="text-align: center;"> 
                <i class="fa fa-pencil" id="butDoiMatKhau" onclick="openChangePass()">
                    <span>Đổi mật khẩu</span>
                </i> 
            </td>
            <td></td>
        </tr>
        <tr>
            <td colspan="3" id="khungDoiMatKhau">
                <table>
                    <tr>
                        <td> <div>Mật khẩu cũ:</div> </td>
                        <td> <div><input type="password"></div> </td>
                    </tr>
                    <tr>
                        <td> <div>Mật khẩu mới:</div> </td>
                        <td> <div><input type="password"></div> </td>
                    </tr>
                    <tr>
                        <td> <div>Xác nhận mật khẩu:</div> </td>
                        <td> <div><input type="password"></div> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> 
                            <div><button onclick="changePass()">Đồng ý</button></div> 
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>Họ: </td>
            <td> <input type="text" value="` + user.ho + `" readonly> </td>
            <td> <i class="fa fa-pencil" onclick="changeInfo(this, 'ho')"></i> </td>
        </tr>
        <tr>
            <td>Tên: </td>
            <td> <input type="text" value="` + user.ten + `" readonly> </td>
            <td> <i class="fa fa-pencil" onclick="changeInfo(this, 'ten')"></i> </td>
        </tr>
        <tr>
            <td>Email: </td>
            <td> <input type="text" value="` + user.email + `" readonly> </td>
            <td> <i class="fa fa-pencil" onclick="changeInfo(this, 'email')"></i> </td>
        </tr>
        <tr>
            <td colspan="3" style="padding:5px; border-top: 2px solid #ccc;"></td>
        </tr>
        <tr>
            <td>Tổng tiền đã mua: </td>
            <td> <input type="text" value="` + numToString(tongTienTatCaDonHang) + `₫" readonly> </td>
            <td></td>
        </tr>
        <tr>
            <td>Số lượng sản phẩm đã mua: </td>
            <td> <input type="text" value="` + tongSanPhamTatCaDonHang + `" readonly> </td>
            <td></td>
        </tr>
    </table>`;
}

// event ẩn hiện khung đổi mật khẩu
function openChangePass(){
    var khungChangePass = document.querySelector('#khungDoiMatKhau');
    var actived = khungChangePass.classList.contains('active');
    if ( actived )
    khungChangePass.classList.remove('active');
    else
    khungChangePass.classList.add('active');
}

// check và đổi mật khẩu mới
function changePass() {
    var khungChangePass = document.getElementById('khungDoiMatKhau');
    var inputTag = khungChangePass.getElementsByTagName('input');

    if (inputTag[0].value != currentUser.pass) {
        alert('Sai mật khẩu cũ!!');
        inputTag[0].focus();
        return;
    }

    if (inputTag[1].value == '') {
        inputTag[1].focus();
        alert('Chưa nhập mật khẩu mới !');
        return;
    }

    if (inputTag[1].value != inputTag[2].value) {
        alert('Mật khẩu không khớp');
        inputTag[2].focus();
        return;
    }

    var temp = copyObject(currentUser);
    currentUser.pass = inputTag[1].value;

    // cập nhật danh sách sản phẩm trong localstorage
    setCurrentUser(currentUser);
    updateListUser(temp, currentUser);

    // Cập nhật trên header
    capNhat_ThongTin_CurrentUser();

    // thông báo
    alert('Thay đổi mật khẩu thành công.');
    
    location.reload(); // reset khung doi mat khau
    openChangePass();
}

// đổi các thông tin còn lại của user
    function changeInfo(iTag,info){
        var inputTag = iTag.parentElement.previousElementSibling.getElementsByTagName('input')[0];
        
        if ( !inputTag.readOnly && inputTag.value != ''){
            if ( info === 'username' ){
                var listUser = getListUser();
                for ( var u of listUser){
                    if ( u.username == inputTag.value && u.username != currentUser.username){
                        alert('Ten da co nguoi su dung !!');
                        inputTag.value = currentUser.username;
                        return;
                    }
                }
                // đổi tên trong list đơn hàng
                
            } else if ( info == 'email' ){
                var listUser = getListUser();
                for ( var u of listUser){
                    if ( u.email == inputTag.value && u.username != currentUser.username){
                        alert('Email da co nguoi su dung !!');
                        inputTag.value = currentUser.email;
                        return;
                    }
                }
            }
            
            var temp = copyObject(currentUser);
            currentUser[info] = inputTag.value;
            
            setCurrentUser(currentUser);
            updateListUser(temp,currentUser);

            capNhat_ThongTin_CurrentUser();
            iTag.innerHTML='';
        } else {
            iTag.innerHTML ='OK';

            inputTag.focus();
            var v = inputTag.value;
            inputTag.value ='';
            inputTag.value = v;
        }
        inputTag.readOnly = !inputTag.readOnly;
  
    }





//  Khung đơn đặt hàng 



function addTatCaDonHang(user){
    if ( !user){
        document.querySelector('.listDonHang').innerHTML = `
            <h3 style="100%";padding: 50px: color :red; font-size:2em; text-align: center" > 
                Bạn chưa đăng nhập vào tài khoản !!
           </h3>     
            `;
        return;
    }
    if (!user.donhang.length) {
        document.getElementsByClassName('listDonHang')[0].innerHTML += `
            <h3 style="width=100%; padding: 50px; color: green; font-size: 2em; text-align: center"> 
                Xin chào ` + currentUser.username + `. Bạn chưa có đơn hàng nào.
            </h3>`;
        return;
    }
    for ( dh of user.donhang){
        addDonHang(dh);
    }    
}
function addDonHang(dh) {
    var div = document.getElementsByClassName('listDonHang')[0];

    var s = `
            <table class="listSanPham">
                <tr> 
                    <th colspan="6">
                        <h3 style="text-align:center;"> Đơn hàng ngày: ` + new Date(dh.ngaymua).toLocaleString() + `</h3> 
                    </th>
                </tr>
                <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Thời gian thêm vào giỏ</th> 
                </tr>`;

    var totalPrice = 0;
    for (var i = 0; i < dh.sp.length; i++) {
        var masp = dh.sp[i].ma;
        var soluongSp = dh.sp[i].soluong;
        var p = timKiemTheoMa(list_products, masp);
        var price = (p.promo.name == 'giareonline' ? p.promo.value : p.price);
        var thoigian = new Date(dh.sp[i].date).toLocaleString();
        var thanhtien = stringToNum(price) * soluongSp;

        s += `
                <tr>
                    <td>` + (i + 1) + `</td>
                    <td class="noPadding imgHide">
                        <a target="_blank" href="chitietsanpham.html?` + p.name.split(' ').join('-') + `" title="Xem chi tiết">
                            ` + p.name + `
                            <img src="` + p.img + `">
                        </a>
                    </td>
                    <td class="alignRight">` + price + ` ₫</td>
                    <td class="soluong" >
                         ` + soluongSp + `
                    </td>
                    <td class="alignRight">` + numToString(thanhtien) + ` ₫</td>
                    <td style="text-align: center" >` + thoigian + `</td>
                </tr>
            `;
        totalPrice += thanhtien;
        tongSanPhamTatCaDonHang += soluongSp;
    }
    tongTienTatCaDonHang += totalPrice;

    s += `
                <tr style="font-weight:bold; text-align:center; height: 4em;">
                    <td colspan="4">TỔNG TIỀN: </td>
                    <td class="alignRight">` + numToString(totalPrice) + ` ₫</td>
                    <td > ` + dh.tinhTrang + ` </td>
                </tr>
            </table>
            <hr>
        `;
    div.innerHTML += s;
}

function timKiemTheoMa(list, ma) {
	for (var l of list) {
		if (l.masp == ma) return l;
	}
}
function numToString(num, char) {
    return num.toLocaleString().split(',').join(char || '.');
}

function stringToNum(str, char) {
    return Number(str.split(char || '.').join(''));
}