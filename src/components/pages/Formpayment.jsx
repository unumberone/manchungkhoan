import React, { useState } from 'react';
import '../styles/payment/payment.scss'; 
import StatusPayment from '../pages/StatusPayment';
import Vietcombank from '../../../src/assets/image/vietcombank.svg';
import Agribank from '../../../src/assets/image/agribank.svg';
import Bidv from '../../../src/assets/image/bidv.svg';
import Techcombank from '../../../src/assets/image/techcombank.svg';
import TPBank from '../../../src/assets/image/TPbank.svg';

const TransferForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    bank: '',
    name: '',
    amount: '',
    content: '',
  });

  const [transferType, setTransferType] = useState('ngan-hang');

  const canSubmit =
    formData.accountNumber &&
    formData.bank &&
    formData.amount &&
    Number(formData.amount) > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //hàm xử lí trạng thái khi click vào tiếp tục
    const handleSubmit = async () => {
      // Kiểm tra lại điều kiện trước khi gửi
      if (!canSubmit) return;

      try {
        console.log('Đang xử lý giao dịch...');

        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Giao dịch thành công');
        onSuccess();
      } catch (error) {
        console.error('Lỗi khi thực hiện giao dịch:', error);
        alert('Có lỗi xảy ra khi chuyển tiền');
      }
    };

  return (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="transfer-form-wrapper" onClick={(e) => e.stopPropagation()}>
      <h2 className="form-title">Chuyển khoản</h2>

      {/* Radio chọn loại chuyển khoản */}
      <table className="transfer-table">
        <tbody>
          <tr>
            <td colSpan={2}>
              <label>
                <input
                  type="radio"
                  checked={transferType === 'ngan-hang'}
                  onChange={() => setTransferType('ngan-hang')}
                />
                Chuyển tiền ra ngân hàng
              </label>
              <label style={{ marginLeft: '16px' }}>
                <input
                  type="radio"
                  checked={transferType === 'noi-bo'}
                  onChange={() => setTransferType('noi-bo')}
                />
                Chuyển tiền nội bộ
              </label>
            </td>
          </tr>

          {/* User info and form fields */}
          <tr>
            <td className="label-cell">Họ tên:</td>
            <td className="value-cell">Do Duy Sang</td>
          </tr>
          <tr>
            <td className="label-cell">CCCD/Hộ chiếu:</td>
            <td className="value-cell">012*****265</td>
          </tr>
          <tr>
            <td className="label-cell">TKCK chuyển:</td>
            <td className="value-cell">
              <select>
                <option value={1}>6666888801</option>
                <option value={2}>6666888802</option>
                <option value={3}>6666888803</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="label-cell">Tài khoản nhận:</td>
            <td>
              <input
                type="text"
                name="accountNumber"
                placeholder="Tài khoản nhận"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label-cell">Ngân hàng:</td>
            <td>
              <select name="bank" value={formData.bank} onChange={handleChange}>
                <option value="">Chọn ngân hàng</option>
                <option value="VCB">Vietcombank</option>
                <option value="TCB">Techcombank</option>
                <option value="BIDV">BIDV</option>
                <option value="TPB">TPBank</option>
                <option value="AGB">Agribank</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="label-cell">Họ tên người nhận:</td>
            <td>
              <input
                type="text"
                name="name"
                placeholder="Họ tên người nhận"
                value={formData.name}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="label-cell">Số tiền chuyển:</td>
            <td>
              <input
                type="number"
                name="amount"
                placeholder="Số tiền chuyển"
                value={formData.amount}
                onChange={handleChange}
              />
              <div className="available">
                Số tiền có thể chuyển: <span>100,000,000 VND</span>
                <span className="transfer-all">Chuyển tất cả</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="label-cell">Nội dung chuyển:</td>
            <td>
              <textarea
                name="content"
                maxLength={200}
                placeholder="Nội dung chuyển"
                value={formData.content}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer buttons - must be outside of the table */}
      <div className="form-footer">
        <button className="cancel-btn" onClick={onCancel}>
          Hủy
        </button>
        <button className="submit-btn" disabled={!canSubmit} onClick={handleSubmit}>
          Tiếp tục
        </button>
      </div>
    </div>
  </div>
);
};

export default TransferForm;
