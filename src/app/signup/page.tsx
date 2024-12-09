"use client";

//imports
import React, { useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import axios from 'axios'




const page = () => {

  const router = useRouter();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const onSignUp = async () => {
      try {
        // console.log(user);
        
        const response = await axios.post("api/users/signup", user);
        if(response){
          // console.log(response.data);
          router.push('/login');
        }

      } catch (error : any) {
        console.log(error.response.data)
        
      }

    }



  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>SignUp</h1>
        <hr />
        <div className='flex flex-col w-1/3'>
            <input 
            type='text' 
            placeholder='Username' 
            className='border border-gray-300 p-2 rounded mb-2 text-black' 
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
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
            <button className='bg-blue-500 text-white p-2 rounded' onClick={onSignUp}>SignUp</button>
            <Link href='/login'  className='text-center'>
            Login
            </Link>
        </div>

      
    </div>
  )
}

export default page
