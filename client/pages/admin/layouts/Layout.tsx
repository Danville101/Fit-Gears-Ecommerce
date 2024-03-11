import React from 'react'
import PageProvider from '../context/PageContext'
import Navbar from '../components/Navbar'
import TopNav from '../components/TopNav'
import { useContext } from 'react'
import { PageContext } from '../context/PageContext'

function Layout ({children}:any)  {
     const { navbar, setNavbar }:any = useContext(PageContext)
  return (
      <PageProvider>
    <div className='flex w-screen h-screen'>
     <div className={` lg:w-auto ${navbar?"w-1/4  z-50":" w-0 "} duration-500 overflow-hidden`}>
         <Navbar />  
     </div>
     
    
     <div className='flex flex-col w-screen lg:full overflow-x-clip'>
          <div></div>
     <TopNav/>

     <main className='pb-8 -mt-8 overflow-auto '>   

          {children}
     </main>
     </div>
    </div>
    </PageProvider>
  )
}

export default Layout