import React from 'react'
import '../styles/history/history.scss'

const dataHistory = [
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown:-4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown:-3.8, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1441.1, upDown: 4.1, massValue: 1, cumulativeMass: 956},
    { timeHistory: "14:45:00", priceHistory: 1440.47, upDown: 4.1, massValue: 4, cumulativeMass: 950 },
    { timeHistory: "14:45:01", priceHistory: 1440.55, upDown: -4.1, massValue: 9, cumulativeMass: 951 },
    { timeHistory: "14:45:02", priceHistory: 1440.81, upDown: 4.1, massValue: 2, cumulativeMass: 952 },
    { timeHistory: "14:45:03", priceHistory: 1440.62, upDown: -4.1, massValue: 8, cumulativeMass: 953 },
    { timeHistory: "14:45:04", priceHistory: 1440.12, upDown: 4.1, massValue: 6, cumulativeMass: 954 },
    { timeHistory: "14:45:05", priceHistory: 1440.96, upDown: -4.1, massValue: 7, cumulativeMass: 955 },
    { timeHistory: "14:45:06", priceHistory: 1440.19, upDown: 4.1, massValue: 5, cumulativeMass: 956 },
    { timeHistory: "14:45:07", priceHistory: 1440.88, upDown: -4.1, massValue: 3, cumulativeMass: 957 },
    { timeHistory: "14:45:08", priceHistory: 1440.42, upDown: 4.1, massValue: 2, cumulativeMass: 958 },
    { timeHistory: "14:45:09", priceHistory: 1440.72, upDown: -4.1, massValue: 1, cumulativeMass: 959 },
    { timeHistory: "14:45:10", priceHistory: 1440.66, upDown: 4.1, massValue: 6, cumulativeMass: 960 },
    { timeHistory: "14:45:11", priceHistory: 1440.27, upDown: -4.1, massValue: 5, cumulativeMass: 961 },
    { timeHistory: "14:45:12", priceHistory: 1440.99, upDown: 4.1, massValue: 4, cumulativeMass: 962 },
    { timeHistory: "14:45:13", priceHistory: 1440.21, upDown: -4.1, massValue: 3, cumulativeMass: 963 },
    { timeHistory: "14:45:14", priceHistory: 1440.15, upDown: 4.1, massValue: 7, cumulativeMass: 964 },
    { timeHistory: "14:45:15", priceHistory: 1440.83, upDown: -4.1, massValue: 8, cumulativeMass: 965 },
    { timeHistory: "14:45:16", priceHistory: 1440.35, upDown: 4.1, massValue: 9, cumulativeMass: 966 },
    { timeHistory: "14:45:17", priceHistory: 1440.41, upDown: -4.1, massValue: 2, cumulativeMass: 967 },
    { timeHistory: "14:45:18", priceHistory: 1440.78, upDown: 4.1, massValue: 1, cumulativeMass: 968 },
    { timeHistory: "14:45:19", priceHistory: 1440.67, upDown: -4.1, massValue: 6, cumulativeMass: 969 },
    { timeHistory: "14:45:20", priceHistory: 1440.51, upDown: 4.1, massValue: 5, cumulativeMass: 970 },
    { timeHistory: "14:45:21", priceHistory: 1440.36, upDown: -4.1, massValue: 4, cumulativeMass: 971 },
    { timeHistory: "14:45:22", priceHistory: 1440.98, upDown: 4.1, massValue: 3, cumulativeMass: 972 },
    { timeHistory: "14:45:23", priceHistory: 1440.44, upDown: -4.1, massValue: 9, cumulativeMass: 973 },
    { timeHistory: "14:45:24", priceHistory: 1440.69, upDown: 4.1, massValue: 8, cumulativeMass: 974 },
    { timeHistory: "14:45:25", priceHistory: 1440.23, upDown: -4.1, massValue: 7, cumulativeMass: 975 },
    { timeHistory: "14:45:26", priceHistory: 1440.61, upDown: 4.1, massValue: 2, cumulativeMass: 976 },
    { timeHistory: "14:45:27", priceHistory: 1440.92, upDown: -4.1, massValue: 1, cumulativeMass: 977 },
    { timeHistory: "14:45:28", priceHistory: 1440.38, upDown: 4.1, massValue: 4, cumulativeMass: 978 },
    { timeHistory: "14:45:29", priceHistory: 1440.84, upDown: -4.1, massValue: 5, cumulativeMass: 979 },
    { timeHistory: "14:45:30", priceHistory: 1440.73, upDown: 4.1, massValue: 6, cumulativeMass: 980 },
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
        <th className="tab-name right">Giá</th>
        <th className="tab-name">+/-</th>
        <th className="tab-name">KL</th>
        <th className="tab-name">KL tích luỹ</th>
      </tr>
    </thead>
    <tbody>
          {dataHistory.map((row, idx) => (
            <tr key={idx}>
            <td>{row.timeHistory}</td>
            <td className={`right ${getUpDownClass(row.priceHistory)}`}>
              {row.priceHistory}
            </td>
            <td className={`center ${getUpDownClass(row.upDown)}`}>
              {row.upDown > 0 ? row.upDown : row.upDown < 0 ? row.upDown : '0'}
            </td>
            <td>{row.massValue}</td>
            <td className="right">{row.cumulativeMass}</td>
          </tr>))} 
    </tbody>
  </table>
);
}
  


export default history
