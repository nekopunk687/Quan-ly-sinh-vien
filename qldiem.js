var danhSachSV = layDuLieu("dataSinhVien");
var danhSachDiem = layDuLieu("dataDiem"); 

function taiDanhSachLop() {
    var selectLop = document.getElementById("chonLopDiem");
    var mangLop = [];
    
    for (var i = 0; i < danhSachSV.length; i++) {
        if (mangLop.includes(danhSachSV[i].lop) === false) {
            mangLop.push(danhSachSV[i].lop);
        }
    }

    for (var i = 0; i < mangLop.length; i++) {
        var option = document.createElement("option");
        option.value = mangLop[i];
        option.innerText = mangLop[i];
        selectLop.appendChild(option);
    }
}

function tinhDiemTB(qt, gk, ck) {
    if (qt === "" || gk === "" || ck === "") return "";
    var diemTB = (parseFloat(qt) * 0.1) + (parseFloat(gk) * 0.4) + (parseFloat(ck) * 0.6);
    return diemTB.toFixed(2);
}

function hienThiBangDiem() {
    var lopDaChon = document.getElementById("chonLopDiem").value;
    var bang = document.getElementById("bangDiem");
    bang.innerHTML = "";

    if (lopDaChon === "") {
        bang.innerHTML = "<tr><td colspan='7'>Vui lòng chọn lớp để xem bảng điểm.</td></tr>";
        return;
    }

    for (var i = 0; i < danhSachSV.length; i++) {
        var sv = danhSachSV[i];
        if (sv.lop === lopDaChon) {
            
            var diemCuaSV = null;
            for (var j = 0; j < danhSachDiem.length; j++) {
                if (danhSachDiem[j].maSV === sv.ma) {
                    diemCuaSV = danhSachDiem[j];
                    break;
                }
            }

            var qt = diemCuaSV ? diemCuaSV.qt : "";
            var gk = diemCuaSV ? diemCuaSV.gk : "";
            var ck = diemCuaSV ? diemCuaSV.ck : "";
            var diemTB = tinhDiemTB(qt, gk, ck);

            var tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${sv.ma}</td>
                <td>${sv.ten}</td>
                <td><input type="number" id="qt_${sv.ma}" value="${qt}" min="0" max="10" step="0.1" style="width: 70px;"></td>
                <td><input type="number" id="gk_${sv.ma}" value="${gk}" min="0" max="10" step="0.1" style="width: 70px;"></td>
                <td><input type="number" id="ck_${sv.ma}" value="${ck}" min="0" max="10" step="0.1" style="width: 70px;"></td>
                <td><b id="tb_${sv.ma}">${diemTB}</b></td>
                <td><button class="edit-btn" onclick="luuDiem('${sv.ma}')">Lưu Điểm</button></td>
            `;
            bang.appendChild(tr);
        }
    }
}

function luuDiem(maSV) {
    var qt = document.getElementById("qt_" + maSV).value;
    var gk = document.getElementById("gk_" + maSV).value;
    var ck = document.getElementById("ck_" + maSV).value;

    if (qt === "" || gk === "" || ck === "") {
        alert("Vui lòng nhập đủ 3 đầu điểm!");
        return;
    }

    document.getElementById("tb_" + maSV).innerText = tinhDiemTB(qt, gk, ck);

    var daCoDiem = false;
    for (var i = 0; i < danhSachDiem.length; i++) {
        if (danhSachDiem[i].maSV === maSV) {
            danhSachDiem[i].qt = qt;
            danhSachDiem[i].gk = gk;
            danhSachDiem[i].ck = ck;
            daCoDiem = true;
            break;
        }
    }

    if (daCoDiem === false) {
        danhSachDiem.push({ maSV: maSV, qt: qt, gk: gk, ck: ck });
    }

    luuDuLieu("dataDiem", danhSachDiem);
    alert("Đã lưu điểm cho sinh viên " + maSV);
}

taiDanhSachLop();