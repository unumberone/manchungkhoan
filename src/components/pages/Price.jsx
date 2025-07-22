import React from 'react';
import '../styles/price/price.scss';

const data = [
  { bidVolume: 27, bidPrice: 1415.10, askPrice: 1415.40, askVolume: 11 },
  { bidVolume: 128, bidPrice: 1415.10, askPrice: 1415.50, askVolume: 52 },
  { bidVolume: 14, bidPrice: 1414.90, askPrice: 1415.60, askVolume: 17 },
  // ... các dòng khác
];

// Hàm helper xác định màu xanh đỏ cho volume
const getVolumeClass = (value) => (value > 50 ? 'green' : 'red');

// Hàm helper xác định màu xanh đỏ cho giá (giả sử 1415 là giá chuẩn tham chiếu)
const getPriceClass = (price, refPrice = 1415) => {
  if (price > refPrice) return 'green';
  if (price < refPrice) return 'red';
  return '';
};

const PriceTable = () => {
  return (
    <table className="price-table">
      <thead>
        <tr>
          <th>Bid Volume</th>
          <th>Bid Price</th>
          <th>Ask Price</th>
          <th>Ask Volume</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td className={getVolumeClass(row.bidVolume)}>{row.bidVolume}</td>
            <td className={getPriceClass(row.bidPrice)}>{row.bidPrice.toFixed(2)}</td>
            <td className={getPriceClass(row.askPrice)}>{row.askPrice.toFixed(2)}</td>
            <td className={getVolumeClass(row.askVolume)}>{row.askVolume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
