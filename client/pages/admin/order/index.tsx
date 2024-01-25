import React, { useEffect, useState , useContext} from 'react'
import Layout from '../layouts/Layout'
import Product from '../components/Product'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PageContext } from '../context/PageContext'
import Link from 'next/link'
import { FaEye } from 'react-icons/fa'
import { UilEye} from '@iconscout/react-unicons'


const Order = ({orders}) => {


     const { navbar, setNavbar } = useContext(PageContext)

  const [productForm, setProductForm]= useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    quantity: '',
    price: '',
  });


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('category', formData.category);
    form.append('description', formData.description);
    form.append('image1', formData.image1, formData.image1.name);
    form.append('image2', formData.image2, formData.image2.name);
    form.append('image3', formData.image3, formData.image3.name);
    form.append('image4', formData.image4, formData.image4.name);
    form.append('quantity', formData.quantity);
    form.append('price', formData.price);
    try {
      await axios.post('http://127.0.0.1:8000/product/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product added successfully');
      router.replace(router.asPath)
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

   const router = useRouter()

     const setPublished=(id)=>{
          fetch(`http://127.0.0.1:8000/admin/product/${id}`,
          {
               method: 'PUT',
               mode: 'cors',
               headers: {
                'Accept': 'application/json',
                 'Content-Type': 'application/json'
                 
               },

            
               
             })
             .then(response => {
               // response.status, response.statusText, response.headers will not be available 
             
                router.replace(router.asPath)            
               
             })
          
          
     }


     
  return (
   
     
     <Layout>
          <div className='flex ' >
               
                <div className=' h-screen mt-6 bg-[#F5F6F4] flex flex-col w-full   '>
          
          <div className='px-4'>
         


              
              <div className='items-center w-full px-4 py-4 overflow-x-scroll duration-500 bg-white rounded-lg shadow-sm hover:-translate-y-4'>
                  <div className=''><p>Orders</p>
                  
                   <div className='flex justify-between mt-2 md:flex-col md:space-y-4 md:right-0 '>
                     <input type="search" placeholder='Search' className='py-2 pl-2 border w-52'/>
                    <button className='text-white rounded-md bg-[#28A487] px-4 py-2 w-32' onClick={()=>setProductForm(!productForm)}> Add Product</button>
                   </div></div>
                   
                   <table className="w-full mt-4 table-auto md:mt-24">
  <thead className=''>
    <tr className='bg-[#e0e0e0] rounded-2xl'>

      <th className="px-4 py-2 ">Costumer</th>
      <th className="px-4 py-2 ">Order Number</th>
      <th className="px-4 py-2">Date</th>
      <th className="px-4 py-2">Total</th>
      <th className="px-4 py-2">Shipping Add</th>
     
      <th className="px-4 py-2">Status</th>
      <th className="px-4 py-2">Phone</th>
      <th className="px-4 py-2">Option</th>
    </tr>
  </thead>
  <tbody>    
    {orders.map((e,i)=>
  
    (
      
      
    <tr key={i} className={` ${i%2==0?"":"bg-[#F8F8F8] rounded-lg"} h-28`} >
      
      <td className="px-4 py-2 ">{e.order.costumer_email}</td>
       <td className={`px-4 py-2  `}>
       {e.order.order_number}
       </td>
       <td className="px-4 py-2 "> {String(e.order.date_created).substring(0,10)}</td>
       <td className="px-4 py-2 ">$ {e.order.total_cost}</td>
       <td className="flex-col px-4 py-2 ">{`${e.shipping.address_line2}  ${e.shipping.country_state}  ${e.shipping.postcode_zipcode} `}</td>
      
       <td className={`px-4 py-2  rounded-xl`}>
        <div className={`${e.order.status=="paid"&&"bg-[#008616]"}  ${e.order.status=="failed"&&"bg-[#BD1E29]"}  ${e.order.status=="processing"&&"bg-[#F2940B]"} text-white flex justify-center items-center px-2 rounded-md py-1`}>
          {e.order.status}
        </div>
        
        </td>
        <td className="px-4 py-2 ">
          {e.shipping.phone}
        </td>
      
      <td className='pl-8' >
  
              
               <Link   href={`/admin/order/${e.order.id}`}><UilEye className="text-blue-400"/> </Link>
         

      </td>
   
    </tr>

   
    ))}
    
  </tbody>
</table>
                   
             
                  
              </div>
                   
              


            
         
         

      </div>
          
</div>



</div>
          
     </Layout>
    
  )
}

export default Order



export async function getServerSideProps(ctx:NextPageContext) {
     //const cookies = ctx.req?.headers.cookie


   
     
   
     const res = await fetch("http://127.0.0.1:8000/admin/orders/",{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          }
          ,
       credentials: "include",
     })
   
     const  orders= await res.json()

   
     
     return{props:{ orders}}
     

}