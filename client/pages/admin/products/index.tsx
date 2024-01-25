import React, { useEffect, useState , useContext} from 'react'
import Layout from '../layouts/Layout'
import Product from '../components/Product'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PageContext } from '../context/PageContext'
import Link from 'next/link'
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import { UilEye, UilPen ,UilTrashAlt} from '@iconscout/react-unicons'



const Products = ({product, page, search}) => {


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
 


   const path = router.asPath

   if(path[path.length-1]=="="){
    router.replace("/admin/products")
   }

     const setPublished=async(id)=>{
         await fetch(`http://127.0.0.1:8000/admin/product_published/${id}`,
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
                  <div className=''><p>Product List</p>
                  
                   <div className='flex justify-between mt-2 md:flex-col md:space-y-4 md:right-0 '>
                     <input  type="search" placeholder='Search' className='py-2 pl-2 border outline-none w-52' onChange={(e)=>router.replace(`http://127.0.0.1:3000/admin/products/?search=${e.target.value}`)}/>
                    <button className='text-white rounded-md bg-[#28A487] px-4 py-2 w-32' onClick={()=>setProductForm(!productForm)}> Add Product</button>
                   </div></div>
                   
                   <table className="w-full mt-4 table-auto md:mt-24">
  <thead className=''>
    <tr className='bg-[#e0e0e0] rounded-2xl'>
      <th className="px-4 py-2">Product Image</th>
      <th className="px-4 py-2">Product Name</th>
      <th className="px-4 py-2">Category</th>
      <th className="px-4 py-2">Current Qty</th>
      <th className="px-4 py-2">Price</th>
      <th className="px-4 py-2">Status</th>
      <th className="px-4 py-2">Published</th>
      <th className="px-4 py-2">Option</th>
    </tr>
  </thead>
  <tbody>    
    {product.products.map((e,i)=>
 
    (<tr className={` ${i%2==0?"":"bg-[#F8F8F8] rounded-lg"} h-28`} key={i}>
     
       <td className={`px-4 py-2  `}>
         <Image src={`http://127.0.0.1:8000/${e.image1}`} width={200} height={200} alt='img'/>
       </td>
       <td className="px-4 py-2 ">{e.name}</td>
       <td className="px-4 py-2 ">{e.category_name}</td>
       <td className="px-4 py-2 ">{e.quantity}</td>
       <td className="px-4 py-2 ">${e.price}</td>
       <td className={`px-4 py-2   rounded-xl`}>
        <div className={`${e.Status=="Paid"&&"bg-[#008616]"}  ${e.Status=="Unpaid"&&"bg-[#BD1E29]"}  ${e.Status=="Processing"&&"bg-[#F2940B]"} text-white flex justify-center items-center px-2 rounded-md py-1`}>
          {e["Status"]}
        </div>
        
        </td>
        <td className="px-4 py-2 ">
        <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer " checked={e.published }  onChange={()=>setPublished(e.id)} />
  <div className={`w-11 h-6 bg-gray-200  peer-focus:ring-2
  
  ${e.published?"  peer-focus:ring-green-300 bg-green-400 ":"peer-focus:ring-red-800  after:border-red-500  bg-red-600"}
  

 rounded-full 
    peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
    after:absolute after:top-[2px] after:left-[2px]
    after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
   `}></div>
</label>
        </td>
      
      <td>
          <div className='flex items-center space-x-1'>
               <button><UilEye className='text-blue-400'/></button>
               <button><UilPen className='text-purple-400'/></button>
               <button><UilTrashAlt className='text-red-400'/></button>
          </div>
      </td>
    </tr>))}
    
  </tbody>
</table>
                   
               <div className="flex space-x-4">
                <Link href={`${router.asPath.includes("?search")?`products/?search=${search}&page=${page-1}`:`products/?page=${page-1}`}`}>
                    <button disabled={page===1}>Prev</button>
                </Link>
                <select>
                  {product.pages.map((i,e)=>(
                    <option key={i}>
         
                     
                    </option>
                  ))}
                </select>
                <Link href={`${router.asPath.includes("?search")?`products/?search=${search}&page=${page+1}`:`products/?page=${page+1}`}`}>
                        <p>Next</p>
                </Link>
              
          
               </div>

                  
              </div>
                   
              


            
         
        
      </div>
    
          
</div>


<div className={`fixed flex flex-col bg-[#3B3D40] h-screen absoulte right-0  ${productForm?"w-48":"w-0"} duration-500 `}>
      <p className="ml-2 text-white" onClick={()=>setProductForm(false)}>x</p>
<p className="mb-4 ml-2 text-white">Add new Product</p>
      <form className="ml-2 space-y-4" onSubmit={handleSubmit}>
        <input className="bg-[#292A2E] pl-2 w-44 py-2 rounded-md text-light text-white" placeholder="name" name="name" value={formData.name} type="text"  onChange={handleChange}/>
        <input className="bg-[#292A2E] pl-2 w-44 py-2 rounded-md text-light text-wh" placeholder="category" name="category" value={formData.category} type="text"  onChange={handleChange}/>
        <input className="bg-[#292A2E] pl-2 w-44 py-2 rounded-md text-light" placeholder="price" name="price" value={formData.price} type="number"  onChange={handleChange}/>
        <input className="bg-[#292A2E] pl-2 w-44 py-2 rounded-md text-light" placeholder="amount" name='quantity' value={formData.quantity} type="number" onChange={handleChange}/>
        <input className="bg-[#292A2E] pl-2 w-44 py-2 rounded-md text-light" placeholder="image1"  type="file" name="image1" onChange={handleImageChange}/>
        <input className="bg-[#292A2E] pl-2 w-44 py-2 rounded-md text-light" placeholder="image2"  type="file" name="image2"  onChange={handleImageChange}/>
        <input className="bg-[#292A2E] pl-2 w-44 py-2 rounded-md text-light" placeholder="image3"  type="file" name="image3"  onChange={handleImageChange}/>
        <input className="bg-[#292A2E] pl-2 w-44 py-2 rounded-md text-light" placeholder="image4"  type="file" name="image4"  onChange={handleImageChange}/>
        <input className="bg-[#292A2E] pl-2 w-44 py-2 rounded-md text-light" placeholder="description" value={formData.description} name="description" type="text"  onChange={handleChange}/>

        <button type="submit" className="w-40 py-4 border border-white "> Send</button>                    
      </form>

    </div>



</div>
          
     </Layout>
    
  )
}

export default Products



export async function getServerSideProps({ query }) {
     //const cookies = ctx.req?.headers.cookie


   
     const page = Number(query.page) || 1;
     const search = query.search


     if (search && page){
      const res = await fetch(`http://127.0.0.1:8000/admin/products/?search=${search}&page=${page}`,{
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
            
           },
        credentials: "include",
      })
    
      const  product= await res.json()
 
   
      
      return{props:{ product ,page, search}}
    

     }

     

     if (search){
      const res = await fetch(`http://127.0.0.1:8000/admin/products/?search=${search}`,{
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
            
           },
        credentials: "include",
      })
    
      const  product= await res.json()
 
   
      
      return{props:{ product ,page}}
    

     }
   
     const res = await fetch(`http://127.0.0.1:8000/admin/products/?page=${page}`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           
          },
       credentials: "include",
     })
   
     const  product= await res.json()


     
     return{props:{ product ,page}}
     

}