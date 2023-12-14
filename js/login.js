// khởi tạo khi load trang
function khoiTao(){
    adminInfo = getListAdmin() || adminInfo;
    list_products = getProductData() || list_products;
    EventLogin();
    capNhat_ThongTin_CurrentUser();
}
window.onload = function(){
        khoiTao();
}


function EventLogin(){
    let tabHeader =  document.querySelector(".tab-header");
    let tabHeaderElements =  document.querySelectorAll(".tab-header > a");
    let tabBody =  document.querySelector(".tab-body");
    let tabBodyElements =  document.querySelectorAll(".tab-body > div");
    let tabuser = document.querySelectorAll(".user > a");
    let div = document.getElementsByClassName("containTaikhoan")[0];
    let tabclose = document.getElementsByClassName("close");
    tabuser[0].addEventListener("click", function() {
        // Check if the user is logged in
        if (!getCurrentUser()) {
            // If not logged in, show the login form
            div.style.transform = 'scale(1)';
        }
    });
 
    tabclose[0].addEventListener("click", function() {
        div.style.transform = 'scale(0)';
    });

    for(let i = 0; i <tabHeaderElements.length;i++) {
    tabHeaderElements[i].addEventListener("click",function(){
        tabHeader.querySelector(".active").classList.remove("active");
        tabHeaderElements[i].classList.add("active");
        tabBody.querySelector(".active").classList.remove("active");
        tabBodyElements[i].classList.add("active");
    });
    }
}

// --------------------------- Form login ----------------------------------- 
//  Hàm update User sau khi chỉnh sửa thông tin gì đó 
function updateListUser(u, newData) {
    var list = getListUser();
    for (var i = 0; i < list.length; i++) {
        if (equalUser(u, list[i])) {
            // duyệt mảng user để cập nhật lại dữ liệu mới 
            list[i] = (newData ? newData : u);
        }
    }
    setListUser(list);
}

function logIn() {
    // get dữ liệu từ form
    var name = document.getElementsByName('name')[0].value;
    var pass = document.getElementsByName('pass')[0].value;
    var newUser = new User(name, pass);

    // lấy dữ liệu list User in localStorage
    var listUser = getListUser();

    for (var u of listUser) {
        if (equalUser(newUser, u)) {
            if (u.isLocked) {
                alert('tài khoản này đang bị khóa, không thể đăng nhập');
                return false;
            }
            setCurrentUser(u);
            // Reload lại trang - sau khi reload sẽ cập nhật luôn giỏ hàng khi hàm setupEventTaiKhoan chạy
            location.reload();
            return false;
        }
    }
    // đăng nhập vào admin thông báo chào admin
    for ( var ad of adminInfo){
        if ( equalUser(newUser,ad) ){
            alert('Xin chào admin..');

            window.localStorage.setItem('admin', true);
            window.location.assign('admin.html');
            return false;
        }
    }
    // nhập sai thì trỏ về tên tài khoản nhập lại
    alert('Nhập sai tên tài khoản hoặc mật khẩu !!!');
    form.username.focus();
    return false;
}


function signUp(){

    var ho = document.getElementsByName('ho')[0].value;
    var ten = document.getElementsByName('ten')[0].value;
    var email = document.getElementsByName('email')[0].value;
    var username = document.getElementsByName('newUser')[0].value;
    var pass = document.getElementsByName('newPass')[0].value;

    let isLocked = false;

    var newUser = new User(username,pass,ho,ten,email,isLocked);


    //  lấy dữ liệu từ các user hiện có
    var listUser = getListUser();

    //  kiểm tra trùng admin
    for (var ad of adminInfo) {
        if (newUser.username === ad.username) {
            alert('Tên đăng nhập đã có người sử dụng !!');
            return false;
        }
    }


    //  kiểm tra xem dữ liệu form có trùng với khách hàng đã có chưa  
    for ( var u of listUser){
        if ( newUser.username === u.username){
            alert('Tên đăng nhập đã có người sử dụng !!');
            return false;
        }
    }

    //  Lưu user đăng kí mới vào localStorage
    listUser.push(newUser);
    window.localStorage.setItem('ListUser',JSON.stringify(listUser));
    
    // Đăng nhập vào tài khoản vừa tạo
    window.localStorage.setItem('CurrentUser',JSON.stringify(newUser));
    alert('Đăng kí thành công, tự động đăng nhập!!')
    // tải lại trang và đăng nhập vào tải khoản vừa tạo
    location.reload();
    return false;

}  

// Tải lại trang sau khi đăng xuất
function logOut(){
    window.localStorage.removeItem('CurrentUser');
    location.reload();
}


function addContainTaiKhoan(){
document.write(`<div class="containTaikhoan">
<span class="close" /*onclick="showTaiKhoan(false);"*/>&times;</span>
<div class="tab-form">
    <div class="tab-header">
        <a class="tab active"href="#login">Đăng nhập</a>
        <a class="tab" href="#signup">Đăng kí</a>
    </div> <!-- /tab group -->

    <div class="tab-body">
        <div class="signIn active">
            <h1>Chào mừng bạn trở lại!</h1>

            <form onsubmit="return logIn();">

                <div class="field-wrap">
                    <input name='username' type="text" required autocomplete="off" placeholder="Tên đăng nhập "/>
                </div> <!-- /user name -->

                <div class="field-wrap">
                    <input name="pass" type="password" required autocomplete="off" placeholder="Mật khẩu"/>
                </div> <!-- pass -->

                <p class="forgot"><a href="#">Quên mật khẩu?</a></p>

                <button type="submit" class="button button-block" />Tiếp tục</button>

            </form> <!-- /form -->

        </div> <!-- /log in -->

        <div class="signUp ">
            <h1>Đăng kí</h1>

            <form onsubmit="return signUp();">

                <div class="top-row">
                    <div class="field-wrap">
                        <input name="ho" type="text" required autocomplete="off" placeholder="Họ"/>
                    </div>
                    <div class="field-wrap">
                        <input name="ten" type="text" required autocomplete="off" placeholder="Tên"/>
                    </div>
                </div> <!-- / ho ten -->

                <div class="field-wrap">
                    <input name="email" type="email" required autocomplete="off" placeholder="Email"/>
                </div> <!-- /email -->

                <div class="field-wrap">
                    <input name="newUser" type="text" required autocomplete="off" placeholder="Tên đăng nhập"/>
                </div> <!-- /user name -->

                <div class="field-wrap">
                    <input name="newPass" type="password" required autocomplete="off" placeholder="Mật khẩu"/>
                </div> <!-- /pass -->

                <button type="submit" class="button button-block" />Tạo tài khoản</button>

            </form> <!-- /form -->

        </div> <!-- /sign up -->
    </div><!-- tab-content -->

</div> <!-- /taikhoan -->`)
}
