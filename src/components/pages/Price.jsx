import React from 'react';
import '../styles/price/price.scss';

const data = [
  { bidVolume: 27, bidPrice: 1415.10, askPrice: 1415.40, askVolume: 11 },
  { bidVolume: 128, bidPrice: 1415.10, askPrice: 1415.50, askVolume: 52 },
  { bidVolume: 14, bidPrice: 1414.90, askPrice: 1415.60, askVolume: 17 },
  { bidVolume: 49, bidPrice: 1414.80, askPrice: 1415.70, askVolume: 5 },
  { bidVolume: 31, bidPrice: 1414.70, askPrice: 1415.80, askVolume: 50 },
  { bidVolume: 69, bidPrice: 1414.60, askPrice: 1415.90, askVolume: 37 },
  { bidVolume: 123, bidPrice: 1414.50, askPrice: 1416.00, askVolume: 30 },
  { bidVolume: 3, bidPrice: 1414.40, askPrice: 1416.10, askVolume: 29 },
  { bidVolume: 10, bidPrice: 1414.30, askPrice: 1416.20, askVolume: 39 },
  { bidVolume: 6, bidPrice: 1414.20, askPrice: 1416.30, askVolume: 37 },
  { bidVolume: 23, bidPrice: 1414.10, askPrice: 1416.40, askVolume: 156 },
  { bidVolume: 121, bidPrice: 1414.90, askPrice: 1416.50, askVolume: 23 },
  { bidVolume: 12, bidPrice: 1414.80, askPrice: 1416.60, askVolume: 37 },
  { bidVolume: 35, bidPrice: 1414.70, askPrice: 1416.70, askVolume: 13 },
  
];

// Hàm xác định màu xanh đỏ cho volume
const getVolumeClass = (value) => (value > 50 ? 'green' : 'red');

// Hàm xác định màu xanh đỏ cho giá (giả sử 1415 là giá chuẩn tham chiếu)
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
          <th className='tab-name col-bid-volume'>Bid Volume</th>
          <th className='tab-name'>Bid Price</th>
          <th className='tab-name'>Ask Price</th>
          <th className='tab-name col-bid-volume'>Ask Volume</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td className={getVolumeClass(row.bidVolume)}>{row.bidVolume}</td>
            <td className={getPriceClass(row.bidPrice)}>{row.bidPrice.toFixed(1)}</td>
            <td className={getPriceClass(row.askPrice)}>{row.askPrice.toFixed(1)}</td>
            <td className={getVolumeClass(row.askVolume)}>{row.askVolume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
