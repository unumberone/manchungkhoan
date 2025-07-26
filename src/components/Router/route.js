import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '../Main/Main'
import CurrentAsset from '../pages/Taisan'
import Gia from '../pages/Price'
import LichSu from '../pages/history'
import MaPhatSinh from '../pages/maphatsinh'

const Router = () => {
  return (
    <Routes>
      {/* Main layout dùng Outlet để chứa các tab con */}
      <Route path="/" element={<Main />}>
        <Route path="tai-san" element={<CurrentAsset />} />
        <Route path="10-gia" element={<Gia />} />
        <Route path="lich-su-giao-dich" element={<LichSu />} />
        <Route path="ma-phat-sinh" element={<MaPhatSinh />} />
      </Route>
    </Routes>
  )
}

export default Router
