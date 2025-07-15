import React from 'react'
import '../styles/main/main.scss';
import data from '../../assets/data/context.json'

const tab2 = [
  'Tài sản',
  '10 Giá',
  'Lịch sử giao dịch',
  'Mã phát sinh'
];

const tableData = [
  { label: 'Tổng lợi nhuận', value: '10,046.59' },
  { label: 'Mã hợp đồng', value: 'VN30F2501', highlight: true },
  { label: 'Vị thế', value: '-' },
  { label: 'Lãi lỗ', value: '2,046.59', positive: true },
  { label: 'Sức mua (357007)', value: '-' },
  { label: 'Lãi/lỗ chưa đóng', value: '-' },
  { label: 'Tổng tài sản', value: '120,000,0000' },
  { label: 'Tiền mặt', value: '-' },
  { label: 'Tiền ký quỹ tại VSD', value: '-' },
  { label: 'Ký quỹ ban đầu', value: '-' },
  { label: 'Phí giao dịch + thuế', value: '-' },
  { label: 'Tỷ lệ sử dụng TSKO', value: '-' },
  { label: 'Tỷ lệ an toàn', value: '100%' },
  { label: 'Phí trả VSD', value: '500.0' },
];

const Main = () => {
  return (
    <div>
    <div className="contain">
      <div className="do-thi">
        <iframe
          height="504"
          width="1102"
          src="https://ssltvc.investing.com/?pair_ID=1&height=504&width=1102&interval=300&plotStyle=hollow_candles&domain_ID=52&lang_ID=52&timezone_ID=21"
        ></iframe>
      </div>
      <div className="table">
        <div className="tab-name">
          {tab2.map((menu, idx) => (
            <div className={`tab-item${idx === 0 ? ' active' : ''}`} key={idx}>
              {menu}
            </div>
          ))}
        </div>
        <div className="table-content">
          {tableData.map((row, idx) => (
            <div className="row" key={idx}>
              <div className="label">{row.label}</div>
              <div
                className={
                  'value' +
                  (row.positive ? ' positive' : '') +
                  (row.negative ? ' negative' : '') +
                  (row.highlight ? ' highlight' : '')
                }
              >
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="chart">
    ( )
    </div>
    </div>
  );
};

export default Main;