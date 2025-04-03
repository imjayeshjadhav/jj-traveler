"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-100">     
      <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl">
        <Image src="/loginbg.jpg" alt="" fill sizes="100%" className="w-full h-full object-cover" />
      </div>
      <div className="relative backdrop-blur-md p-12 w-[800px] h-[600px] rounded-lg shadow-lg flex items-center gap-5 top-5 mt-5">       
        <div className="relative w-1/2 h-[500px]">
          <Image src="/loginbg.jpg" alt="Login Image" fill className="object-cover rounded-lg" />
        </div>
        <div className="relative w-1/2 flex flex-col gap-4 ml-5">
          <input type="text" placeholder="Email" className="px-4 py-2 border rounded-md w-full bg-white/100 backdrop-blur-xl " />
          <input type="password" placeholder="Password" className="px-4 py-2 border rounded-md w-full bg-white/100 backdrop-blur-xl" />
          <input type="password" placeholder="Confirm Password" className="px-4 py-2 border rounded-md w-full bg-white/100 backdrop-blur-xl" />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-gray-500 transition ">Signup</button>
         
          <div className="mt-7 text-center text-md">
            <p className="text-white/100">Already have an account?</p>
            <Link href="/sign-in" className="flex flex-col items-center">
              <p className="text-blue-700 font-semibold ">Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
