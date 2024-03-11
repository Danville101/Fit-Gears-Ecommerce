import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from './layout/Layout'
import { useEffect, useState , useContext} from 'react'
import { PageContext } from './context/PageContext'
import { UilAngleRightB, UilAngleLeft } from '@iconscout/react-unicons'
import Link from 'next/link'

export default function Home({categories, cartData}) {

 const [slide, setSlide]=useState(1)
 

 const { navbar, setNavbar, cart , setCart} = useContext(PageContext)
 const [isPaused, setIsPaused] = useState(false)


 
 useEffect(() => {

  let intervalId=null

    intervalId = setInterval(() => {
  
        if(slide==1 && isPaused==false){
        
          setSlide(2)
        }
       
        if(slide==2 && isPaused==false){
          
          setSlide(3)
        }
      
        if(slide==3 && isPaused==false){
 
          setSlide(1)
        }
       
    }, 5000);

    if(isPaused==false){
  
  return () => clearInterval(intervalId);

    }


  
 }, [slide, isPaused]);


  
  return (

      
      <Layout cartData={cartData}>
        <div>
  <div className='h-[80vh] w-screen flex-col overflow-hidden relative group -z-50 '>

    



          <div className={`w-full h-[80vh] bg-cover bg-gucci absolute top-0 left-0 ${slide==1?" opacity-100":" opacity-0"} duration-[2000ms] `} onMouseEnter={()=>setIsPaused(true)} onMouseLeave={()=> setIsPaused(false)}>

            

          <p className='mt-40 ml-10 text-5xl text-white'>Viwe</p>
          </div>
          <div className={`w-full h-[80vh] bg-cover bg-prada absolute top-0 left-0 ${slide==2?"opacity-100":" opacity-0"} duration-[2000ms] `}  onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}  >

          </div>
          <div className={`w-full h-[80vh] bg-cover bg-balenciaga absolute top-0 left-0 ${slide==3?" opacity-100":" opacity-0"} duration-[2000ms]`}   onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>

          </div>

        </div>
        <div className={` z-50 flex items-center justify-center w-screen -mt-10 space-x-1  ${navbar?"hidden":""} `}>
           <button className={`h-4 rounded-lg${slide==1?" bg-white w-8  ":" bg-black w-2"} duration-500 `} onClick={()=>setSlide(1)}></button>
           <button className={`h-4 rounded-lg${slide==2?" bg-white w-8  ":" bg-black w-2"} duration-500`} onClick={()=>setSlide(2)} ></button>
           <button className={`h-4 rounded-lg${slide==3?" bg-white w-8  ":" bg-black w-2"} duration-500`} onClick={()=>setSlide(3)}  ></button>
          
</div>
    
    <div className='flex items-center justify-center w-screen mt-12'>
      <div className="flex-col text-center w-80">

           <p className='text-4xl font-bold'>Find Your New Favorite Clothing</p>
           <p className='text-lg font-thin text-gray-500'>Visit our shop to see amazing creations from our designers.</p>
      </div>
   
    </div>
<div className='flex justify-center items-center w-screen'>
 <div className='grid grid-cols-1 gap-4 px-4 mt-8 md:grid-cols-2 lg:grid-cols-3 md:px-8 lg:px-40  place-content-center md:w-full 2xl:grid-cols-4'>
      {categories.map((e,i)=>(
        
        <div className='flex-col items-center justify-center w-80 group' key={i}>
          
        <Link href={`/lisitings/?category=${e.category}`}>
          <div></div>
          <Image src={`http://${process.env.NEXT_PUBLIC_IMAGE_URL}:8000/`+e.image} width={400} height={400} alt='' className='w-80 duration-500 group-hover:scale-105'/>
          <div className='flex items-baseline justify-center w-full -translate-y-20'> <div className='w-auto px-2 py-2 rounded-md text-center duration-500 bg-white bg-opacity-50 text-auto text group-hover:bg-brand group-hover:bg-opacity-70 group hover:cursor-pointer'>
          <p className='duration-700 group-hover:text-white'>{String(e.category)}...</p>
          </div></div>
    
</Link>
      </div>
     
        
      ))}  
    </div>

</div>
   
   <div className='px-4'>
    <div className='grid grid-cols-1 gap-6 mt-20 md:grid-cols-2 lg:grid-cols-3'>
   <div className='relative flex w-full bg-black/20 h-96 group'>
    <div className='absolute duration-700 top-1/2 left-8'>
      <p className='text-xl text-white'>WHAT TO BUY NOW</p>
      <p className='text-4xl text-white' >Must-Haves</p>
      <div className='w-0 h-1 duration-500 bg-white group-hover:w-full '></div>
    </div>

</div>
   <div className='relative flex w-full bg-black/20 h-96 group'>
    <div className='absolute duration-700 top-1/2 left-8'>
      <p className='text-xl text-white'>WHAT TO BUY NOW</p>
      <p className='text-4xl text-white' >Must-Haves</p>
      <div className='w-0 h-1 duration-500 bg-white group-hover:w-full '></div>
    </div>

</div>
   <div className='relative flex w-full bg-black/20 h-96 group'>
    <div className='absolute duration-700 top-1/2 left-8'>
      <p className='text-xl text-white'>WHAT TO BUY NOW</p>
      <p className='text-4xl text-white' >Must-Haves</p>
      <div className='w-0 h-1 duration-500 bg-white group-hover:w-full '></div>
    </div>

</div>
    
   </div>
   </div>
   
    
      </div>
      

      </Layout>
 
  )
}



export async function getServerSideProps (context){
  const headers = context.req.headers;
  const userAgent = headers['user-agent'];

  const res = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/costumer/categories/`,{
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        
       },
    credentials: "include",
  })

  const  categories= await res.json()


  
  const res2 = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/costumer/cart/`,{
    headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'User-Agent':userAgent
        
       },
    credentials: "include",
  })

  const  cartData= await res2.json()





  
  return{props:{ categories, cartData }}
  

}



