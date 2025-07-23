import React from 'react';
import '../styles/subheader/subheader.scss';

const indexData = [
  {
    name: 'VN-INDEX',
    value: '1,283.26',
    change: '+15.96 1.26%',
    changeColor: 'green',
    volume: '895,786,314 Cổ phần',
    valueTrade: '21,396.060 Tỷ',
    waiting: 'Chờ nhận lệnh',
    stats: { up: 200, valueUp: 4, noChange: 59, down: 111, valueDown: 0 }
  },
  {
    name: 'VN30',
    value: '1,372.04',
    change: '+19.79 1.46%',
    changeColor: 'green',
    volume: '482,264,152 Cổ phần',
    valueTrade: '13,283.441 Tỷ',
    waiting: 'Chờ nhận lệnh',
    stats: { up: 27, valueUp:0, noChange: 1, down: 2,valueDown:0 }
  },
  {
    name: 'VNXALL',
    value: '0',
    change: '0 0%',
    changeColor: 'gray',
    volume: '905,524,492 Cổ phần',
    valueTrade: '21,524.209 Tỷ',
    waiting: 'Chờ nhận lệnh',
    stats: { up: 241,valueUp:0, noChange: 94, down: 123,valueDown:0 }
  },
  {
    name: 'HNX-INDEX',
    value: '216.04',
    change: '+1.91 0.89%',
    changeColor: 'green',
    volume: '56,598,636 Cổ phần',
    valueTrade: '933.220 Tỷ',
    waiting: 'Chờ nhận lệnh',
    stats: { up: 104,valueUp:10, noChange: 69, down: 56,valueDown:4 }
  },
  {
    name: 'HNX-UPCOMINDEX',
    value: '93.59',
    change: '+0.19 0.20%',
    changeColor: 'green',
    volume: '46,870,777 Cổ phần',
    valueTrade: '1,509.460 Tỷ',
    waiting: 'Chờ nhận lệnh',
    stats: { up: 192, valueUp:14, noChange: 76, valueDown: 4 }
  }
];

const MarketStats = () => {
  return (
    <div className="container">
      <div className="market-stats">
        {indexData.map((index, i) => (
          <div className="market-card" key={i}>
            <div className="row">
              <div className="left">
                <div className="name">{index.name}</div>
                <div className="volume">{index.volume}</div>
                <div className="stats">
                  <span className="up">↑ {index.stats.up}</span>
                  <span className='valueUp'>({index.stats.valueUp})</span>
                  <span className="nochange"> ■ {index.stats.noChange}</span>
                  <span className="down">↓ {index.stats.down}</span>
                  <span className='valueDown'>({index.stats.valueDown})</span>
                </div>
              </div>
              <div className="right">
                <div className={`value-change ${index.changeColor}`}>
                  {index.value} <span>({index.change})</span>
                </div>
                <div className="value-trade">{index.valueTrade}</div>
                <div className="waiting">{index.waiting}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="stock-row">
        <div className="MS">
          <div className="code">Mã CK</div>
          <div className="cell code MSCP">VN30F2501</div>
        </div>
        <div className="days">Ngày
          <div className="cell">12 - 04 - 2024</div>
        </div>
        <div className="tran">Trần
          <div className="cell highlight-purple">1,220.3</div>
        </div>
        <div className="san">Sàn
          <div className="cell highlight-blue">950.0</div>
        </div>
        <div className="TC">T/C
          <div className="cell highlight-orange">1,050.0</div>
        </div>
        <div className="KL-khop">KL Khớp
          <div className="cell">--</div>
        </div>
        <div className="no-per"> +/-
          <div className="cell highlight-orange">0.00</div>
        </div>
        <div className="per"> +/-(%)
          <div className="cell highlight-orange">0.00%</div></div>
          <div className="total">Tổng KL
            <div className="cell">--</div>
          </div>
          <div className="hight">Cao
            <div className="cell">--</div>
          </div>
        <div className="low">Thấp
           <div className="cell">--</div>
        </div>
        <div className="value-day">Giá đấu ngày
          <div className="cell">--</div>
        </div>
      </div>
    </div>
  );
};

export default MarketStats;