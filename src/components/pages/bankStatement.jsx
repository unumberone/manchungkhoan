import React, { useState } from 'react';
import { Table, Button, Select, DatePicker } from 'antd'; 
import '../styles/bankStatement/bankStatement.scss';

import dayjs from 'dayjs'

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const BankStatement = () => {
  const [account, setAccount] = useState('206582897');
  const [fromDate, setFromDate] = useState(dayjs('29/08/2024', dateFormat));
  const [toDate, setToDate] = useState(dayjs('29/10/2024', dateFormat));

  const data = [
    {key: '1',time: '03/05/2021, 00:00',increase: 10000000,decrease: 0,cumulative: 10000000,note: 'Nộp tiền tại quầy',},
    {key: '2',time: '12/05/2021, 00:00',increase: 10000000,decrease: 0,cumulative: 10000000, note: 'Nộp tiền tại quầy',},
    {key: '3',time: '20/05/2021, 00:00',increase: 10000000,decrease: 0,cumulative: 10000000,note: 'Nộp tiền tại quầy',},
    {key: '4',time: '24/05/2021, 00:00',increase: 10000000,decrease: 0,cumulative: 10000000,note: 'Nộp tiền tại quầy',},
    {key: '5',time: '31/05/2021, 00:00',increase: 10000000,decrease: 0,cumulative: 10000000,note: 'Nộp tiền tại quầy',},
  ];

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Phát sinh tăng',
      dataIndex: 'increase',
      key: 'increase',
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Phát sinh giảm',
      dataIndex: 'decrease',
      key: 'decrease',
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Số dư lũy kế',
      dataIndex: 'cumulative',
      key: 'cumulative',
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Diễn giải',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  //tạo form hiển thị thông số
  const indexData = [
    {
      id: 1,
      'numberFirst': '0',
      'numberLast': '100',
      stats: {up: 200, down: 200}
    }
  ];

  return (
    <div className="container">
      <div className="page-bg">
        <div className="header-section">
        <div className="left__header">
          <h1 className="header--page text">Sao kê tiền</h1>
        </div>
      </div>
      {/*thêm menu*/}
    <div className="section-switcher">
    <div className="section-switcher__item section-switcher__item--active">Số dư tại CTCK</div>
    <div className="section-switcher__item">Số dư tại VSD</div>
    <div className="section-switcher__item">Sao kê lãi/lỗ</div>
    <div className="section-switcher__item">Sao kê phí thuế</div>
    </div>



      <div className="search-form statement-search">
        <div className="form-group">
          <label htmlFor="account-select">Tài khoản</label>
          <select id="account-select" className="input-field">
            <option value="206582897">206582897</option>
          </select>
        </div>
        {/*xử lí form chọn ngày/tháng/năm */}
        <div className="form-group">
          <label htmlFor="from-date">Từ ngày</label> 
          <DatePicker
            id="from-date"
            value={fromDate}
            onChange={setFromDate}
            format={dateFormat}
            className="input-field"/>
        </div>

        <div className="form-group">
          <label htmlFor="to-date">Đến ngày</label>
          <DatePicker
            id="to-date"
            value={toDate}
            onChange={setToDate}
            format={dateFormat}
            className="input-field"/>
        </div>

        <div className="form-group">
          <Button type="primary" className="search-button">Tìm kiếm</Button>
        </div>
      </div>


          <div className="form-group">
          <div className="statement-summary">
            {indexData.map((index) => (
              <div className="statement-summary__card" key={index.id}>
                <div className="statement-summary__group">
                  <div className="statement-summary__item">
                    <div className="statement-summary__label">Số đầu kỳ</div>
                    <div className="statement-summary__value">{index.numberFirst}</div>
                  </div>
                  <div className="statement-summary__item">
                    <div className="statement-summary__label">Số cuối kỳ</div>
                    <div className="statement-summary__value statement-summary__value--bold">
                      {index.numberLast}
                    </div>
                  </div>
                  <div className="statement-summary__item">
                    <div className="statement-summary__label">Phát sinh tăng</div>
                    <div className="statement-summary__value statement-summary__value--up">
                      ↑ {index.stats.up}
                    </div>
                  </div>
                  <div className="statement-summary__item">
                    <div className="statement-summary__label">Phát sinh giảm</div>
                    <div className="statement-summary__value statement-summary__value--down">
                      ↓ {index.stats.down}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      <div className="table__section bank">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
      </div>
    </div>
  );
};

export default BankStatement;
