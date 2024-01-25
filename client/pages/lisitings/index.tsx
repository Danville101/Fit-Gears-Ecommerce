import React, { useState } from 'react'
import Layout from '../layout/Layout'
import Link from 'next/link'
import { UilMultiply , UilFilter, UilShoppingBasket} from '@iconscout/react-unicons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { search } from 'express/lib/application'



const Listing = ({products, page_size, cartData}) => {


     const[sideMenu, setSideMenu]=useState(false)
     const router = useRouter()


     const { query } = router

     // Access a query parameter by its key
     const seachTerm = query.search

     const[name, setName]=useState("")
     const[price, setPrice]=useState(0)
     const[quantity, setQuantity]=useState(1)

     const getMore=()=>{
         
     const str= router.asPath
     let num = str.split("&page_size")

          page_size +=36
          if(router.asPath.includes("?")){
               router.replace(num[0] +`&page_size=${page_size}`)
               
          }
        
          router.replace(`lisitings/?page_size=${page_size}`)
          
     }

     const getPrev=()=>{
         
          const str= router.asPath
          let num = str.split("&page_size")
     
               page_size -=36
               if(router.asPath.includes("?")){
                    router.replace(num[0] +`&page_size=${page_size}`)
                    
               }
             
               router.replace(`lisitings/?page_size=${page_size}`)
               
          }
     
    
  

     console.log("Yah suh" ,products.count)

     const gotPrice=(price)=>{
          let step1=String(price).replaceAll("$","")
          let step2 = String(step1).split("-")
          let lowprice= step2[0]
          let highprice = step2[1]

          router.push(`lisitings/?lowprice=${lowprice}&highprice=${highprice}`)
          setSideMenu(false)
     }


     const gotCategory=(category)=>{
        

          router.push(`/lisitings?category=${category}`)
          setSideMenu(false)
     }



  
     const addProduct= async()=>{
          await fetch('http://127.0.0.1:8000/costumer/cart/',{
               method:"POST",
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                   
                  },
               body: JSON.stringify({
                    product_name:name,
                    price:price,
                    quantity:quantity
               }), 
               credentials: "include"

          })

          router.replace(router.asPath)
     }
     
  return (
     <Layout cartData={cartData} >
          <div className='flex w-screen h-full '>
               <div className='flex w-0 lg:w-[20vw] lg:h-screen'>
                      <div className={` flex-col justify-center h-screen mb-32  px-10 pb-8 space-x-2  bg-white lg:w-[20vw]  lg:translate-x-0 ${sideMenu?" w-[60vw] overflow-scroll lg:w-[20vw] fixed ":"-translate-x-[60vw] lg:w-[20vw]   "} duration-500    `}>


<div className='fixed flex items-center w-full h-10 py-4 mb-8 bg-white lg:hidden '>
                              <button className='flex space-x-1 duration-500 hover:text-brand' onClick={()=>setSideMenu(false)}>
                              <UilMultiply/>
                              <p>Close</p>
                         </button> 
                              
                         </div>
                        
                    
                    <div className=''>
                         
                         
                         <p className='mt-20 mb-4 text-xl font-bold'>Collection</p>
                         <div className='flex-col space-y-1'>
                              <div className='hover:text-brand'>
                          <Link href={"#"}>
                           All    
                         </Link>   
                              </div>
                              <div className='hover:text-brand' >
                                        <Link href={"#"}>
                           Trending
                         </Link>   
                              </div>
                              <div className='hover:text-brand'>
                                        <Link href={"#"}>
                           Best Sellers   
                         </Link>   
                              </div>
                           
                      
                         
                         </div>
                         <p className='mt-8 mb-4 text-xl font-bold'>Product Type</p>
                         <div className='flex-col space-y-1'   >
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)}>
                    
                          Accessories
                    
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)} >
                                
                                        Suits
                      
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)} >
                        
                                        Jackets/Coats  
                
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)}>
                                      
                                        Activewear  
                        
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)}>
                                   
                                        Underwear
                    
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)}>
                                     
                                        Shoes
                       
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)}>
                                
                                        Shirts 
                    
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)}>
                                   
                                        Pants 
        
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)}>
                                    
                                        Jewelry 
         
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotCategory(e.target.textContent)}>
                                     
                                        Sweaters 
                         
                              </div>
                           
                      
                         
                         </div>

                         <p className='mt-4 mb-4 text-xl font-bold'>Price</p>
                         <div className='flex-col space-y-1'>
                              <div className='hover:text-brand' onClick={(e)=>gotPrice(e.target.textContent)}>
                  
                         $500-$1000    
              
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotPrice(e.target.textContent)} >
                                
                           $1000-$1500
 
                              </div>
                              <div className='hover:text-brand' onClick={(e)=>gotPrice(e.target.textContent)}>
                
                           $2000-$3000  
                        
                              </div>
                           
                      
                         
                         </div>


                         <p className='mt-4 mb-4 text-xl font-bold'>Brands</p>
                         <div className='flex-col space-y-1'>
                              <div className='hover:text-brand'>
                          <Link href={"#"}>
                         Gucci   
                         </Link>   
                              </div>
                              <div className='hover:text-brand' >
                                        <Link href={"#"}>
                           Prada
                         </Link>   
                              </div>
                              <div className='hover:text-brand'>
                                        <Link href={"#"}>
                                        Balenciaga 
                         </Link>   
                              </div>
                              <div className='hover:text-brand'>
                                        <Link href={"#"}>
                           Boss
                         </Link>   
                              </div>
                           
                              <div className='hover:text-brand'>
                                        <Link href={"#"}>
                           Burberry
                         </Link>   
                              </div>
                           
                              <div className='hover:text-brand'>
                                        <Link href={"#"}>
                                        Cartier
                         </Link>   
                              </div>
                           
                           
                              <div className='hover:text-brand'>
                                        <Link href={"#"}>
                                        Givenchy
                         </Link>   
                              </div>
                           
                         
                      
                         
                           
                           
                              <div className='w-full h-10 hover:text-brand'>
                           
                              </div>
                           
                         
                           
                           
                         
                           
                           
                              
                           
                      
                         
                         </div>
                         
                         
                    </div>

                        
                   
                    
               </div>
               </div>

               <div className={`fixed top-0 right-0 w-[40vw] h-full bg-gray-900 opacity-75 z-50 lg:hidden ${sideMenu?"":"hidden"}  duration-500 hover:cursor-pointer `}  onClick={()=>setSideMenu(false)}></div>


               
               <div  className={`lg:w-[80vw] w-screen  ${sideMenu?"overflow-hidden h-screen ":""} border-l pb-8 `} >

                    <div className='flex justify-center w-full'>

                              
                               <p className={`mt-20 text-2xl font-bold ${seachTerm?"hidden":""}`}>Listings</p>  
                               <p className={`mt-20 text-2xl font-bold ${seachTerm?"":"hidden"}`}> Search Results:{seachTerm}</p>  
                    </div>
                    <div className={`flex items-center justify-center w-full mt-4 ${page_size>36?"":"hidden"}`} id="prev">
                              <button className='px-4 py-2 border' onClick={()=>getPrev()}>Show Previous</button>
                          </div>
            

                    
                    <div className='px-4'> 
                    <div className='flex justify-between w-16 lg:hidden'>
                         
                           <UilFilter />
                           <p className='hover:text-brand' onClick={()=>setSideMenu(true)}>Filter</p>

                           
                         </div>

                         <div className="grid grid-cols-2 gap-1 py-8 lg:grid-cols-4">

                               {products.result.map((e,i)=>(
                                   <div className='flex-col border' key={i}>
                                    
                                          <Link href={`/lisitings/${e.id}`}>
                                            <div className='flex-col w-auto overflow-hidden h-80 group ' >
                                 
                                            <div>
                                            
                                            </div>
                                            <div className='w-full h-80 '>

                                             <Image src={"http://127.0.0.1:8000/"+e.image1} height={200} width={200} alt='' className='w-full h-full duration-500 bg-black group-hover:hidden '/>
                                             <Image src={"http://127.0.0.1:8000/"+e.image2} height={200} width={200} alt='' className='hidden w-full h-full duration-500 bg-black group-hover:block '/>

                                            </div>
                                          
                                          
                                      
                                       </div>
                                       <div className='flex-col w-full h-10 px-4 bg-white'>
                                        <div className='flex-col w-full -ml-3'>
                                             <p className='text-xs'>{e.name.length>30?String(e.name).substring(0,21)+"...":e.name}</p>
                                             <p className='font-bold'>${e.price}</p>
                                           
                                        
                                        </div>
                                  
                                       
                                       </div>
                                       </Link>
                                  </div>
                                  ))}

                               

                              
                         </div>
                             
                   <div className={`flex items-center justify-center w-full ${Math.ceil(products.count/12)==page_size/12 ?"hidden":""} ${products.count==0?"hidden":""}`} id="more">
                              <button className='px-4 py-2 border' onClick={()=>getMore()}>Show More</button>
                          </div>
                
                         </div>
                
               
               </div>

          </div>
     </Layout>
  )
}

export default Listing


export async function getServerSideProps (context){

     const headers = context.req.headers;
     const userAgent = headers['user-agent'];
 

     const page_size =  Number(context.query.page_size) || 36;
     
     const category =  context.query.category 
     const lowprice =  context.query.lowprice 
     const highprice =  context.query.highprice 
     const search = context.query.search

     const res = await fetch(`http://127.0.0.1:8000/costumer/products/?page_size=${page_size}`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  products= await res.json()

    
   

  const res2 = await fetch("http://127.0.0.1:8000/costumer/cart/",{
     headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent':userAgent
         
        },
     credentials: "include",
   })
 
   const  cartData= await res2.json()
 
 
 
 
   
   if (category){
     const res = await fetch(`http://127.0.0.1:8000/costumer/products/?page_size=${page_size}&category=${category}`,{
  headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      
     },
  credentials: "include",
})

const  products= await res.json()

return{props:{ products, page_size, cartData}}


}

   if (lowprice && highprice){
     const res = await fetch(`http://127.0.0.1:8000/costumer/products/?page_size=${page_size}&lowprice=${lowprice}&highprice=${highprice}`,{
  headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      
     },
  credentials: "include",
})

const  products= await res.json()

return{props:{ products, page_size, cartData}}


}
   
if (search){
     const res = await fetch(`http://127.0.0.1:8000/costumer/products/?page_size=${page_size}&search=${search}`,{
  headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      
     },
  credentials: "include",
})

const  products= await res.json()

return{props:{ products, page_size, cartData}}


}
  
   
   
   
   
   
     
     return{props:{ products, page_size, cartData}}
     
   
   }


  
 