'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const provideCredentials = () => {

    const [email, setEmail] = useState('');
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post('api/users/sendMailForforgotPassword', {email});
        if(response){
            // console.log(response);
            router.push("/login");
        }
    }






  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Change Credentials</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                       Provide the email with which you registered
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Submit
                </button>
            </form>
      
    </div>
  )
}

export default provideCredentials
