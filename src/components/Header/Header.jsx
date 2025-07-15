import React, { useState } from 'react';
import '../styles/header/header.scss'; 
import logo from '../../assets/image/logo.png'; 

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
      <div className="logo">
        <img src={logo} alt="Navi Software Logo" />
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
      <div className="title">
        <p>xin chào, sangdd02</p>
      </div>
        
    </header>
  );
};

export default Header;
