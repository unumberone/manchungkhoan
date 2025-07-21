import React, { useState } from 'react'
import '../styles/main/main.scss';
import data from '../../assets/data/context.json'
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiPencilSimpleLine } from "react-icons/pi";

const tab2 = [
  'Tài sản',
  '10 Giá',
  'Lịch sử giao dịch',
  'Mã phát sinh'
];

const handleOrderPlacement = (type) => {
  alert(`Đặt lệnh ${type} thành công!`);
}

const orderTypes = ['ATO', 'ATC', 'MOK', 'MTL', 'MAK'];

const tableData = [
  { label: 'Tổng lợi nhuận', value: '10,046.59' },
  { label: 'Mã hợp đồng', value: 'VN30F2501', highlight: true },
  { label: 'Vị thế', value: '--' },
  { label: 'Lãi lỗ', value: '2,046.59', positive: true },
  { label: 'Sức mua (357007)', value: '--' },
  { label: 'Lãi/lỗ chưa đóng', value: '--' },
  { label: 'Tổng tài sản', value: '120,000,0000' },
  { label: 'Tiền mặt', value: '--' },
  { label: 'Tiền ký quỹ tại VSD', value: '--' },
  { label: 'Ký quỹ ban đầu', value: '--' },
  { label: 'Phí giao dịch + thuế', value: '--' },
  { label: 'Tỷ lệ sử dụng TSKO', value: '--' },
  { label: 'Tỷ lệ an toàn', value: '100%' },
  { label: 'Phí trả VSD', value: '500.0' },
];

const getStatusClass = (status = '') => {
  if (status.includes('Chờ khớp')) return 'cho-khop';
  if (status.includes('Khớp hết')) return 'khop-het';
  if (status.includes('Chờ gửi lên Sở')) return 'Cho-gui-len-So';
  if (status.includes('Khớp 1 phần')) return 'khop-1-phan';
  if (status.includes('Lệnh đã bị huỷ')) return 'lenh-da-bi-huy';
  return 'mac-dinh';
};

const Main = () => {
  const [activeTab, setActiveTab] = useState('thuong');
  const [actions, setActions] = useState('trade');
  const [filteredData, setFilteredData] = useState(data);
  const [lenhType, setLenhType] = useState('Lệnh thường');
  const [orderStyle, setOrderStyle] = useState('ATO');
  const [price, setPrice] = useState(1220.3);
  const [volume, setVolume] = useState(1000.0);

  const handleDelete = (soHieuLenh) => {
    const newData = filteredData.filter(item => item.soHieuLenh !== soHieuLenh);
    setFilteredData(newData);
  };

  return (
    <div className="main-container">
      {/* LEFT PANEL - Chart */}
      <div className="left-panel">
        <div className="chart-container">
          <iframe
            src="https://streamprs.tvsi.com.vn:5000/chart?symbol=BVH"
            title=""
            style={{ height: '100%', width: '100%', border: 'unset' }}>
          </iframe>
        </div>

        {/* Order list section */}
        <div className="order-section">
          <div className="order-tabs">
            <button
              type="button"
              className={activeTab === "thuong" ? "active" : ""}
              onClick={() => setActiveTab("thuong")}
            >
              Danh sách lệnh thường
            </button>
            <button
              type="button"
              className={activeTab === "dieuKien" ? "active" : ""}
              onClick={() => setActiveTab("dieuKien")}
            >
              Danh sách lệnh điều kiện
            </button>
          </div>
          {/*form hiển thị các lệnh đã đặt */}
          <div className="order-table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Số hiệu lệnh</th>
                  <th>Thời gian</th>
                  <th>Client ID</th>
                  <th>Tài khoản</th>
                  <th>Lệnh</th>
                  <th>Mã CK</th>
                  <th>KL đạt</th>
                  <th>Kl khớp</th>
                  <th>Giá đặt</th>
                  <th>Trạng thái</th>
                  <th>Thời gian huỷ</th>
                  <th>Loại lệnh</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .filter((item) =>
                    activeTab === "thuong"
                      ? item.loaiLenh === "Lệnh thường"
                      : item.loaiLenh === "Lệnh điều kiện"
                  )
                  .map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td className="link">{item.soHieuLenh}</td>
                      <td>{item.thoiGian}</td>
                      <td>{item.clientId}</td>
                      <td>{item.taiKhoan}</td>
                      <td className={item.lenh === "Long" ? "green" : "red"}>
                        {item.lenh}
                      </td>
                      <td>{item.maCK}</td>
                      <td>{item.klDat}</td>
                      <td>{item.klKhop}</td>
                      <td>{item.giaDat}</td>
                      <td className={[getStatusClass(item.trangThai)]}>
                        {item.trangThai}
                      </td>
                      <td>{item.thoiGianHuy}</td>
                      <td>{item.loaiLenh}</td>
                      <td className="actions">
                        <button className="edit-btn">
                          <PiPencilSimpleLine />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item.soHieuLenh)}
                        >
                          <RiDeleteBin5Line />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* CENTER PANEL - Asset Information */}
      <div className="center-panel">
        <div className="asset-tabs">
          {tab2.map((menu, idx) => (
            <div className={`asset-tab${idx === 0 ? " active" : ""}`} key={idx}>
              {menu}
            </div>
          ))}
        </div>
        <div className="asset-content">
          {tableData.map((row, idx) => (
            <div className="asset-row" key={idx}>
              <div className="asset-label">{row.label}</div>
              <div
                className={
                  "asset-value" +
                  (row.positive ? " positive" : "") +
                  (row.negative ? " negative" : "") +
                  (row.highlight ? " highlight" : "")
                }
              >
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      {/* RIGHT PANEL - Trading Form */}
      <div className="right-panel">
        <div className="trading-form">
          <div className="form-tabs">
            <button
              className={actions === "trade" ? "active" : ""}
              onClick={() => setActions("trade")}
            >
              Giao dịch
            </button>
            <button
              className={actions === "setting" ? "active" : ""}
              onClick={() => setActions("setting")}
            >
              Cài đặt
            </button>
          </div>

          <div className="form-content">
            <div className="form-group">
              <label htmlFor="maChungKhoan">Mã chứng khoán</label>
              <select id="maCK" name="maCK">
                <option value="VN30F2501" selected>
                  VN30F2501
                </option>
                <option value="VN30F2502">VN30F2502</option>
                <option value="VN30F2503">VN30F2503</option>
              </select>
            </div>

            <div className="form-order-type">
              <button
                className={lenhType === "Lệnh thường" ? "active" : ""}
                onClick={() => setLenhType("Lệnh thường")}
              >
                Lệnh thường
              </button>
              <button
                className={lenhType === "Lệnh điều kiện" ? "active" : ""}
                onClick={() => setLenhType("Lệnh điều kiện")}
              >
                Lệnh điều kiện
              </button>
            </div>

            <div className="form-order-style">
              {orderTypes.map((type) => (
                <button
                  key={type}
                  className={orderStyle === type ? "active" : ""}
                  onClick={() => setOrderStyle(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="form-input">
              <label>Giá đặt</label>
              <div className="input-control">
                <button
                  onClick={() => setPrice((prev) => Math.max(1, prev - 0.1))}
                >
                  −
                </button>
                <span>{price.toFixed(1)}</span>
                <button onClick={() => setPrice((prev) => prev + 0.1)}>
                  +
                </button>
              </div>
            </div>

            <div className="form-input">
              <label>Khối lượng</label>
              <div className="input-control">
                <button
                  onClick={() => setVolume((prev) => Math.max(1, prev - 100))}
                >
                  −
                </button>
                <span>{volume.toFixed(1)}</span>
                <button onClick={() => setVolume((prev) => prev + 100)}>
                  +
                </button>
              </div>
            </div>

            <div className="form-action">
              <button
                className="long-btn"
                onClick={() => handleOrderPlacement("Long")}
              >
                Long
              </button>
              <button
                className="short-btn"
                onClick={() => handleOrderPlacement("Short")}
              >
                Short
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;