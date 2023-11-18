window.onload = function(){
    let tabHeader =  document.querySelector(".tab-header");
    let tabHeaderElements =  document.querySelectorAll(".tab-header > a");
    let tabBody =  document.querySelector(".tab-body");
    let tabBodyElements =  document.querySelectorAll(".tab-body > div");
    let tabuser = document.querySelectorAll(".user > a");
    let div = document.getElementsByClassName("containTaikhoan")[0];
    let tabclose = document.getElementsByClassName("close");
    console.log(tabclose);
    tabuser[0].addEventListener("click",function() {
        div.style.transform='scale(1)';
            });
    tabclose[0].addEventListener("click",function(){
        div.style.transform='scale(0)';
    });
    for(let i = 0; i <tabHeaderElements.length;i++) {
    tabHeaderElements[i].addEventListener("click",function(){
        tabHeader.querySelector(".active").classList.remove("active");
        tabHeaderElements[i].classList.add("active");
        tabBody.querySelector(".active").classList.remove("active");
        tabBodyElements[i].classList.add("active");
    });
    }
    capNhat_ThongTin_CurrentUser();

}
// đối tượng user
function User(username, pass, ho, ten, email, products, donhang) {
	this.ho = ho || '';
	this.ten = ten || '';
	this.email = email || '';
	this.username = username;
	this.pass = pass;
	this.products = products || [];
	this.donhang = donhang || [];
}

function equalUser(u1, u2) {
	return (u1.username == u2.username && u1.pass == u2.pass);
}
// end đôi tượng user
var adminInfo =[{
    "username" :  "admin",
    "pass"  :"adadad"
}]
function getListAdmin(){
    return JSON.parse(window.localStorage.getItem('ListAdmin'));
}
function setListAdmin(l) {
    window.localStorage.setItem('ListAdmin', JSON.stringify(l));
}
// --------------------------- Form login ----------------------------------- 

// Hàm get set cho người dùng đã login vào trang
function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser'));  //Lấy dữ liệu từ localstorage
}

function setCurrentUser(user) {
    window.localStorage.setItem('CurrentUser', JSON.stringify(user));
}

// Hàm get set cho người dùng
function getListUser(){
    var data = JSON.parse(window.localStorage.getItem('ListUser')) || []
    var l = [] ;
    for ( var d of data ){
        l.push(d);
    }
    return l;
}

function setListUser(l, callback) {
    window.localStorage.setItem('ListUser', JSON.stringify(l));
    if (callback) {
        callback();
    }
}

//  Hàm update User sau khi chỉnh sửa thông tin gì đó 
function updateListUser(user,newData){
    var list = getListUser();
    for ( var i =0;ilist.length;i++){
        if ( equalUser(user,list[i]) ){
        list[i] = (newData ? newData :user)
    }
}
    setListUser(list);
}

function logIn(form){
    // get dữ liệu từ form
   var name = form.username.value;
   var pass = form.pass.value;
   var newUser = new User(name,pass);

    // lấy dữ liệu list User in localStorage
   var listUser = getListUser();

   for ( var u of listUser ){
       if ( equalUser(newUser,u)){
           if ( u.off){    
               alert('tài khoản này đang bị khóa,không thể đăng nhập')
               return false;
           }
           setCurrentUser(u);
        //   Reload lại trang - sau khi reload sẽ cập nhật luôn giỏ hàng khi hàm setupEventTaiKhoan chạy
           location.reload();
           return false;
       }
   }

   alert('Nhập sai tên tài khoản hoặc mật khẩu !!!');
   form.username.focus();
   return false;
}

function signUp(form){
    var ho = form.ho.value;
    var ten = form.ten.value;
    var email = form.email.value;
    var username = form.newUser.value;  
    var pass= form.newPass.value;
    var newUser = new User(username,pass,ho,ten,email);


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
            return false
        }
    }

    //  Lưu user đăng kí mới vào localStorage
    listUser.push(newUser);
    window.localStorage.setItem('ListUser',JSON.stringify(listUser));
    
    // Đăng nhập vào tài khoản vừa tạo
    window.localStorage.setItem('CurrentUser',JSON.stringify(newUser));
    alert('Đăng kí thành công, tự động đăng nhập!!')
    location.reload();

    return false;

}   
// Tải lại trang sau khi đăng xuất
function logOut(){
    window.localStorage.removeItem('CurrentUser');
    location.reload();
}

// HIển thi form tài khoản , giá trụ truyền vào true hoặc false trong application local
function showTaiKhoan(show) {
    var value = (show ? "scale(1)" : "scale(0)");
    var div = document.getElementsByClassName('containTaikhoan')[0];
    div.style.transform = value;
}

function capNhat_ThongTin_CurrentUser() {

    var u = getCurrentUser();

    //  Get the menuUser element
    var menuUser = document.getElementsByClassName('menuUser')[0];

    if (u) {
        var userElement = document.getElementsByClassName('user')[0];


        if (userElement) {
            var usernameNode = userElement.getElementsByTagName('a')[0].childNodes[2];

            if (usernameNode) {
                usernameNode.nodeValue = ' ' + u.username;
            }

            //  Hiển thị menu người dùng
            menuUser.style.display = 'block';
        }
    } else if (menuUser) {
        //  User is not logged in, ẩn menu người dùng
        menuUser.style.display = 'none';
    }
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

            <form onsubmit="return logIn(this);">

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

            <form onsubmit="return signUp(this);">

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