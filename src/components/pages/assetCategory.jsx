import React, { useState } from 'react';
import { Table, Select, Button, Row, Col } from 'antd';
import '../styles/assetCategory/assetCategory.scss';

const { Option } = Select;

const AssetCategory = () => {
  const [account, setAccount] = useState('206582897');
  const [symbol, setSymbol] = useState('VN30FAU2');

 const col1 = [
  { title: 'Tiền mặt', value: '100,000,123,456.79' },
  { title: 'Tiền chưa thanh toán', value: '0' },
  { title: 'Tổng phí giao dịch + thuế', value: '3,143,640.9' },
  { title: 'Phí giao dịch (trả sổ)', value: '0' },
  { title: 'Phí giao dịch (FOS)', value: '0' },
  { title: 'Thuế', value: '0' },
  { title: 'Phí quản lý vị thế', value: '485,500' },
];

const col2 = [
  { title: 'Tiền ký quỹ', value: '9,990,000,000,000' },
  { title: 'Giá trị CK ký quỹ', value: '0' },
  { title: 'Tài sản hợp lệ', value: '10,089,770,356,350.79' },
  { title: 'Tiền mặt có thể rút', value: '10,089,770,356,350.79' },
  { title: 'Số tiền cần bổ sung', value: '0' },
  { title: 'Tài sản ròng', value: '10,089,770,356,350.79' },
  { title: 'Phí quản lý TS ký quỹ', value: '500,000' },
];

const col3 = [
  { title: 'Ký quỹ ban đầu (IM)', value: '0' },
  { title: 'Ký quỹ chuyển giao (DM)', value: '0' },
  { title: 'Lãi lỗ (V/IM)', value: '2,030,000' },
  { title: 'Tiền ký quỹ có thể rút (80%)', value: '9,990,000,000,000' },
  { title: 'Khoản hợp tác', value: '120,000' },
  { title: 'Sức mua', value: '361,159' },
];

const col4 = [
  { title: 'Tổng tài sản', value: '0' },
  { title: 'Tỷ lệ tài khoản (VSD)', value: '0' },
  { title: 'Trạng thái tài khoản', value: '0' },
  { title: 'Ký quỹ yêu cầu (MR)', value: '1,570,320.45' },
  { title: 'Tiền chờ VSD xử lý', value: '0' },
];


const column = [col1, col2, col3, col4];

// 2) Đệm ô trống để các cột có cùng số hàng (giữ hàng thẳng + chiều cao bằng nhau)
const maxLen = Math.max(...column.map(c => c.length));
const paddedCols = column.map(c => [
  ...c,
  ...Array.from({ length: maxLen - c.length }, () => null),
]);



  const tableData = Array.from({ length: 5 }).map((_, i) => ({
    key: i + 1,
    orderType: i % 2 === 0 ? 'Long' : 'Short',
    symbol: 'VN30FAU2',
    im: 17,
    range: 7,
    vol: '1,000',
    position: 1,
    avgPrice: 1.2,
    marketPrice: 1.2203,
    estMargin: 0,
    imVal: 17,
    vmVal: '230,000',
    dmVal: 0,
    mrVal: 0,
  }));

  const columns = [
    {
      title: 'Lệnh',
      dataIndex: 'orderType',
      key: 'orderType',
      render: (val) => (
        <span style={{ color: val === 'Long' ? 'green' : 'red' }}>{val}</span>
      ),
    },
    { title: 'Mã CK', dataIndex: 'symbol', key: 'symbol' },
    { title: 'Tỉ lệ IM', dataIndex: 'im', key: 'im' },
    { title: 'Biên độ', dataIndex: 'range', key: 'range' },
    { title: 'KL ký quỹ', dataIndex: 'vol', key: 'vol' },
    { title: 'Vị thế', dataIndex: 'position', key: 'position' },
    { title: 'Giá TB', dataIndex: 'avgPrice', key: 'avgPrice' },
    { title: 'Giá TT', dataIndex: 'marketPrice', key: 'marketPrice' },
    { title: 'Ký quỹ ban đầu dự kiến', dataIndex: 'estMargin', key: 'estMargin' },
    { title: 'IM', dataIndex: 'imVal', key: 'imVal' },
    { title: 'VM', dataIndex: 'vmVal', key: 'vmVal' },
    { title: 'DM', dataIndex: 'dmVal', key: 'dmVal' },
    { title: 'MR', dataIndex: 'mrVal', key: 'mrVal' },
  ];

  return (
    <div className="container">
      {/* Header */}
      <h1 className="header--page text">Quản lý danh mục tài sản</h1>
     

      {/* Filters */}
      <div className="search-form">
        <div className="tab">
          <h5>Tài khoản</h5>
          <Select  className='input-field' value={account} onChange={setAccount} style={{ width: 180, marginRight: 12 }} title='Tài khoản'>
          <Option value="206582897">206582897</Option>
        </Select>
        </div>
        <div className="tab">
          <h5>Mã chứng khoán</h5>
          <Select className='input-field' value={symbol} onChange={setSymbol} style={{ width: 180, marginRight: 12 }}>
          <Option value="VN30FAU2">VN30FAU2</Option>
        </Select>
        </div>
        <div className="actions-search">
          <button type="button-btn" className="btn ghost" >Tìm kiếm</button>
         </div>
      </div>

      <div className="asset__body">
          <div className="tab-bar text" style={{ marginTop: 20, marginBottom: 20 }}>
        <span className="tab active">Tài sản và sức mua</span>
        <span className="tab">Số dư chứng khoán</span>
      </div>

              {/* Asset Summary in 4 Columns */}
            <Row gutter={[4, 10]}>
            {paddedCols.map((col, colIdx) => (
            <Col xs={24} md={12} lg={6} key={colIdx}>
              {col.map((item, i) => (
                <div className="summary-item" key={i}>
                  {item ? (
                    <>
                      <span className="summary-label" title={item.title}>{item.title}</span>
                      <span className="summary-value">{item.value}</span>
                    </>
                  ) : (
                    <>
                      <span className="summary-label" style={{ visibility: 'hidden' }}>.</span>
                      <span className="summary-value" style={{ visibility: 'hidden' }}>.</span>
                    </>
                  )}
                </div>
              ))}
            </Col>
          ))}
        </Row>
      {/* Table */}
      <div className="table__section" style={{ marginTop: 24 }}>
        <Table columns={columns} dataSource={tableData} pagination={false} />
      </div>
      </div>
    </div>
  );
};

export default AssetCategory;
