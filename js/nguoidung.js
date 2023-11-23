
var currentUser;
var tongTienTatCaDonHang = 0;
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
        var warning = `<h2 style="color: red; font-weight:bold; text-align:center; font-size: 2em; padding: 50px;">
                            Bạn chưa đăng nhập !!
                        </h2>`;
        document.getElementsByClassName('infoUser')[0].innerHTML = warning;
    }
    

}


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
            <td> <input type="text" value="" readonly> </td>
            <td></td>
        </tr>
        <tr>
            <td>Số lượng sản phẩm đã mua: </td>
            <td> <input type="text" value="" readonly> </td>
            <td></td>
        </tr>
    </table>`;
}


function openChangePass(){
    var khungChangePass = document.querySelector('#khungDoiMatKhau');
    var actived = khungChangePass.classList.contains('active');
    if ( actived )
    khungChangePass.classList.remove('active');
    else
    khungChangePass.classList.add('active');
}



// function changePass(){
//     var khungChangePass = document.querySelector('#khungDoiMatKhau');
//     var tagInput = khungChangePass.getElementsByTagName('input');
//     // kiểm tra mật khẩu cũ là phần tử thứ 0 
//     if ( tagInput[0].value != currentUser.pass){
//         alert('Sai mật khẩu !!!');
//         tagInput[0].focus();
//         return;
//     }
//     // Nhắc nhở password mới là phần tử thứ 1
//     if ( tagInput[1] ==''){
//         alert('Chưa nhập mật khẩu mới !!!')
//         tagInput[1].focus();
//         return;
//     }
//     // Xác nhận mật khẩu mới là phẩn tử thứ 2
//     if ( tagInput[2] != tagInput[1]){
//         alert('Mật khẩu không khớp !!!')
//         tagInput[2].focus();
//         return;
//     }

//     var copyCurrentUser = copyOject(currentUser);
//     currentUser.pass = tagInput[1].value;
//     // cập nhật list sản phẩm trong localstorage
//     setCurrentUser(currentUser);
//     updateListUer(copyCurrentUser,currentUser);  
    
//     // cập nhật trên header 
//     capNhat_ThongTin_CurrentUser();

//     // Thông báo
//     addAlertBox('thay đổi mật khẩu mật thành công.','#5f5','#000',4000)
//     openChangePass();
// }
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


 function changeInfo(iTag,info){
    var inputTag = iTag.parentElement.previousElementSibling.getElementsByTagName('input');


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
    
}

