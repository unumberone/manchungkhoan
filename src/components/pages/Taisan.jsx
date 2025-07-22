// CurrentAsset.jsx
export default function CurrentAsset() {
  const tableData = [
  { label: 'Tổng lợi nhuận', value: '10,046.59' },
  { label: 'Mã hợp đồng', value: 'VN30F2501', highlight: true },
  { label: 'Vị thế', value: '--' },
  { label: 'Lãi lỗ', value: '2,046.59', positive: true },
  { label: 'Sức mua (357007)', value: '--' },
  { label: 'Lãi/lỗ chưa đóng', value: '--' },
  { label: 'Tổng tài sản', value: '120,000,0000' },
  { label: 'Tiền mặt', value: '--' },
  { label: 'Tiền ký quỹ tại VSD', value: '--' },
  { label: 'Ký quỹ ban đầu', value: '--' },
  { label: 'Phí giao dịch + thuế', value: '--' },
  { label: 'Tỷ lệ sử dụng TSKO', value: '--' },
  { label: 'Tỷ lệ an toàn', value: '100%' },
  { label: 'Phí trả VSD', value: '500.0' },
];

  return (
    <>
    
      {tableData.map((row, idx) => (
        <div className="asset-row" key={idx}>
          <div className="asset-label">{row.label}</div>
          <div
            className={
              "asset-value" +
              (row.positive ? " positive" : "") +
              (row.negative ? " negative" : "") +
              (row.highlight ? " highlight" : "")
            }
          >
            {row.value}
          </div>
        </div>
      ))}
    </>
  );
}
