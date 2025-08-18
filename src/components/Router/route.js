import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Trade from '../pages/Trade';
import Main from '../pages/Main';
import CurrentAsset from '../pages/Taisan';
import Gia from '../pages/Price';
import LichSu from '../pages/history';
import MaPhatSinh from '../pages/maphatsinh';
import Payment from '../pages/Formpayment';
import BankStatement from '../pages/bankStatement';
import AssetCategory from '../pages/assetCategory';
import Information from '../pages/information';

import Login from '../Login/login'; 

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/main" element={<Main />}>
        <Route index element={<CurrentAsset />} />
        <Route path="tai-san" element={<CurrentAsset />} />
        <Route path="10-gia" element={<Gia />} />
        <Route path="lich-su-giao-dich" element={<LichSu />} />
        <Route path="ma-phat-sinh" element={<MaPhatSinh />} />
      </Route>

      <Route path="/giao-dich-phat-sinh" element={<Main />}>
        <Route index element={<Navigate to="tai-san" replace />} />
        <Route path="tai-san" element={<CurrentAsset />} />
      </Route>

      <Route path="/abc" element={<Payment />} />
      <Route path="/sao-ke-tien" element={<BankStatement />} />
      <Route path="/danh-muc-tai-san" element={<AssetCategory />} />
      <Route path="/chuyen-tien" element={<Trade />} />
      <Route path="/thong-tin-tai-khoan" element={<Information />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Router;
