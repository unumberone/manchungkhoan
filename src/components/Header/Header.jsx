import React, { useState } from 'react';
import '../styles/header/header.scss';
import company from '../../assets/image/company.svg';
import vietnam from '../../assets/image/vietnam.svg';
import vector from '../../assets/image/vector.svg';


const tabs = [
  'Giao dịch phát sinh',
  'Chuyển tiền',
  'Sao kê tiền',
  'Danh mục tài sản',
  'Thông tin tài khoản'
];

const Header = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <header className="header">
      {/* Bên trái: logo và tabs */}
      <div className="left-section">
        <div className="logo">
          <img src={company} alt="Navi Software Logo" />
        </div>
        <nav className="nav-tabs">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`nav-item ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </div>
          ))}
        </nav>
      </div>

      {/* Bên phải: thông tin tài khoản */}
      <div className="right-section">
        <p className="title">xin chào, sangdd02</p>
        <div className="account-controls">
          <div className="account-dropdown">
            <select>
              <option>0025458 - Do Duy Sang</option>
            </select>
          </div>
          <div className="language-selector">
            <img
              src={vietnam}
              alt="Vietnam Flag"
              className="flag-icon"
            />
            <select>
              <option>VN</option>
              <option>EN</option>
            </select>
          </div>
          <div className="logout-btn">
            <img
              src={vector}
              alt="Logout Icon"
              className="flag-icon"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
