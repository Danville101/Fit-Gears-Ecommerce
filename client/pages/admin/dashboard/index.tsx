import React from 'react'
import Layout from '../layouts/Layout'
//@ts-ignore
import { UilGold , UilShoppingBag, UilStore, UilUserPlus} from '@iconscout/react-unicons'
import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend,
   } from 'chart.js';
   import { Line} from 'react-chartjs-2';
import Image from 'next/image';
   
   
   ChartJS.register(
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Legend,
   );
   

//@ts-ignore
const Dashborad=({orders, allProducts, avaiable, category, chartdata, bestSeller})=> {

     let total_revenue = 0

     for(const order of orders){
          total_revenue += order.order.total_cost
     }

      const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart',
            },
          },
        };
        
        const labels = chartdata.labels; 
        
         const data = {
          labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: chartdata.data,
              borderColor: 'rgb(40, 164, 134)',
              fill: true,
              backgroundColor :'RGB(215, 230, 226)',
              tension: 0.3,
              pointRadius:8,
              pointBorderWidth:2,
              pointHoverBorderColor:"rgba(554, 299, 112,0.5)",
              
            
            },
             
            
           
          ],
        };

        const svg=
        ['/eyeglasses.svg',
        '/suit.svg',
        '/jacket.svg',
        '/weight.svg',
        '/underwear.svg',
        '/sneakers.svg',
        '/polo-shirt.svg', 
        '/trouser.svg',
        '/wristwatch.svg',
        '/sweater.svg' ]
        
        
    


  return (
     <Layout>
     <div className=' h-screen mt-6 bg-[#F5F6F4] flex flex-col w-full'>
          
                <div className='px-4'>
               
               <div className='grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 gap-x-4 xl:grid-cols-4 xl:pt-8'>
                    
                    <div className='flex items-center w-full px-4 py-4 duration-500 bg-white rounded-lg shadow-sm h-28 hover:-translate-y-4'>
                         <div className='bg-[#28A487] h-20 w-[0.2rem]'></div>
                         <div className='flex justify-between w-full'>
                         <div className='flex flex-col ml-4'>
                              <p>Total Revenue</p>
                              <p>${total_revenue}</p>
                         </div>
                         <div className='bg-[#E9F6F4] flex justify-center items-center rounded-md w-10 '>
                              < UilGold className="text-[#28A487]"/>
                         </div>
                        </div>
                    </div>
                    
                    
                    <div className='flex items-center w-full px-4 py-4 duration-500 bg-white rounded-lg shadow-sm h-28 hover:-translate-y-4'>
                         <div className='bg-[#747DC6] h-20 w-[0.2rem]'></div>
                         <div className='flex justify-between w-full'>
                         <div className='flex flex-col ml-4'>
                              <p>Total orders</p>
                              <p>{orders.length}</p>
                         </div>
                         <div className='bg-[#F1F2F9] flex justify-center items-center rounded-md w-10 '>
                              <p><UilShoppingBag className="text-[#747DC6]"/></p>
                         </div>
                        </div>
                    </div>
                    
                    
                    <div className='flex items-center w-full px-4 py-4 duration-500 bg-white rounded-lg shadow-sm h-28 hover:-translate-y-4'>
                         <div className='bg-[#EF3F3E] h-20 w-[0.2rem]'></div>
                         <div className='flex justify-between w-full'>
                         <div className='flex flex-col ml-4'>
                              <p>Total products</p>
                              <p>{avaiable}/{allProducts}</p>
                         </div>
                         <div className='bg-[#FDEDEE] flex justify-center items-center rounded-md w-10 '>
                              <UilStore className=" text-[#EF3F3E]" />
                         </div>
                        </div>
                    </div>
                    
                    
                    <div className='flex items-center w-full px-4 py-4 duration-500 bg-white rounded-lg shadow-sm h-28 hover:-translate-y-4'>
                         <div className='bg-[#9E65C2] h-20 w-[0.2rem]'></div>
                         <div className='flex justify-between w-full'>
                         <div className='flex flex-col ml-4'>
                              <p>Total Customers</p>
                              <p>4.6K</p>
                         </div>
                         <div className='bg-[#F5F1F9] flex justify-center items-center rounded-md w-10 '>
                         <UilUserPlus className='text-[#9E65C2]'/>
                         </div>
                        </div>
                    </div>
                    
               </div>

               <div className='items-center w-full px-4 py-4 duration-500 bg-white rounded-lg shadow-sm h-60 hover:-translate-y-4 '>
                    <p>Category</p>
                         <div className='flex mx-4 mt-4 space-x-8 overflow-auto'>

                              {
                                   category.map((e,i)=>(
                                  
                                             <div  key={i}className="flex flex-col items-center justify-center ">
                                   <div className='bg-[#F9F9F6] flex justify-center items-center w-32 h-32 rounded-lg hover:cursor-pointer hover:bg-gradient-to-br from-[#5E8C59] to-[#009A78] '> 
                                    <Image className='fill-red-50' src={svg[i]} height={50} width={50} alt='img'/>
                                   </div>
                                  <p>{String(e.name).substring(0,10)}...</p>
                              </div>
                                             
                          
                                   ))
                              }
                              
                              
                              
                         </div>
                        
                    </div>


                    <div className='grid grid-cols-1 mt-10 gap-y-8 lg:grid-cols-2 gap-x-6'>

                    <div className='items-center w-full px-4 py-4 duration-500 bg-white rounded-lg shadow-sm h-80 hover:-translate-y-4 '>
                         <p>Revenue Report</p>

                         <Line  options={options} data={data}/>
                   
                        
                    </div>
                    <div className='items-center w-full px-4 py-4 duration-500 bg-white rounded-lg shadow-sm h-80 hover:-translate-y-4 '>
                         <p>Best Selling Product</p>
                         <div className='overflow-auto'>
                         {bestSeller.map((e,i)=>(
                              
                              <div className="flex items-center justify-between pt-2 my-4 border-t" key={i}>
                                   <Image src={e.image} height={50} width={50} alt='img'/>
                       
                                   <div className='flex-col'>
                                        <p>Name</p>
                                        <p>{String(e.name).substring(0,14)}...</p>
                                   </div>
                                   <div className='flex-col'>
                                        <p>Price</p>
                                        <p className='text-sm'>${e.price}</p>
                                   </div>
                                   <div className='flex-col'>
                                        <p>Orders</p>
                                        <p className='text-sm'>{e.orders}</p>
                                   </div>
                                   <div className='flex-col'>
                                        <p>Stock</p>
                                        <p className='text-sm'>{e.stock}</p>
                                   </div>
                                   <div className='flex-col'>
                                        <p>Amount</p>
                                        <p className='text-sm'>${e.amount}</p>
                                   </div>


                                   
                              </div>
                         ))}
                        </div>
                    </div>
                    <div className='items-center w-full px-4 py-4 duration-500 bg-white rounded-lg shadow-sm h-80 hover:-translate-y-4 '>
                         <p>Recent Order</p>
                   
                        
                    </div>
                    <div className='items-center w-full px-4 py-4 duration-500 bg-white rounded-lg shadow-sm h-80 hover:-translate-y-4 '>
                         <p>Earning</p>
                   
                        
                    </div>
                         
                    </div>


    
                    
               
               

            </div>
                
    </div>
     </Layout>
    
  )
}

export default Dashborad


export async function getServerSideProps (){

     const res = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/admin/orders/`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  orders= await res.json()


     const res2 = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/admin/products_all/`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  allProducts= await res2.json()

  

     const res3 = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/admin/avaiable_products/`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  avaiable= await res3.json()


     const res4 = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/category/`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  category= await res4.json()



     const res5 = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/admin/daily_revenue/`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  chartdata= await res5.json()
     
     const res6 = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/admin/daily_best_seller/`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  bestSeller= await res6.json()
     






     
     return{props:{ orders, allProducts,avaiable, category , chartdata, bestSeller}}
     

}