import React, { useState } from 'react'
import Layout from '../layout/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
//@ts-ignore
import { UilAngleRightB, UilAngleLeft , UilMinus,UilPlus,UilShoppingBag, UilShoppingBasket, UilThumbsUp, UilThumbsDown} from '@iconscout/react-unicons'

interface DetailType {
     product: any,
     cartData : any
}

const Detail = ( {product , cartData}:DetailType) => {
     

     const [imageState, setImageState]=useState(1)
     const [quantity, setQuantity]=useState(1)
     const router = useRouter()
     const [amount ,setAmount]=useState()

     const getPic=():string|any => {

          if(imageState==1){
                         return `http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+product.product.image1
          }
          if(imageState==2){
                         return `http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+product.product.image2
          }
          if(imageState==3){
                         return `http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+product.product.image3
          }
          if(imageState==4){
                         return `http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+product.product.image2
          }
       

     }

     console.log(cartData.amount)


     const addProduct= (price:string,product_name:string )=>{
          
          fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/costumer/cart/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive'
  },
  body: JSON.stringify({
    "price": price,
    "product_name": product_name,
    "quantity": quantity
  })
}).then(()=>{
   router.replace(router.asPath)
     
});


  
     }

     




  return (
    <Layout cartData={cartData}>
     <div className='flex-col'>
          <div className='flex justify-center w-screen pt-16 lg:px-4 md:flex-row '>


               <div className='flex-col hidden mr-8 space-y-2 h-80 md:block'>
                    <div className='relative w-20 h-24'>
                                          <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+product.product.image1} layout='fill' alt='' className={` ${imageState==1?"border-2  border-black rounded-md":""} h-30 w-20`} onClick={()=>setImageState(1)}/>
   
                    </div>

           <div className='relative w-20 h-24'>
                                   <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+product.product.image2} layout='fill' alt='' className={` ${imageState==2?"border-2  border-black rounded-md":""} h-30 w-20`} onClick={()=>setImageState(2)}/>

           </div>

           <div className='relative w-20 h-24'>
                                   <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+product.product.image3}  layout='fill' alt='' className={` ${imageState==3?"border-2  border-black rounded-md":""} h-30 w-20`} onClick={()=>setImageState(3)}/>

           </div>
           
           <div className='relative w-20 h-24'>
                                   <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+product.product.image2} layout='fill' alt='' className={` ${imageState==4?"border-2  border-black rounded-md":""} h-30 w-20`} onClick={()=>setImageState(4)}/>

           </div>
                    
    
               </div>
               <div className="md:flex">
                    <div className="h-80">

                    <div className="flex items-center justify-between w-full mb-10 -ml-10 md:ml-10">
      <button className='flex items-center justify-center w-6.5 h-6 translate-x-8 bg-white text-stone-300 hover:bg-black hover:text-white md:hidden z-50 opacity-50 hover:cursor rounded-sm' onClick={()=>setImageState(imageState-1)} disabled={imageState==1}> <UilAngleLeft/> </button>

<div className="relative w-60 h-96" >
              <Image src={getPic()} layout='fill' alt='' className='border '/>  

</div>
         
        <button className='flex items-center justify-center w-6.5 h-6 -translate-x-8 bg-white text-stone-300 hover:bg-black hover:text-white md:hidden  hover:cursor opacity-50 rounded-sm'  onClick={()=>setImageState(imageState+1)} disabled={imageState==4}> <UilAngleRightB/> </button>
        
      </div>
                   
                         
                    </div>
            

               <div className='flex-col h-auto space-y-8 mt-44 w-80 md:ml-8 md:mt-0'>
                   <p className="text-xl font-bold text">{product.product.name}</p>
                   <p className="text-2xl font-bold text-brand">${product.product.price}</p>
                   <div className="flex items-center space-x-2">        <p className="text-2xl font-bold ">Availability:</p> 
                   < UilThumbsUp className={`${product.product.published?"block":"hidden"}`}/> 
                   < UilThumbsDown className={`${product.product.published?"hidden":"block"}`}/>
                   
                   </div>
           



                   
                   <p className="text-sm font-light">{product.product.description}</p>
                   <div className="flex ">
                    
                    <button>         <UilMinus className="translate-x-2 hover:text-brand " onClick={()=>setQuantity(quantity-1)} /></button>

                    <input  onChange={(e)=>setQuantity(Number(e.target.value))} className='flex justify-center items-center w-80 pl-40 -translate-x-6 h-12 -z-50 outline-none bg-[#F8F8F8]' value={quantity}/>
                    <button onClick={()=>setQuantity(quantity+1)}>       <UilPlus  className="-translate-x-14 hover:text-brand"/></button>
                   </div>
         
                   <button className='flex items-center justify-center h-10 mt-4 text-white w-80 bg-brand hover:bg-black' onClick={()=>addProduct(product.product.price,product.product.name)}>
                    <UilShoppingBag/>

                    ADD TO CART
                   </button>

               </div>

</div>

          </div>
          <div className="flex items-center justify-center w-screen py-12 mt-20 border-t md:mt-40">

<div className="flex-col">
               <p className="mb-4 text-4xl font-bold text-center">Related Products</p>

               <div className="grid grid-cols-2 gap-4 px-4 py-4 md:grid-cols-3 lg:grid-cols-4 bg-[#F2F2F2]/20">

                    {product.recommendation.map((e,i)=>(<div key={i}>
                         <Link href={`/lisitings/${e.id}`}>
                                            <div className='flex-col w-auto overflow-hidden h-80 group' >
                                 
                                            <div>
                                            
                                            </div>
                                            <div className='relative w-full h-80'>

                                             <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+e.image1} layout='fill' alt='' className='w-full h-full duration-500 bg-black group-hover:hidden'/>
                                             <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+e.image2} layout='fill' alt='' className='hidden w-full h-full duration-500 bg-black group-hover:block '/>

                                            </div>
                                            
                                            
                                          
                                       </div>
                                       <div className='flex-col w-full h-10 px-4 bg-white'>
                                        <div className='flex items-center justify-center w-full text-sm'>
                                             {e.name.length>24?String(e.name).substring(0,21)+"...":e.name}
                                        </div>
                                  
                                       
                                       </div>
                                       </Link>


                    </div>))}
               </div>
          </div>
</div>
     </div>
    </Layout>
  )
}

export default Detail



export async function getServerSideProps (context){
     const headers = context.req.headers;
     const userAgent = headers['user-agent'];

     const id =  Number(context.query.id)

     const res = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/costumer/product/${id}`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  product= await res.json()



     const res2 = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/costumer/cart/`,{
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'User-Agent':userAgent
              
             },
          credentials: "include",
        })
      
        const  cartData= await res2.json()
   
   
     
   
   
   
   
   
   
     
     return{props:{ product, cartData}}
     
   
   }



 