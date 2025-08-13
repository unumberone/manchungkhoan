import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import {BaseDropdownBank} from "../../../src/baseComponents/BaseDropdownBank";
import '../styles/payment/payment.scss';
import StatusPayment from '../pages/StatusPayment';
import Vietcombank from '../../../src/assets/image/vietcombank.svg';
import Agribank from '../../../src/assets/image/agribank.svg';
import Bidv from '../../../src/assets/image/bidv.svg';
import Techcombank from '../../../src/assets/image/techcombank.svg';
import TPBank from '../../../src/assets/image/TPbank.svg';



// lựa chọn ngân hàng với icon
const bankOptions = [
  { value: "VCB", label: "Vietcombank", icon: Vietcombank },
  { value: "TCB", label: "Techcombank", icon: Techcombank },
  { value: "BIDV", label: "BIDV", icon: Bidv },
  { value: "TPB", label: "TPBank", icon: TPBank },
  { value: "AGB", label: "Agribank", icon: Agribank },
];

const MAX_BALANCE = 100_000_000_000;      
   

// Chỉ giữ lại chữ số trong chuỗi
// Ví dụ: "1.234.567" -> "1234567"
// Hàm này dùng để làm sạch đầu vào của số tiền
const digitsOnly = (s = "") => s.replace(/[^\d]/g, "");
const toVND = (n = 0) => Number(n).toLocaleString('vi-VN');

const TransferForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    bank: '',
    name: '',
    amount: '',    
    content: '',
  });

  const [transferType, setTransferType] = useState('ngan-hang');

  // số tiền (number) đã làm sạch
  const amountNum = React.useMemo(() => {
  const n = Number(digitsOnly(formData.amount));
  return Number.isFinite(n) ? n : 0;
}, [formData.amount]);

const isMaxedOut = amountNum >= MAX_BALANCE; 

  const canSubmit =
    formData.accountNumber &&
    formData.bank &&
    amountNum > 0;

  const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === "amount") {
    const raw = digitsOnly(value);
    if (!raw) {
      setFormData((p) => ({ ...p, amount: "" }));
      return;
    }
    const n = Math.min(parseInt(raw, 10), MAX_BALANCE); 
    setFormData((p) => ({ ...p, amount: String(n) }));
  } else {
    setFormData((p) => ({ ...p, [name]: value }));
  }
};

  const handleSetAll = () =>
  setFormData((p) => ({ ...p, amount: String(MAX_BALANCE) }));

  // Gợi ý theo tiền tố: gõ "1" -> 1.000, 10.000, 100.000, ...
  const amountSuggestions = React.useMemo(() => {
  if (!formData.amount || isMaxedOut) return [];        //  đạt max thì không gợi ý
  const base = parseInt(digitsOnly(formData.amount), 10);
  if (!base) return [];

  const exps = [3, 4, 5, 6, 7, 8, 9];
  return exps
    .map((e) => base * 10 ** e)
    .filter((v) => v !== amountNum && v < MAX_BALANCE)  //  không vượt MAX
    .slice(0, 6);
}, [formData.amount, amountNum, isMaxedOut]);

  const handlePickSuggestion = (v) =>
  setFormData((p) => ({ ...p, amount: String(Math.min(v, MAX_BALANCE)) })); 

  //hàm xử lí trạng thái khi click vào tiếp tục
  const handleSubmit = async () => {
    if (!canSubmit) return;
    try {
      await new Promise(resolve => setTimeout(resolve, 1));
      onSuccess();
    } catch (error) {
      console.error('Lỗi khi thực hiện giao dịch:', error);
      alert('Có lỗi xảy ra khi chuyển tiền');
    }
  };

  

  

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="transfer-form-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <div className="left__header">
            <h2>Chuyển khoản</h2>
          </div>
          <div className="right__header">
            <p><a href=""><h5>Hướng dẫn giao dịch tiền 24/7</h5></a></p>
          </div>
        </div>

        <table className="transfer-table">
          <tbody>
            {/* Radio chọn loại chuyển khoản */}
            <tr>
              <td colSpan={2} className='bgc__button'>
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

            {/* NGƯỜI CHUYỂN KHOẢN */}
            <tr>
              <td colSpan={2}>
                <div className="section-title">NGƯỜI CHUYỂN KHOẢN</div>
                <div className="remitter">
                  <div className="remitter-item">
                    <div className="remitter-label">Họ tên</div>
                    <div className="remitter-value">Do Duy Sang</div>
                  </div>
                  <div className="remitter-item">
                    <div className="remitter-label">CCCD/Hộ chiếu</div>
                    <div className="remitter-value">012*****265</div>
                  </div>
                  <div className="remitter-item">
                    <div className="remitter-label">TKCK chuyển</div>
                    <select>
                      <option value={1}>6666888801</option>
                      <option value={2}>6666888802</option>
                      <option value={3}>6666888803</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>

            {/* NGƯỜI NHẬN TIỀN */}
            <tr>
              <td colSpan={2} className='bgc__button'>
                <div className="section-title">NGƯỜI NHẬN TIỀN</div>
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <div className="field-block">
                  <div className="field-label">Tài khoản nhận</div>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Chọn"
                    value={formData.accountNumber}
                    onChange={handleChange}
                  />
                </div>
              </td>
            </tr>
            <div className="section-title">Tên ngân hàng</div>
           <BaseDropdownBank
            value={formData.bank}
            onChange={(val) => setFormData(prev => ({ ...prev, bank: val }))}
            options={bankOptions}
            placeholder="Chọn"
           />

            <tr>
              <td colSpan={2} className='bgc__button'>
                <div className="field-block">
                  <div className="field-label">Họ tên</div>
                  <input
                    type="text"
                    name="name"
                    placeholder="--"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </td>
            </tr>

            {/* SỐ TIỀN CHUYỂN + GỢI Ý */}
            <tr>
            <td colSpan={2} className="bgc__button">
              <div className="field-block">
                <div className="field-label">Số tiền chuyển</div>

                <div className="amount-input-wrap">
                  <input
                    type="text"
                    inputMode="numeric"
                    name="amount"
                    placeholder="Nhập..."
                    value={formData.amount}
                    onChange={handleChange}
                  />
                  <span className="suffix">VND</span>
                </div>

                            {!isMaxedOut && amountSuggestions.length > 0 && (  
                  <div className="amount-suggestions">
                    {amountSuggestions.map((v) => (
                      <button
                        key={v}
                        type="button"
                        className="suggest-chip"
                        onClick={() => handlePickSuggestion(v)}
                        title={toVND(v)}
                      >
                        {toVND(v)}
                      </button>
                    ))}
                  </div>
                )}

                  
      <div className="available">
        Số tiền có thể chuyển: <span>{toVND(MAX_BALANCE)} VND</span>
        <button type="button" className="transfer-all" onClick={handleSetAll}>
          Chuyển tất cả
        </button>
      </div>
    </div>
  </td>
</tr>

            <tr>
              <td colSpan={2} className='bgc__button'>
                <div className="field-block">
                  <div className="field-label">Nội dung chuyển</div>
                  <textarea
                    name="content"
                    maxLength={200}
                    placeholder="Nhập..."
                    value={formData.content}
                    onChange={handleChange}
                  />
                  <div className="char-count">{formData.content.length}/200</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer buttons */}
        <div className="form-footer">
          <button className="cancel-btn" onClick={onCancel}>Hủy</button>
          <button className="submit-btn" disabled={!canSubmit} onClick={handleSubmit}>
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;
