import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import Trade from '../pages/Trade'
import Main from '../pages/Main'
import CurrentAsset from '../pages/Taisan'
import Gia from '../pages/Price'
import LichSu from '../pages/history'
import MaPhatSinh from '../pages/maphatsinh'
import Payment from '../pages/Formpayment'
import BankStatement from '../pages/bankStatement'
import AssetCategory from '../pages/assetCategory'
import Information from '../pages/information'

const Router = () => {
  return (
     <Routes>
  {/* Layout chính tại "/" */}
  <Route path="/" element={<Main />}>
    <Route index element={<CurrentAsset />} />
    <Route path="tai-san" element={<CurrentAsset />} />
    <Route path="10-gia" element={<Gia />} />
    <Route path="lich-su-giao-dich" element={<LichSu />} />
    <Route path="ma-phat-sinh" element={<MaPhatSinh />} />
  </Route>

  <Route path="/giao-dich-phat-sinh" element={<Main />}> {/*xử lí logic khi user back lại link thì sẽ hiển thị đầy đủ thông tin của tab*/}
  <Route index element={<Navigate to="tai-san" replace />} />
  <Route path="tai-san" element={<CurrentAsset />} />  {/*Xử lí hiển thị thông tin bao gồm main và tài sản */}
  </Route>

  <Route path="/abc" element={<Payment />} /> {/*form thanh toán khi click chuyển tiền */}
  <Route path="/sao-ke-tien" element={<BankStatement />} />
  <Route path="/danh-muc-tai-san" element={<AssetCategory />} />
  <Route path="/chuyen-tien" element={<Trade />} />
  <Route path="/thong-tin-tai-khoan" element={<Information />} />
</Routes>
  )
}

export default Router
