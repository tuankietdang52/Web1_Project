var currentUser; // user hien tai
  window.onload = function(){
    khoiTao();
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
				addProductToTable(currentUser);
    } else {
        // chưa đăng nhập thì hiện ra
        var warning = `<h2 style="color: red; font-weight:bold; text-align:center; font-size: 2em; padding: 50px;">
                            Bạn chưa đăng nhập !!
                        </h2>`;
        document.getElementsByClassName('listSanPham')[0].innerHTML = warning;
    }
}
  function addProductToTable(user) {
    var table = document.getElementsByClassName('listSanPham')[0];
  
    var s = `
        <tr>
          <th>STT</th>
          <th>Sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th>Thời gian</th>
          <th>Xóa</th>
        </tr>`;
        if (user.products.length == 0) {
           s += `
            <tr>
              <td colspan="7"> 
                <h1 style="color:green; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
                  Giỏ hàng trống !!
                </h1> 
              </td>
            </tr>
          `;
          table.innerHTML = s;

          return;
        }
    var tongtien =0;
    for (var i = 0; i < user.products.length; i++) {
      var masp = user.products[i].ma;
      var soluongSp = user.products[i].soluong;
      var p = timKiemTheoMa(list_products, masp);
      var price = (p.promo.name == 'giareonline' ? p.promo.value : p.price);
      var thoigian = new Date(user.products[i].date).toLocaleString();
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
					<button onclick="giamSoLuong('` + masp + `')"><i class="fa fa-minus"></i></button>
					<input size="1" onchange="capNhatSoLuongFromInput(this, '` + masp + `')" value=` + soluongSp + `>
					<button onclick="tangSoLuong('` + masp + `')"><i class="fa fa-plus"></i></button>
				</td>
				<td class="alignRight">` + numToString(thanhtien) + ` ₫</td>
				<td style="text-align: center" >` + thoigian + `</td>
				<td class="noPadding"> <i class="fa fa-trash" onclick="xoaSanPhamTrongGioHang(` + i + `)"></i> </td>
			</tr>
		`;
    tongtien += thanhtien;
	}
  s += `
  <tr style="font-weight:bold; text-align:center">
    <td colspan="4">TỔNG TIỀN: </td>
    <td class="alignRight">` + numToString(totalPrice) + ` ₫</td>
    <td class="thanhtoan" onclick="thanhToan()"> Thanh Toán </td>
    <td class="xoaHet" onclick="xoaHet()"> Xóa hết </td>
  </tr>
</tbody>
`;
table.innerHTML = s;

}
function xoaSanPhamTrongGioHang(i) {
	if (window.confirm('Xác nhận hủy mua')) {
		currentUser.products.splice(i, 1);
		capNhatMoiThu();
	}
}
function thanhToan() {
	if (!currentUser.products.length) {
		addAlertBox('Không có mặt hàng nào cần thanh toán !!', '#ffb400', '#fff', 2000);
		return;
	}
	if (window.confirm('Thanh toán giỏ hàng ?')) {
		currentUser.donhang.push({
			"sp": currentUser.products,
			"ngaymua": new Date(),
			"tinhTrang": 'Đang chờ xử lý'
		});
		currentUser.products = [];
		capNhatMoiThu();
		addAlertBox('Các sản phẩm đã được gửi vào đơn hàng và chờ xử lý.', '#17c671', '#fff', 4000);
	}
}
function xoaHet() {
	if (currentUser.products.length) {
		if (window.confirm('Bạn có chắc chắn muốn xóa hết sản phẩm trong giỏ !!')) {
			currentUser.products = [];
			capNhatMoiThu();
		}
	}
}
// Cập nhật số lượng lúc nhập số lượng vào input
function capNhatSoLuongFromInput(inp, masp) {
	var soLuongMoi = Number(inp.value);
	if (!soLuongMoi || soLuongMoi <= 0) soLuongMoi = 1;

	for (var p of currentUser.products) {
		if (p.ma == masp) {
			p.soluong = soLuongMoi;
		}
	}

	capNhatMoiThu();
}

function tangSoLuong(masp) {
	for (var p of currentUser.products) {
		if (p.ma == masp) {
			p.soluong++;
		}
	}

	capNhatMoiThu();
}   

function giamSoLuong(masp) {
	for (var p of currentUser.products) {
		if (p.ma == masp) {
			if (p.soluong > 1) {
				p.soluong--;
			} else {
				return;
			}
		}
	}

	capNhatMoiThu();
}

function capNhatMoiThu() { // Mọi thứ
	// cập nhật danh sách sản phẩm trong localstorage
	setCurrentUser(currentUser);
	updateListUser(currentUser);

	// cập nhật danh sách sản phẩm ở table
	addProductToTable(currentUser);

	// Cập nhật trên header
	capNhat_ThongTin_CurrentUser();
}

function timKiemTheoMa(list, ma) {
    for (var l of list) {
        if (l.masp == ma) return l;
    }
}
