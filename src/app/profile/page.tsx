'use client'

import React, { use } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import {useRouter} from 'next/navigation'

const profilePage = () => {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      console.log("Logout clicked");
      const response = await axios.post("api/users/logout");
      if (response) {
        console.log(response.data);
        router.push('/login')
      }
    } catch (error: any) {
      console.log(error.response.data);
      
    }
  };
  return (
    <>
      <div>Profile Page</div>
      <button
        className="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default profilePage;
