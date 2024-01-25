import React from 'react'
import PageProvider from '../context/PageContext'
import Navbar from '../components/Navbar'
import TopNav from '../components/TopNav'
import { useContext } from 'react'
import { PageContext } from '../context/PageContext'

function Layout ({children})  {
     const { navbar, setNavbar } = useContext(PageContext)
  return (
      <PageProvider>
    <div className='flex w-screen h-screen'>
     <div className={` lg:w-1/4 ${navbar?"w-1/4  z-50":" w-0 "} duration-500 overflow-hidden`}>
         <Navbar />  
     </div>
     
    
     <div className='flex flex-col w-screen lg:w-3/4 overflow-x-clip'>
          <div></div>
     <TopNav/>

     <main className='pb-8 -mt-8 overflow-scroll '>   

          {children}
     </main>
     </div>
    </div>
    </PageProvider>
  )
}

export default Layout