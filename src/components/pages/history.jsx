import React from 'react'
import '../styles/history/history.scss'

const dataHistory = [
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956}
];

const getUpDownClass = (value) => {
  if (value > 0) return 'up';      
  if (value < 0) return 'down';     
  return 'neutral';                 
};

const getPriceClass = (price) => {
  return price > 1400 ? 'high' : 'low';
};

const history = () => {
return (
  <table className="table-history">
    <thead>
      <tr>
        <th className="tab-name">Thời gian</th>
        <th className="tab-name">Giá</th>
        <th className="tab-name">+/-</th>
        <th className="tab-name">KL</th>
        <th className="tab-name">KL tích luỹ</th>
      </tr>
    </thead>
    <tbody>
      {dataHistory.map((row, idx) => (
        <tr key={idx}>
          <td>{row.timeHistory}</td>
          <td className={getPriceClass(row.priceHistory)}>{row.priceHistory}</td>
          <td className={getUpDownClass(row.upDown)}>{row.upDown}</td>
          <td>{row.massValue}</td>
          <td>{row.cumulativeMass}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
}
  


export default history
