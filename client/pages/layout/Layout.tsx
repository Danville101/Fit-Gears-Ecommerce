import React from 'react'
import PageProvider from '../context/PageContext'
import Navbar from '../components/Navbar'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { PageContext } from '../context/PageContext'

function Layout ({children, cartData})  {
     const { navbar, setNavbar } = useContext(PageContext)



  return (
      <PageProvider>
    <div className='relative flex w-screen h-screen'>
     <div className={` lg:hidden`}>
         <Navbar />  
     </div>
     
    
     <div className={`relative flex-col w-screen ${navbar? "overflow-hidden":""} min-h-full flex  `}>
          <div className='mb-14'>

              <TopNav cartData={cartData} />     
          </div>
 

     <main className={`  flex-grow`}>   

          {children}
     </main>
     <div className='mt-8'>
               <Footer/>
     </div>

     </div>

  
    </div>
    </PageProvider>
  )
}

export default Layout




