import React , {createContext,  useState} from 'react'

export const PageContext = createContext({})

const PageProvider = ({children}:any) => {
     const [page, setPage]= useState("Dashboard")
     const [navbar ,setNavbar]=useState(false)
  return (
   <PageContext.Provider value={{page, setPage ,navbar ,setNavbar}}>
     {children}
   </PageContext.Provider>
  )
}

export default PageProvider