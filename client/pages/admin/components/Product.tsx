import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios';
import { blob } from 'node:stream/consumers';
import { FormDataType } from '../interface';

const Product = ({categories, products}:any) => {

  const router = useRouter()
  const [productForm, setProductForm]= useState(false)
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    category: '',
    description: '',
    image1: null ,
    image2: null,
    image3: null,
    image4: null,
    quantity: '',
    price: '',
  });


  const handleChange = (event:any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event:any) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
  };

  const handleSubmit = async (event:any) => {
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
      await axios.post(`http://${process.env.NEXT_PUBLIC_HOST}:8000/product/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Product added successfully');
      router.replace(router.asPath)
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };






   

     

  return (
    <div className="flex">
    <div className='flex flex-col h-auto mt-12'>
      <h1 className='text-3xl'>Product & Categories</h1>




      <div className="flex items-center h-20 px-10 mb-5 space-x-10 overflow-scroll border-2 rounded-md w-72 md:w-[40rem] snap-x snap-mandatory">

      {categories.map((e:any,i:any)=>(<div key={i}>
             
             <button className='flex items-center justify-center w-24 h-14 rounded-lg bg-[#E8E8E9] text-black hover:shadow-lg snap-center' > {e.name}</button>
           
        </div>))}
        
        <form className='snap-center' >
          <input className='w-24 border rounded-lg h-14 border-neutral-300 outline-hidden focus:outline-black' type="text" placeholder='Add Category'/>
          <button className='-ml-4' type='submit'> +</button>
     </form>
    

</div>




      
    
    
    




<div className='grid grid-cols-2 gap-y-4 md:grid-cols-4 gap-x-4 md:gap-x-8'>

  <div className='w-32 h-48 pl-2 border-2 border-dashed rounded-md md:h-80 md:w-48 border-black/20 hover:border-solid hover:border-black hover:border hover:bg-slate-50 hover:cursor-pointer' onClick={()=>setProductForm(true)}>
 
 <div className='flex-col w-auto '>
  <p className='text-2xl'>+</p>
  <p className='text-sm'>Add New Product</p>
 </div>
  
</div>
{products.map((e:any,i:any)=>(
  <div  className='relative w-32  md:w-48 bg-white border-[1.2px] rounded-lg h-48 md:h-80 hover:cursor-pointer hover:border-black group overflow-hidden hover:scale-100 hover:shadow-lg  ' key={i}>
    <div className='absolute top-0 z-50 flex justify-between w-full h-8 px-2 duration-500 -translate-y-10 bg-white opacity-50 group-hover:translate-y-0'>
     <p>${e.price}</p> 
     <p>  #{e.amount}</p>
    
    </div>
    <div className='w-full'>
    <Image className="self-center object-cover w-full h-64 shadow-md rounded-t-md " src={ `http://${process.env.NEXT_PUBLIC_HOST}:8000/`+ e.image1} width={200}  height={200} alt={e.name}/>
</div>
    <div className='flex items-center justify-center w-full '>
   
    <p className='text-sm font-light duration-500 scale-100 group-hover:scale-0 group-hover:hidden'> {e.name}</p></div>   
    <div className='z-50 w-full h-full text-white duration-500 scale-0 bg-black group-hover:scale-100' >
      <p className='w-auto h-auto pt-1 pl-2 text-xs'>     {e.description}</p>
      
 
    </div>

  </div>
))}</div>




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
  )
}

export default Product

