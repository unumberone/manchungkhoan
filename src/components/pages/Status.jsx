import React from 'react';
import "../styles/status/status.scss";
import Success from "../../assets/image/success.svg";
import Fail from "../../assets/image/fail.svg";
import Error from "../../assets/image/error.svg";

const STATUS = {
  SUCCESS: {
    img: Success,
    title: "Chuyển tiền thành công",
    primary: "Trang chủ",
    secondary: "Giao dịch khác",
  },
  ERROR: {
    img: Fail,
    title: "Chuyển tiền chưa thành công!",
    primary: "Trang chủ",
    secondary: "Thực hiện lại",
  },
  WARNING: {
    img: Error,
    title: "Chuyển tiền gặp lỗi",
    primary: "Trang chủ",
    secondary: "Thực hiện lại",
  },
};

const Status = ({ open, type, onPrimary, onSecondary }) => {
  if (!open) return null;
  const conf = STATUS[type];

  return (
    <div className="overlay">
      <div className="modal">
        <img src={conf.img} alt={type} className="status-icon" />
        <h3>{conf.title}</h3>
        

         <div className="form-footer status-footer">
          <button className="cancel-btn" onClick={onPrimary}>{conf.primary}</button>
          <button
            className="submit-btn"
            disabled={!onSecondary}
            onClick={onSecondary}
           
          >
            {conf.secondary}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Status;