"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const mailverify = () => {

  const router = useRouter();





  const [token, setToken] = useState("");
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const redirectToChangePassword = async () => {
    router.push("/changeCredentials");
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className="font-base">hehehehhe</h1>
      {token && (
        <div>
          <h1>Ready for redirecting</h1>
        </div>
      )}
     <button
        className="bg-blue-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={redirectToChangePassword}
      >
        redirect To Change Password page
      </button>
    </div>
  );
};

export default mailverify;
