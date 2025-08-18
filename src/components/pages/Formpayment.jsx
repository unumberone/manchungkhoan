import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { BaseDropdownBank } from "../../../src/baseComponents/BaseDropdownBank";
import '../styles/payment/payment.scss';
import Status from '../pages/Status'; 


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

// utils
const digitsOnly = (s = "") => s.replace(/[^\d]/g, "");
const toVND = (n = 0) => Number(n).toLocaleString('vi-VN');

/** Modal xác nhận chuyển khoản (Portal) */
function ConfirmOrderModal({ open, onClose, onConfirm, payload }) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal__overlay" onClick={onClose}>
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h3>Xác nhận chuyển khoản</h3>
          <button className="modal__close" onClick={onClose} aria-label="Đóng">×</button>
        </div>

        <div className="modal__body transfer-confirm">
          <div className="section">
            <div className="section-title">LOẠI CHUYỂN TIỀN</div>
            <div className="row">
              <span className="label">{payload.transferType === 'ngan-hang' ? 'Chuyển tiền ra ngân hàng' : 'Chuyển tiền nội bộ'}</span>
            </div>
          </div>

          <div className="section">
            <div className="section-title">NGƯỜI CHUYỂN KHOẢN</div>
            <div className="info-grid">
              <div className="item">
                <span className="label">Họ tên</span>
                <span className="value">Do Duy Sang</span>
              </div>
              <div className="item">
                <span className="label">CCCD/Hộ chiếu</span>
                <span className="value">012*****265</span>
              </div>
              <div className="item">
                <span className="label">TKCK chuyển</span>
                <span className="value">6666888801</span>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">NGƯỜI NHẬN TIỀN</div>
            <div className="info-grid">
              <div className="item">
                <span className="label">Tài khoản nhận</span>
                <span className="value">{payload.accountNumber || '--'}</span>
              </div>
              <div className="item">
                <span className="label">Tên ngân hàng</span>
                <span className="value bank">
                  {/* icon hiển thị nếu có */}
                  {payload.bankOption?.icon && <img src={payload.bankOption.icon} alt="" />}
                  {payload.bankOption?.label || '--'}
                </span>
              </div>
              <div className="item">
                <span className="label">Họ và tên</span>
                <span className="value">{payload.name || '--'}</span>
              </div>
              <div className="item">
                <span className="label">Số tiền chuyển</span>
                <span className="value">{toVND(payload.amountNum)} VND</span>
              </div>
              <div className="item" style={{ gridColumn: '1 / -1' }}>
                <span className="label">Nội dung chuyển</span>
                <span className="value">{payload.content || '--'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Hủy</button>
          <button className="btn btn--primary" onClick={onConfirm}>Xác nhận</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

const TransferForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    bank: '',     // value của bankOptions
    name: '',
    amount: '',
    content: '',
  });

  const [transferType, setTransferType] = useState('ngan-hang');

  // số tiền (number) đã làm sạch
  const amountNum = useMemo(() => {
    const n = Number(digitsOnly(formData.amount));
    return Number.isFinite(n) ? n : 0;
  }, [formData.amount]);

  const isMaxedOut = amountNum >= MAX_BALANCE;

  // modal state
  const [showConfirm, setShowConfirm] = useState(false);

  // điều kiện hợp lệ để bật nút "Tiếp tục"
  const canSubmit =
    /^\d+$/.test(formData.accountNumber.trim()) &&
    formData.bank.trim() !== '' &&
    !Number.isNaN(amountNum) &&
    amountNum > 0;

  const handleCloseConfirm = () => setShowConfirm(false);

  const handleConfirm = async () => {
  try {
    await new Promise((r) => setTimeout(r, 500)); // giả lập API
    setShowConfirm(false);

    // random trạng thái
    const list = ["SUCCESS", "ERROR", "WARNING"];
    const pick = list[Math.floor(Math.random() * list.length)];
    setModal(pick);
  } catch (err) {
    console.error('Lỗi khi thực hiện giao dịch:', err);
    setShowConfirm(false);
    setModal("ERROR");
  }
};


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

  // gợi ý số tiền theo tiền tố
  const amountSuggestions = useMemo(() => {
    if (!formData.amount || isMaxedOut) return [];
    const base = parseInt(digitsOnly(formData.amount), 10);
    if (!base) return [];
    const exps = [3, 4, 5, 6, 7, 8, 9];
    return exps
      .map((e) => base * 10 ** e)
      .filter((v) => v !== amountNum && v < MAX_BALANCE)
      .slice(0, 6);
  }, [formData.amount, amountNum, isMaxedOut]);

  const handlePickSuggestion = (v) =>
    setFormData((p) => ({ ...p, amount: String(Math.min(v, MAX_BALANCE)) }));

  // bấm Tiếp tục -> mở modal nếu hợp lệ
  const handleSubmit = () => {
    if (!canSubmit) return;
    setShowConfirm(true);
  };

  // lấy object bank từ options để hiện logo + tên trong modal
  const selectedBankObj = useMemo(
    () => bankOptions.find((b) => b.value === formData.bank),
    [formData.bank]
  );

  //xử lí trạng thái modal
   const [modal, setModal] = useState("none");

   

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="transfer-form-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <div className="left__header">
            <h2>Chuyển khoản</h2>
          </div>
          <div className="right__header">
            <p><a href="0"><h5>Hướng dẫn giao dịch tiền 24/7</h5></a></p>
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

            {/* Tên ngân hàng */}
            <tr>
              <td colSpan={2}>
                <div className="field-block">
                  <div className="field-label">Tên ngân hàng</div>
                  <BaseDropdownBank
                    value={formData.bank}
                    onChange={(val) => setFormData(prev => ({ ...prev, bank: val }))}
                    options={bankOptions}
                    placeholder="Chọn"
                  />
                </div>
              </td>
            </tr>

            {/* Họ tên người nhận */}
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

            {/* Nội dung chuyển */}
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
          <button
            className="submit-btn"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Tiếp tục
          </button>
        </div>
      </div>

      {/* Modal xác nhận */}
      <ConfirmOrderModal
        open={showConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirm}
        payload={{
          transferType,
          accountNumber: formData.accountNumber,
          bankOption: selectedBankObj,
          name: formData.name,
          amountNum,
          content: formData.content,
        }}
      />

      {["SUCCESS", "ERROR", "WARNING"].includes(modal) && (
        <Status
          open
          type={modal}                     // "SUCCESS" | "ERROR" | "WARNING"
          onPrimary={() => setModal("none")}
          onSecondary={() => setModal("none")}
        />
      )}
    </div>
  );
};

export default TransferForm;
