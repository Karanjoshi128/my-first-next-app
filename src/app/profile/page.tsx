"use client";

import React, {useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const profilePage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    email : "",
    username : "",
    id : ""
  });

  const handleLogout = async () => {
    try {
      // console.log("Logout clicked");
      const response = await axios.post("api/users/logout");
      if (response) {
        // console.log(response.data);
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };



  const handleChangePassword = async () => {
    try {
      const response = await axios.post("api/users/verifyMail", {userId : userInfo.id} );
      if(response){
        // console.log(response.data);
        router.push("/changePassword");
      }
      
    } catch (error: any) {
      console.log(error.response.data);
      
    }
  };


  const getUserDetails = async () => {
    const response = await axios.get('/api/users/me')
    // console.log(response.data);
    setUserInfo(prevState => ({ ...prevState, email: response.data.data.email, username: response.data.data.username , id: response.data.data._id}));
}



  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  return (
    <>
      <div>Profile Page</div>
      <button
        className="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        className="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleChangePassword}
      >
        Change Password
      </button>
      <button
        className="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        get user details
      </button>
      {userInfo && (<div>
        <h1 className="text-base">{userInfo?.email}</h1>
        <h1 className="text-base">{userInfo?.username}</h1>
      </div>)}
    </>
  );
};

export default profilePage;
