"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { handleError, handleSuccess } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface LoginInfo {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {

  const [signUpInfo, setSignUpInfo] = useState({
    name:'',
    email:'',
    password:''
  })

  const router= useRouter();

  const handleChange =(e:any)=>{
    const {name, value} = e.target;
    console.log(name,value)
    const copysignUpInfo = {...signUpInfo};
    copysignUpInfo[name]=value;
    setSignUpInfo(copysignUpInfo)
  }

  const handleSignUp = async (e:any)=>{
    e.preventDefault();
    const {name,email,password} = signUpInfo;
    if(!name || !email || !password){
      return handleError('name , email and password are required')
    }
    try {
      const url = "http://localhost:8080/auth/sign-up"
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body :JSON.stringify(signUpInfo)
      });
      const result = await response.json();
      const {success, message,error} = result;
      if (success){
        handleSuccess(message)
        setTimeout(()=>{
          router.push('/sign-in');
        },1000)
      }
      else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleError(message)
      }
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <>
    <Navbar/>
    <div className="relative w-full h-screen flex justify-center items-center bg-gray-100">     
      <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl">
        <Image 
          src="/loginbg.jpg" 
          alt="" 
          fill 
          sizes="100%" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="relative backdrop-blur-md p-12 w-[800px] h-[600px] rounded-lg shadow-lg flex items-center gap-5 top-5 mt-5">       
        <div className="relative w-1/2 h-[500px]">
          <Image 
            src="/loginbg.jpg" 
            alt="Login Image" 
            fill 
            className="object-cover rounded-lg" 
          />
        </div>
        <div className="relative w-1/2 flex flex-col gap-4 ml-5 ">
          <input 
            type="text" 
            name="name"
            placeholder="Username" 
            className="px-4 py-2 border rounded-md w-full bg-white/100 backdrop-blur-xl outline-none " 
            onChange={handleChange}
            value={signUpInfo.name}
          />
          <input 
            onChange={handleChange}
            name="email"
            type="Email" 
            placeholder="Email" 
            className="px-4 py-2 border rounded-md w-full bg-white/100 backdrop-blur-xl outline-none" 
            value={signUpInfo.email}
          />
          <input 
          onChange={handleChange}
            type="password" 
            name="password"
            placeholder="Password" 
            value={signUpInfo.password}
            className="px-4 py-2 border rounded-md w-full bg-white/100 backdrop-blur-xl outline-none" 
          />
          <button 
            onClick={handleSignUp}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-gray-500 transition ">
              SignUp
          </button>
         
          <div className="mt-7 text-center text-md">
            <p className="text-white/100">Already have an account?</p>
            <Link href="/sign-in" className="flex flex-col items-center">
              <p className="text-blue-700 font-semibold ">Login</p>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default SignUp;
