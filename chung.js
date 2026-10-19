// 1. Hàm Đăng nhập
function xuLyDangNhap(event) {
    event.preventDefault();
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    if (user === "admin" && pass === "123") {
        localStorage.setItem("daDangNhap", "true");
        window.location.href = "trangchu.html";
    } else {
        document.getElementById("thongBaoLoi").innerText = "Sai tài khoản hoặc mật khẩu!";
    }
}

// 2. Hàm Đăng xuất
function xuLyDangXuat() {
    localStorage.removeItem("daDangNhap");
    window.location.href = "dangnhap.html";
}

// 3. Bảo vệ trang (Nếu chưa đăng nhập thì không cho vào)
if (window.location.pathname.includes("trangchu") || 
    window.location.pathname.includes("qlsv") || 
    window.location.pathname.includes("qlkhoalop") || 
    window.location.pathname.includes("qldiem")) {
    
    if (localStorage.getItem("daDangNhap") !== "true") {
        window.location.href = "dangnhap.html";
    }
}

// 4. Hàm dùng chung để Đọc dữ liệu từ LocalStorage
function layDuLieu(key) {
    var data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

// 5. Hàm dùng chung để Lưu dữ liệu vào LocalStorage
function luuDuLieu(key, mangDuLieu) {
    localStorage.setItem(key, JSON.stringify(mangDuLieu));
}