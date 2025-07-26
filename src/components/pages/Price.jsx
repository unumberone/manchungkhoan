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



const PriceTable = () => {
  return (
    <table className="price-table">
  <thead>
    <tr>
      <th className="tab-name col bid-volume">Bid Volume</th>
      <th className="tab-name">Bid Price</th>
      <th className="tab-name">Ask Price</th>
      <th className="tab-name col ask-volume">Ask Volume</th>
    </tr>
  </thead>
  <tbody>
  {data.map((row, idx) => {
    const maxBid = Math.max(...data.map(item => item.bidVolume));
    const maxAsk = Math.max(...data.map(item => item.askVolume));

    const bidPercent = ((row.bidVolume ) / maxBid) * 100;
    const askPercent = (row.askVolume / maxAsk) * 100;

    return (
      <tr key={idx}>
        <td>{row.bidVolume}</td>
        <td
          className="volume-cell bid"
          style={{ "--after-width": `${bidPercent}%` }}
        >
          {row.bidPrice.toFixed(1)}
        </td>
        <td
          className="volume-cell ask"
          style={{ "--after-width": `${askPercent}%` }}
        >
          {row.askPrice.toFixed(1)}
        </td>
        <td>{row.askVolume}</td>
      </tr>
    );
  })}
</tbody>

</table>

  );
};

export default PriceTable;
