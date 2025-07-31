import React from 'react'
import '../Layout/layout.css'
import Header from './../Header/Header'
import Router from './../Router/route'
import Footer from './../Footer/footer'

const Layout = () => {
  return (
    <div className="layout-wrapper"> 
      <Header />
<<<<<<< HEAD
=======
      <Subheader />
      
>>>>>>> f665095c3194aa963d4d2630835cd3337c416b70
      <main className="main-content"> 
        <Router />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
