import React from 'react'
import { UilPlus, UilEnvelope, UilFacebookF, UilTwitter, UilInstagramAlt , UilYoutube} from '@iconscout/react-unicons'

const Footer = () => {
  return (
    <div className='flex justify-center w-screen h-auto py-8 bg-black/5 '>

     <div className="flex-col items-center justify-center space-y-4">
          <div className='flex justify-between w-80'>
               <p className="text-lg font-bold">Info</p>
               <UilPlus className="text-lg font-bold"/>
          </div>
          <div className='flex justify-between w-80'>
               <p className="text-lg font-bold">Our Policies</p>
               <UilPlus className="text-lg font-bold"/>
          </div>
          <div className='flex justify-between w-80'>
               <p className="text-lg font-bold">Order</p>
               <UilPlus className="text-lg font-bold"/>
          </div>
          <div className='flex justify-between w-80'>
               <p className="text-lg font-bold">Store</p>
               <UilPlus className="text-lg font-bold"/>
          </div>
          <div className='flex-col text-center w-80'>
            <div className='flex'>
                     <input className='px-2 py-2 w-80' placeholder='Enter your e-mail'/> <UilEnvelope className="mt-2 -ml-8"/>
            </div>
     
            <p className=''>By entering your email, you agree to our Terms of Service and Privacy Policy.</p>

          </div>
          <div className='flex items-center space-x-4'>
      <p className='text-2xl'>Follow Us:</p>
      <UilFacebookF/>
      <UilTwitter/>
      <UilInstagramAlt/>
      <UilYoutube/>
     </div>
     
     </div>

     
    </div>
  )
}

export default Footer