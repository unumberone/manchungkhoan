import React from 'react'
import "../styles/maphatsinh/maphatsinh.scss"

const Data = [
  {code:"41I1F7000", priceData: 1414.1, upDown: 4.1, priceOrder: -5.25, total: 956},
  {code:"VN30F2506", priceData: 1414.5, upDown: 6.5, priceOrder: -4.86, total: 186.564},
  {code:"VN30F2509", priceData: 1409.6, upDown: 6.7, priceOrder: -9.76, total: 197},
  {code:"VN30F2512", priceData: 1411.5, upDown: 5, priceOrder: -7.86, total: 220}
]

const Maphatsinh = () => {
  return (
    <div>
      <div className="table-data">
        <table>
          <thead>
            <tr>
              <th className="tab-name">Mã</th>
              <th className="tab-name">Giá</th>
              <th className='tab-name'>+/-</th>
              <th className='tab-name'>Lệch</th>
              <th className='tab-name'>KL</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((row, idx) => (
              <tr key={idx}>
                <td className={row.code}>{row.code}</td>
                <td className={row.priceData}>{row.priceData}</td>
                <td className={row.upDown}>{row.upDown}</td>
                <td className={row.priceOrder}>{row.priceOrder}</td>
                <td className={row.total}>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Maphatsinh
