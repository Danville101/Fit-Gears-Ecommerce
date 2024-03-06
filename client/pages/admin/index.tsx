import React, { useReducer } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router';


const Index = () => {

     const router = useRouter();

     const [email, setEmail]=useState("");
     const [password, setPassword]=useState("");
    // const [password2, setPassword2]= useState("");
    // const [first_name, setiFrst_name]= useState("");
    // const [last_name, setLast_name]=useState("");
    // const [username, setUsername]=useState("");




     const loginFunc =(e:any)=>{
          e.preventDefault()

          fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/login/`, {
               method: 'POST',
               mode: 'cors',
               headers: {
                'Accept': 'application/json',
                 'Content-Type': 'application/json'
                 
               },

               
               body: JSON.stringify({
                 email: email,
                 password: password
               }),credentials: "include",
               
             })
             .then(response => {
               // response.status, response.statusText, response.headers will not be available 
               if (response.status == 200){
                router.push("/admin/dashboard/")               
               }

               return response.text();
             })
             .then(data => {
            
             })
             .catch(error => {
               console.error('Error:', error);
             });
     }


     

  return (
    <div className=' flex flex-col justify-center items-center h-[100vh]'>


     <div className=''>
          <form className='flex flex-col space-y-4' onSubmit={loginFunc}>
               <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' type="email" />
               <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' type="password" />
               <button type='submit' className=' bg-black/10 rounded-2xl'> Login</button>

          </form>
     </div>



     
    </div>
  )
}



export default Index

