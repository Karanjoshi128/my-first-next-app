"use client";

//imports
import React, { useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import axios from 'axios'




const page = () => {

  const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const onLogin = async () => {
      try {
        console.log(user);
        
        const response = await axios.post("api/users/login", user);
        if(response){
          console.log(response.data);
          router.push('/profile');
          
        }
        
      } catch (error : any) {
        console.log(error.response.data)
        
      }

    }



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Login</h1>
        <hr />
        <div className='flex flex-col w-1/3'>
            <input 
            type='email' 
            placeholder='Email' 
            className='border border-gray-300 p-2 rounded mb-2 text-black' 
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input 
            type='password' 
            placeholder='Password' 
            className='border border-gray-300 p-2 rounded mb-2 text-black' 
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button className='bg-blue-500 text-white p-2 rounded' onClick={onLogin}>Login</button>
            <Link href='/signup' className='text-center'>
            SignUp
            </Link>
        </div>

      
    </div>
  )
}

export default page
