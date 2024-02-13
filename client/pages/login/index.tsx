import React from 'react'
import Layout from '../layout/Layout'
import Link from 'next/link'
import { UilShop, UilAngleLeftB, UilTrashAlt , UilAngleRightB,UilExclamationOctagon, UilTimes} from '@iconscout/react-unicons'
import Image from 'next/image'
import { PageContext } from '../context/PageContext'

import { useState, useContext ,useRef} from 'react'
import { useRouter } from 'next/router'
import { AppContext } from 'next/app'

const Cart = ({cartData}) => {


     const router=useRouter()
     const regPasswordRef = useRef(null)
     const regPasswordConfirmRef = useRef(null)

    const [passwordMatch, setPasswordMatch]=useState(true)

    const checPassword=()=>{
      if(String(regPasswordRef.current.value).length> 1 && regPasswordConfirmRef.current.value !=regPasswordRef.current.value){
        setPasswordMatch(false)  
      }
      if(String(regPasswordRef.current.value).length> 1 && regPasswordConfirmRef.current.value ==regPasswordRef.current.value){
        setPasswordMatch(true)  
      }
    }

     const [email,setEmail]=useState("")
     const [password,setPassword]=useState("")
     const [regEmail,setRegEmail]=useState("")
     const [resetEmail,setResetEmail]=useState("")
     const[regUserName, setRegUserName]=useState("")
     const [regPassword,setRegPassword]=useState("")
     const [regPasswordConfrim,setRegPasswordConfirm]=useState("")

     
     const[notUser,setNotUser ]=useState(false)
     const [forgetPassword, setForgotPassword]=useState(false)


     const loginFunc =(e:any)=>{
          e.preventDefault()

          fetch(`http://${process.env.HOST}:8000/costumer/login/`, {
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
                router.back()             
               }else{
                if( response.status==400){
                  setNotUser(true)
                }
               }

               return response.text();
             }).catch((err)=>{
               alert(`Please Login ${err}`)
               
             })
             
     }
     const regFunc =(e:any)=>{
          e.preventDefault()

          fetch(`http://${process.env.HOST}:8000/costumer/register/`, {
               method: 'POST',
               mode: 'cors',
               headers: {
                'Accept': 'application/json',
                 'Content-Type': 'application/json'
                 
               },

               
               body: JSON.stringify({
                user_name:regUserName,
    email:regEmail,
    password:regPassword,
    passwordrepeat:regPasswordConfrim
               }),credentials: "include",
               
             })
             .then(response => {
               // response.status, response.statusText, response.headers will not be available 
               if (response.status == 200){
                router.back()             
               }else{
                if( response.status==400){
                  setNotUser(true)
                }
               }

               return response.text();
             }).catch((err)=>{
               alert(`Please Login ${err}`)
               
             })
             
     }

     
     const restPassword =(e:any)=>{
          e.preventDefault()

          fetch(`http://${process.env.HOST}:8000/costumer/reset_password/`, {
               method: 'POST',
               mode: 'cors',
               headers: {
                'Accept': 'application/json',
                 'Content-Type': 'application/json'
                 
               },

               
               body: JSON.stringify({
   
                email:resetEmail

               }),credentials: "include",
               
             })
             
             
     }

     
  return (
     <Layout cartData={cartData}>
         <div className='flex flex-col min-h-screen'>
          <div className='flex items-center justify-center w-full h-20 border'>
               <div className='flex items-center justify-center w-auto h-20 border-b-2 border-black '><p className='text-2xl font-bold '>LOG IN </p></div>
          </div>
          <div className='flex flex-col items-center justify-center space-x-8 lg:flex lg:flex-row'>
               
         
       

          <div className='flex flex-col pb-8 mt-8 border-b-2 lg:border-2 w-80 lg:w-[20vw] lg:pt-8'>
               <div className='pl-4 border-b-2 border-black w-fit '>
                    <p className='font-bold '>LOG IN</p>
               </div>
               <div className='w-full px-4 mt-4'>
                    <form onSubmit={loginFunc} >
                          
                            <div className='flex flex-col space-y-4'>
                
                            <div>
                            <p className='font-light'>EMAIL</p>
                            <input className='w-full h-10 pl-4 border outline-none' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div>
                            <p className='font-light'>PASSWORD</p>
                            <input className='w-full h-10 pl-4 border outline-none' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className={`flex items-center space-x-2 text-red-600 ${notUser?"":"hidden"}`}>
                              <UilExclamationOctagon className=""/>
                              <p className='text-sm'>
                              Sorry, your email or password doesn`&apos;`t match our records. Please check that you have entered them correctly, or

Reset password
<p className='text-black underline hover:cursor-pointer' onClick={()=>setForgotPassword(true)}>Foget Password</p>
                              </p>
                            </div>
                          
                            <input className='w-full h-10 pl-4 text-white bg-black border outline-none hover:cursor-pointer' type='submit' value={"LOG IN SECURELY"} disabled={!passwordMatch}/>
                  </div>
                    </form>
              
                    
                    
               </div>


               




               
          </div>






          <div className='flex flex-col pb-8 mt-8 border-b-2 lg:border-2 w-80 lg:w-[20vw] lg:pt-8 lg:mt-10'>
               <div className='pl-4 border-b-2 border-black w-fit '>
                    <p className='font-bold '>CREATE ACCOUNT</p>
               </div>
               <div className='w-full px-4 mt-4'>
                    <form onSubmit={regFunc} >
                          
                            <div className='flex flex-col space-y-4'>
                
                           
                            <div>
                            <p className='font-light'>USERNAME</p>
                            <input className='w-full h-10 pl-4 border outline-none' type='text' value={regUserName} onChange={(e)=>setRegUserName(e.target.value)}/>
                            </div>
                             <div>
                            <p className='font-light'>EMAIL</p>
                            <input className='w-full h-10 pl-4 border outline-none' type='email' value={regEmail} onChange={(e)=>setRegEmail(e.target.value)}/>
                            </div>
                            <div>
                            <p className='font-light'>PASSWORD</p>
                            <input className='w-full h-10 pl-4 border outline-none' type='password' value={regPassword} ref={regPasswordRef}  onChange={(e)=>setRegPassword(e.target.value)}/>
                            </div>
                            <div>
                            <p className='font-light'>PASSWORD CONFIRM</p>
                            <input className={`w-full h-10 pl-4 border    ${passwordMatch?"":"border-red-500"}  outline-none`} type='password' value={regPasswordConfrim} ref={regPasswordConfirmRef} onChange={(e)=>setRegPasswordConfirm(e.target.value)} onBlur={checPassword}/>
                            <p className={`text-xs text-red-600 ${passwordMatch?"hidden":""}`}> Passwords dont matach</p>
                            </div>
              
                          
                            <input className='w-full h-10 pl-4 text-white bg-black border outline-none hover:cursor-pointer' type='submit' value={"REGISTER"}/>
                  </div>
                    </form>
              
                    
                    
               </div>


               




               
          </div>
          
           </div>
         </div>
         <div className={`fixed top-0 right-0 w-screen h-screen  bg-gray-900 bg-opacity-75 z-50   duration-500 hover:cursor-pointer overflow-hidden flex justify-center items-center ${forgetPassword?"":"hidden"} `} >

          <div className='z-50 w-auto h-auto px-4 py-4 bg-white bg-opacity-100'>
            <div className="flex justify-between font-bold ">
              <p>FORGET PASSWORD?</p>
              <UilTimes onClick={()=>setForgotPassword(!forgetPassword)}/>
              
            </div>

            <p className='mt-2 text-xs w-80'>Don`&apos;`t worry - it`&apos;`s easily done! Just enter your email address below and we`&apos;`ll send you a link to reset your password.</p>
            
            <form onSubmit={restPassword}>
              <div className='flex flex-col mt-2'>
                <p>EMAIL</p>
                <input className='w-full h-10 pl-2 mb-4 border border-black outline-none' type='email' onChange={(e)=>setResetEmail(e.target.value)}/>
                <input className='w-full h-10 pl-4 text-white bg-black border outline-none hover:cursor-pointer' type='submit' value={"RESET PASSWORD"}/>
                </div>
            </form>
          </div>
         </div>
     </Layout>
  )
}

export default Cart



export async function getServerSideProps (context){
     const headers = context.req.headers;
     const userAgent = headers['user-agent'];
   
  
   
   
     
     const res2 = await fetch(`http://${process.env.HOST}:8000/costumer/cart/`,{
       headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent':userAgent
           
          },
       credentials: "include",
     })
   
     const  cartData= await res2.json()
   
   
   
   
   
     
     return{props:{  cartData }}
     
   
   }
   
   
   