import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/information/information.scss";

// demo info – giữ nguyên như bạn có
const info = {
  taiKhoan: "123456789",
  tenKhachHang: "Lê Thị Cẩm",
  soGiayTo: "001036895923",
  ngayCap: "15/08/2017",
  noiCap: "Cục CS QLHC về TTXH",
  diaChi: "123 Nguyễn Trãi, Quận 1, TP.HCM",
  dienThoai1: "0979 179 792",
  dienThoai2: "0979 179 792",
  email: "trungkien@gmail.com",
  khachHang: "Cá nhân trong nước",
  chiNhanh: "Hà Đông",
  moiGioi: "Phạm Đức Dũng",
};


const items = [
  { key: "notInLast3", text: "Không trùng với 3 mật khẩu gần nhất." },
  { key: "lengthOK", text: "Bao gồm từ 6 - 32 ký tự." },
  { key: "hasUpperLower", text: "Có chứa ký tự chữ hoa và chữ thường." },
  { key: "hasDigit", text: "Có chứa ký tự số." },
  { key: "hasSpecial", text: "Có ký tự đặc biệt." },
];

const Information = ({ onClose, onSubmit, password, prevPasswords }) => {
  const [trangThai, setTrangThai] = useState("thongTinChung");

  // nếu cha KHÔNG truyền password, dùng state cục bộ cho ô "Mật khẩu mới"
  const [localPwd, setLocalPwd] = useState("");
  const pwd = typeof password === "string" ? password : localPwd;

  // chuẩn hóa lịch sử mật khẩu để tránh undefined
  const history = Array.isArray(prevPasswords) ? prevPasswords : [];

  // tính các rule cho checklist
  const rules = useMemo(() => {
    const last3 = history.slice(0, 3).filter(Boolean).map(String);
    const notInLast3 = pwd.length > 0 && !last3.includes(pwd);
    const lengthOK = pwd.length >= 6 && pwd.length <= 300;
    const hasUpperLower = /[A-Z]/.test(pwd) && /[a-z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

    return { notInLast3, lengthOK, hasUpperLower, hasDigit, hasSpecial };
  }, [pwd, history]);


  

  const [open, setOpen] = useState(false);

   const navigate = useNavigate();      
   const allOk = Object.values(rules).every(Boolean) && (() => {
    alert("Cập nhật mật khẩu thành công và back về trang đầu");
    onClose?.();
    return true;
    })();


    const handleSubmit = (e) => {
    e.preventDefault();
    if (!allOk) return;                   
    onSubmit?.();                       
    alert("Cập nhật mật khẩu thành công và back về trang đầu");
    navigate("/");                    
  };

    const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="info">
    <div className="modal-overlay"  onClick={onClose}>
      <div className="form-oder-type" onClick={(e) => e.stopPropagation()}>
        <div className="oder-tabs">
          <button-btn
            type="button-btn"
            className={trangThai === "thongTinChung" ? "active" : ""}
            onClick={() => setTrangThai("thongTinChung")}
          >
            Thông tin chung
          </button-btn>
          <button-btn
            type="button-btn"
            className={trangThai === "doiMatKhau" ? "active" : ""}
            onClick={() => setTrangThai("doiMatKhau")}
          >
            Đổi mật khẩu
          </button-btn>
        </div>

        {trangThai === "thongTinChung" ? (
          <div className="panel">
            <div className="panel-note">
              Các thông tin liên lạc được sử dụng để gửi thư, chuyển phát hay
              gọi điện/fax liên lạc mỗi khi cần.
            </div>

            <div className="info-card">
              <div className="info-grid">
                <div className="cell">
                  <div className="label">Tài khoản</div>
                  <div className="value">{info.taiKhoan}</div>
                </div>
                <div className="cell">
                  <div className="label">Tên khách hàng</div>
                  <div className="value">{info.tenKhachHang}</div>
                </div>
                <div className="cell">
                  <div className="label">Số CCCD/Hộ chiếu</div>
                  <div className="value">{info.soGiayTo}</div>
                </div>
                <div className="cell">
                  <div className="label">Ngày cấp</div>
                  <div className="value">{info.ngayCap}</div>
                </div>
                <div className="cell">
                  <div className="label">Nơi cấp</div>
                  <div className="value">{info.noiCap}</div>
                </div>
                <div className="cell">
                  <div className="label">Địa chỉ</div>
                  <div className="value">{info.diaChi}</div>
                </div>
                <div className="cell">
                  <div className="label">Điện thoại</div>
                  <div className="value">{info.dienThoai1}</div>
                </div>
                <div className="cell">
                  <div className="label">Điện thoại</div>
                  <div className="value">{info.dienThoai2}</div>
                </div>
                <div className="cell">
                  <div className="label">Email</div>
                  <div className="value">{info.email}</div>
                </div>
                <div className="cell">
                  <div className="label">Khách hàng</div>
                  <div className="value">{info.khachHang}</div>
                </div>
                <div className="cell">
                  <div className="label">Chi nhánh</div>
                  <div className="value">{info.chiNhanh}</div>
                </div>
                <div className="cell">
                  <div className="label">Nhân viên môi giới</div>
                  <div className="value">{info.moiGioi}</div>
                </div>
              </div>
            </div>

            <div className="actions">
              <button type="button" className="btn ghost" onClick={onClose}>
                Hủy
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={onSubmit || (() => {})}
              >
                Cập nhật
              </button>
            </div>
          </div>
        ) : (
          <form
            className="panel  onSubmit={handleSubmit}"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit && onSubmit();
            }}
          >
            <div className="panel-note">
                  Phương thức xác thực nhanh bằng vân tay/khuôn mặt sẽ bị vô
                  hiệu hóa sau khi đổi mật khẩu. <br />
                  Quý khách vui lòng thiết lập lại trên ứng dụng.
                </div>
            <div className="fields">
              <div className="field">
                <label>Mật khẩu hiện tại</label>
                <input type="password" placeholder="Nhập..." />
              </div>

              <div className="field">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="Nhập..."
                  value={pwd}
                  onChange={(e) => setLocalPwd(e.target.value)}
                />
              </div>

              <ul className="pw-checklist">
                {items.map((it) => (
                  <li
                    key={it.key}
                    className={`rule ${rules[it.key] ? "ok" : ""}`}
                  >
                    {it.text}
                  </li>
                ))}
              </ul>

              <div className="field">
                <label>Nhập lại mật khẩu mới</label>
                <input type="password" placeholder="Nhập..." />
              </div>
            </div>

            <div className="actions">
              <button type="button-btn" className="btn ghost" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn primary" disabled={!allOk}>
                Cập nhật
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default Information;
