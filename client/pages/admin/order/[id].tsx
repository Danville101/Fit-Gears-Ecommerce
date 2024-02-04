import React from 'react'
import Layout from '../layouts/Layout'
import Image from 'next/image'

const OrderDetails = ({orderDetails}) => {

     let numberOfItems=0

     for(const num of orderDetails.items){
          numberOfItems += num.quantity
     }

  return (
     <Layout>



               
               <div className=' h-screen mt-6 bg-[#F5F6F4] flex flex-col w-full   '>
         
         <div className='px-4'>
        


             
             <div className='flex-col items-center w-full px-4 py-4 overflow-x-scroll duration-500 bg-white rounded-lg shadow-sm hover:-translate-y-4 '>
                 <div ><p className='font-bold'>Orders #{orderDetails.order.order_number}</p>
                 
                  <div className='flex justify-between py-2 mt-2 mb-6 md:flex-col md:space-y-4 md:right-0 border-y '>
                    <div className='space-y-2'>
               <p>{String(orderDetails.order.date_created).substring(0,10)} at {String(orderDetails.order.date_created).substring(11,16)}</p> 
                <p> Total ${orderDetails.order.total_cost}</p>
                <p>{numberOfItems} items</p>
                    </div>
      
                  </div></div>
                  
           <div className='bg-[#28A487] text-white py-2 pl-2 font-bold '>ITEMS</div>
           <div>

           </div>

           <div className='flex-col space-y-4'>
               {orderDetails.items.map((e,i)=>(
               <div  key={i}>
                    <div className="inline-flex items-center ">
                    <Image src={e.image} width={100} height={100} alt='img' className='rounded-md'/>
                    <div className='flex-col ml-6'>
                         <p className='mb-2 text-stone-400'>Product Name</p>
                         <p className='text-sm w-52'>{String(e.product_name).toUpperCase()}</p>
                    </div>
                    
                    <div className='flex-col ml-2'>
                         <p className='mb-2 text-stone-400'>Quantity</p>
                         <p className='text-sm w-52'>{String(e.quantity)}</p>
                    </div>
                    
                   
                    </div>
               </div>
            ))}
            <div className='py-2 space-y-2 border-t border-b'>
              <div className='flex justify-between'>  <p>Subtotal :</p>  <p>${orderDetails.order.total_cost}</p></div>
              <div className='flex justify-between'>  <p>Shipping :</p>  <p>${Math.round(orderDetails.order.total_cost/100*1.2)}</p></div>

            </div>
            <div className='flex justify-between text-[#28A487] text-lg font-bold'>  <p>Subtotal:</p>  <p>${orderDetails.order.total_cost + Math.round(orderDetails.order.total_cost/100*1.2)}</p></div>
           </div>
     
             <div className='h-1 my-4 bg-[#28A487]/50 w-full rounded-full'></div>
               <div className='bg-[#F9F9F6] h-auto rounded-lg px-2 py-4 space-y-4'>
                    <div>
                    <p>Summery</p>
                    <p className='text-stone-400'>Order ID: {orderDetails.order.id}</p>
                    <p className='text-stone-400'>Order Date: {String(orderDetails.order.date_created).substring(0,10)}</p>
                    <p className='text-stone-400'>Order Total: ${orderDetails.order.total_cost + Math.round(orderDetails.order.total_cost/100*1.2)}</p>
                    </div>

                    <div>
                    <p>Shipping</p>
                    <p className='text-stone-400'>{orderDetails.shipping.first_name + " "+orderDetails.shipping.last_name}</p>
                    <p className='text-stone-400'>{orderDetails.shipping.address_line2}</p>
                    <p className='text-stone-400'>{orderDetails.shipping.country_state +" "+ orderDetails.shipping.postcode_zipcode +" Contact No." + " "+orderDetails.shipping.phone }</p>
                    </div>
                    <div>
                    <p className='text-lg'>Expected Date Of Delivery:</p>
                    <p className='text-lg font-bold'>Order Date: {String(orderDetails.order.date_created).substring(0,10)}</p>
                    </div>
            </div>
              

     
                 


             </div>
                  
             


           
        
        

     </div>
         
</div>




      

     </Layout>
  )
}

export default OrderDetails


export async function getServerSideProps({params}) {
     //const cookies = ctx.req?.headers.cookie

   
   
     const { id } = params;
   
     const res = await fetch(`http://${process.env.HOST}:8000/admin/order/${id}`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  orderDetails= await res.json()


     
     return{props:{ orderDetails}}
     

}

