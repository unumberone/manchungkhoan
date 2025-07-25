import React from 'react';
import '../styles/Footer/footer.scss'; 
import { FaRegUserCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span>Trạng thái <FaRegUserCircle /></span>
        <span className="status-connected">Connected</span>
      </div>
      <div className="footer-right">
        Navisoft
      </div>
    </footer>
  );
};

export default Footer;
