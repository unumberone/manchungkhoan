import React from 'react'
import '../styles/history/history.scss'

const dataHistory = [
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: -4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: -3.8, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956}
];


const getUpDownClass = (value) => {
  const num = parseFloat(value);
  if (value > 0) return 'green--color';      
  if (value < 0) return 'red--color';     
  return '#';                 
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
          <td className={getUpDownClass(row.priceHistory)}>{row.priceHistory}</td> {/*viết điều kiện để hiển thị màu xanh và đỏ với đỏ khi có giá trị +/- < 0 */}
          <td className={getUpDownClass(row.upDown)}>
            {row.upDown < 0
              ? `- ${Math.abs(row.upDown)}`
              : `${row.upDown}`}
          </td>

          <td>{row.massValue}</td>
          <td>{row.cumulativeMass}</td>
        </tr>
      ))} 
    </tbody>
  </table>
);
}
  


export default history
