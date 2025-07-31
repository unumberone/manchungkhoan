import React from 'react'
import '../Layout/layout.css'
import Header from './../Header/Header'
import Router from './../Router/route'
import Footer from './../Footer/footer'

const Layout = () => {
  return (
    <div className="layout-wrapper"> 
      <Header />
      <main className="main-content"> 
        <Router />
      </main>
      <Footer />
    </div>
  )
}

export default Layout