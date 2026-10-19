var danhSachSV = layDuLieu("dataSinhVien");

function taiDanhSachKhoa() {
    var selectKhoa = document.getElementById("chonKhoa");
    var mangKhoa = [];
    for (var i = 0; i < danhSachSV.length; i++) {
        if (mangKhoa.includes(danhSachSV[i].khoa) === false) {
            mangKhoa.push(danhSachSV[i].khoa);
        }
    }

    for (var i = 0; i < mangKhoa.length; i++) {
        var option = document.createElement("option");
        option.value = mangKhoa[i];
        option.innerText = mangKhoa[i];
        selectKhoa.appendChild(option);
    }
}

function capNhatLop() {
    var khoaDaChon = document.getElementById("chonKhoa").value;
    var selectLop = document.getElementById("chonLop");
    selectLop.innerHTML = '<option value="">-- Tất cả Lớp --</option>';

    if (khoaDaChon === "") {
        hienThiDanhSach();
        return;
    }

    var mangLop = [];
    for (var i = 0; i < danhSachSV.length; i++) {
        if (danhSachSV[i].khoa === khoaDaChon) {
            if (mangLop.includes(danhSachSV[i].lop) === false) {
                mangLop.push(danhSachSV[i].lop);
            }
        }
    }

    for (var i = 0; i < mangLop.length; i++) {
        var option = document.createElement("option");
        option.value = mangLop[i];
        option.innerText = mangLop[i];
        selectLop.appendChild(option);
    }

    hienThiDanhSach();
}

function hienThiDanhSach() {
    var khoaDaChon = document.getElementById("chonKhoa").value;
    var lopDaChon = document.getElementById("chonLop").value;
    var bang = document.getElementById("bangKetQua");
    bang.innerHTML = "";

    var stt = 1;
    for (var i = 0; i < danhSachSV.length; i++) {
        var sv = danhSachSV[i];
        
        var dungKhoa = (khoaDaChon === "" || sv.khoa === khoaDaChon);
        var dungLop = (lopDaChon === "" || sv.lop === lopDaChon);

        if (dungKhoa && dungLop) {
            var tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${stt}</td>
                <td>${sv.ma}</td>
                <td>${sv.ten}</td>
                <td>${sv.ngaySinh}</td>
                <td><button class="delete-btn" onclick="xoaKhoiDanhSach('${sv.ma}')">Xóa</button></td>
            `;
            bang.appendChild(tr);
            stt++;
        }
    }
}

function xoaKhoiDanhSach(maSV) {
    if (confirm("Xóa sinh viên mã " + maSV + " khỏi danh sách?")) {
        var mangMoi = [];
        for (var i = 0; i < danhSachSV.length; i++) {
            if (danhSachSV[i].ma !== maSV) {
                mangMoi.push(danhSachSV[i]);
            }
        }
        danhSachSV = mangMoi;
        luuDuLieu("dataSinhVien", danhSachSV);
        location.reload(); 
    }
}

taiDanhSachKhoa();
hienThiDanhSach();