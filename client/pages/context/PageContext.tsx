import React , {createContext,  useState, useEffect} from 'react'

export const PageContext = createContext({})


const PageProvider = ({children}) => {
     const [page, setPage]= useState("Dashboard")
     const [navbar ,setNavbar]=useState(false)
     const [cart , setCart]=useState({})


 


  return (
   <PageContext.Provider value={{page, setPage ,navbar ,setNavbar, cart , setCart }}>
     {children}
   </PageContext.Provider>
  )
}

export default PageProvider






