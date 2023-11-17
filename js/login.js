window.onload = function(){
    let tabHeader =  document.querySelector(".tab-header");
    let tabHeaderElements =  document.querySelectorAll(".tab-header > a");
    let tabBody =  document.querySelector(".tab-body");
    let tabBodyElements =  document.querySelectorAll(".tab-body > div");
    let tabuser = document.querySelectorAll(".user-option > a");
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