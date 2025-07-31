import React from 'react'
import "../styles/maphatsinh/maphatsinh.scss"

  const Data = [
  { code: "41I1F7000", priceData: 1414.1, upDown: 4.1, priceOrder: -5.25, total: 956 },
  { code: "VN30F2506", priceData: 1414.5, upDown: 6.5, priceOrder: -4.86, total: 186564 },
  { code: "VN30F2509", priceData: 1409.6, upDown: 6.7, priceOrder: -9.76, total: 197 },
  { code: "VN30F2512", priceData: 1411.5, upDown: 5, priceOrder: -7.86, total: 220 },
  { code: "VN30F2603", priceData: 1412.3, upDown: 5.8, priceOrder: -6.75, total: 312 },
  { code: "VN30F2606", priceData: 1415.2, upDown: 7.1, priceOrder: -3.95, total: 128764 },
  { code: "VN30F2609", priceData: 1410.4, upDown: 4.9, priceOrder: -8.23, total: 843 },
  { code: "VN30F2612", priceData: 1413.7, upDown: 6.2, priceOrder: -5.67, total: 1492 },
  { code: "41I2F7001", priceData: 1412.8, upDown: 5.4, priceOrder: -6.11, total: 732 },
  { code: "41I2F7002", priceData: 1413.1, upDown: 6.0, priceOrder: -5.88, total: 1020 },
  { code: "VN30F2703", priceData: 1416.0, upDown: 7.3, priceOrder: -4.12, total: 2305 },
  { code: "VN30F2706", priceData: 1417.4, upDown: 8.1, priceOrder: -3.74, total: 148670 },
  { code: "VN30F2709", priceData: 1408.9, upDown: 4.5, priceOrder: -10.25, total: 582 },
  { code: "VN30F2712", priceData: 1412.0, upDown: 5.6, priceOrder: -6.92, total: 304 },
  { code: "41I3F7003", priceData: 1415.5, upDown: 6.9, priceOrder: -5.33, total: 998 },
  { code: "41I3F7004", priceData: 1411.9, upDown: 5.2, priceOrder: -7.15, total: 1670 },
  { code: "VN30F2803", priceData: 1413.3, upDown: 6.3, priceOrder: -5.48, total: 876 },
  { code: "VN30F2806", priceData: 1414.7, upDown: 5.9, priceOrder: -4.77, total: 121394 },
  { code: "VN30F2809", priceData: 1410.2, upDown: 5.0, priceOrder: -8.54, total: 724 },
  { code: "VN30F2812", priceData: 1415.1, upDown: 6.6, priceOrder: -6.01, total: 1500 },
  { code: "41I4F7005", priceData: 1412.6, upDown: 5.5, priceOrder: -5.79, total: 1143 },
  { code: "41I4F7006", priceData: 1416.3, upDown: 7.0, priceOrder: -4.68, total: 1890 }
];

const Maphatsinh = () => {
  return (
    <div>
      <div className="scroll-wrapper">
      <div className="table-data">
        <table>
          <thead>
            <tr>
              <th className='tab-name '>Mã</th>
              <th className='tab-name right'>Giá</th>
              <th className='tab-name right'>+/-</th>
              <th className='tab-name right'>Lệch</th>
              <th className='tab-name right'>KL</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((row, idx) => (
              <tr key={idx}>
                <td className="code">{row.code}</td>
                <td className="code">{row.priceData}</td>
                <td className="code">{row.upDown}</td>
                <td className="priceOrder">{row.priceOrder}</td>
                <td className="total">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Maphatsinh
