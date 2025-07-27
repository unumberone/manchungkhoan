import React from 'react'
import '../Layout/layout.css'
import Header from './../Header/Header'
import Subheader from './../Subheader/subheader'
import Router from './../Router/route'
import Footer from './../Footer/footer'

const Layout = () => {
  return (
    <div className="layout-wrapper"> {/* ✨ Thêm class wrapper */}
      <Header />
      <Subheader />
      
      <main className="main-content"> {/* ✨ Đẩy phần nội dung */}
        <Router />
      </main>

      <Footer />
    </div>
  )
}

export default Layout