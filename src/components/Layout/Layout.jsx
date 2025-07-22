import React from 'react'
import Header from './../Header/Header'
import Subheader from './../Subheader/subheader'
import Footer from './../Footer/footer'
import Router from './../Router/route'

const Layout = () => {
  return (
    <div>
     <>
        < Header />
        < Subheader />
        < Router />
        < Footer />
     </>
    </div>
  )
}

export default Layout
