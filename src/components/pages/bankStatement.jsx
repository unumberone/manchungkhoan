
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../styles/bankStatement/bankStatement.scss'
import moment from 'moment';

const bankStatement = () => {
  return (
    <div className="container">
      <div className="header-section">
        <div className="left__header">
          <h1 className="header--page text">Chuyển tiền Online</h1>
        </div>
      </div>

      <div className="search-form">
        {/* Form tìm kiếm */}
        <div className="form-group">
          <label htmlFor="account-select">Tài khoản</label>
          <select id="account-select" className="input-field">
            <option value="206582897">206582897</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="from-date">Từ ngày</label>
          <input type="date" id="from-date" className="input-field" />
        </div>

        <div className="form-group">
          <label htmlFor="to-date">Đến ngày</label>
          <input type="date" id="to-date" className="input-field" />
        </div>

        <div className="form-group">
          <button className="search-btn">Tìm kiếm</button>
        </div>
      </div>

      <div className="table__section">
        <Table
          
          pagination={false}
          rowKey="key"
        />
      </div>
    </div>
  )
}

export default bankStatement
