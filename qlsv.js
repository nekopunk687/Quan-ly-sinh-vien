var danhSachSV = layDuLieu("dataSinhVien");

function hienThiSinhVien() {
    var bang = document.getElementById("bangSinhVien");
    bang.innerHTML = "";

    for (var i = 0; i < danhSachSV.length; i++) {
        var sv = danhSachSV[i];
        var tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${sv.ma}</td>
            <td>${sv.ten}</td>
            <td>${sv.ngaySinh}</td>
            <td>${sv.khoa}</td>
            <td>${sv.lop}</td>
            <td><button class="delete-btn" onclick="xoaSinhVien('${sv.ma}')">Xóa</button></td>
        `;
        bang.appendChild(tr);
    }
}

document.getElementById("formThemSV").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var svMoi = {
        ma: document.getElementById("maSV").value,
        ten: document.getElementById("tenSV").value,
        ngaySinh: document.getElementById("ngaySinh").value,
        khoa: document.getElementById("khoa").value,
        lop: document.getElementById("lop").value
    };

    var isTrungMa = false;
    for (var i = 0; i < danhSachSV.length; i++) {
        if (danhSachSV[i].ma === svMoi.ma) {
            isTrungMa = true;
            break;
        }
    }

    if (isTrungMa) {
        alert("Mã sinh viên đã tồn tại! Vui lòng nhập mã khác.");
        return;
    }

    danhSachSV.push(svMoi);
    luuDuLieu("dataSinhVien", danhSachSV);
    document.getElementById("formThemSV").reset();
    hienThiSinhVien();
});

function xoaSinhVien(maSV) {
    if (confirm("Bạn có chắc muốn xóa sinh viên mã " + maSV + "?")) {
        var mangMoi = [];
        for (var i = 0; i < danhSachSV.length; i++) {
            if (danhSachSV[i].ma !== maSV) {
                mangMoi.push(danhSachSV[i]);
            }
        }
        danhSachSV = mangMoi;
        luuDuLieu("dataSinhVien", danhSachSV);
        hienThiSinhVien();
    }
}

hienThiSinhVien();