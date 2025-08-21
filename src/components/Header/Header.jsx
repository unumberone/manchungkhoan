import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/header/header.scss';
import company from '../../assets/image/company.svg';
import vietnam from '../../assets/image/vietnam.svg';
import vector from '../../assets/image/vector.svg';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const tabs = [
  { label: 'Giao dịch phát sinh', path: '/giao-dich-phat-sinh' },
  { label: 'Chuyển tiền', path: '/chuyen-tien' },
  { label: 'Sao kê tiền', path: '/sao-ke-tien' },
  { label: 'Danh mục tài sản', path: '/danh-muc-tai-san' },
  { label: 'Thông tin tài khoản', path: '/thong-tin-tai-khoan' }
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      {/* Left section */}
      <div className="left-section">
        <div className="logo">
          <img src={company} alt="Navi Software Logo" />
        </div>

        {/* Desktop menu */}
        <nav className="nav-tabs">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`nav-item ${location.pathname === tab.path ? 'active' : ''}`}
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </div>
          ))}
        </nav>

        {/* Mobile toggle button */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </div>
      </div>

      {/* Right section */}
      <div className="right-section">
        <p className="title">xin chào, sangdd02</p>
        <div className="account-controls">
          <div className="account-dropdown">
            <select>
              <option>0025458 - Do Duy Sang</option>
            </select>
          </div>
          <div className="language-selector">
            <img src={vietnam} alt="Vietnam Flag" className="flag-icon" />
            <select>
              <option>VN</option>
              <option>EN</option>
            </select>
          </div>
          <div className="logout-btn">
            <img src={vector} alt="Logout Icon" className="flag-icon" />
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`mobile-item ${location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => {
              navigate(tab.path);
              setMenuOpen(false); // đóng menu sau khi chọn
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
