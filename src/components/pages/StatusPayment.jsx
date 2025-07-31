// SuccessModal.jsx
import React from 'react';
import '../styles/statusPayment/statusPayment.scss';

const StatusPayment = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Giao dịch thành công!</h2>
        <p>Số tiền đã được chuyển thành công.</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default StatusPayment ;
