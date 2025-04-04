"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { handleError, handleSuccess } from "@/lib/utils";
import { useState } from "react";
const SignIn = () => {

  const [logInInfo, setlogInInfo] = useState({
      email:'',
      password:''
    })
  
    const router= useRouter();
  
    const handleChange =(e:any)=>{
      const {name, value} = e.target;
      console.log(name,value)
      const copylogInInfo = {...logInInfo};
      copylogInInfo[name]=value;
      setlogInInfo(copylogInInfo)
    }
  
    const handleLogIn = async (e:any)=>{
      e.preventDefault();
      const {email,password} = logInInfo;
      if(!email || !password){
        return handleError('name , email and password are required')
      }
      try {
        const url = "http://localhost:8080/auth/sign-in"
        const response = await fetch(url,{
          method:"POST",
          headers:{
            'Content-type':'application/json'
          },
          body :JSON.stringify(logInInfo)
        });
        const result = await response.json();
        const {success, message,jwtToken, name,error} = result;
        if (success){
          handleSuccess(message)
          localStorage.setItem('token',jwtToken)
          localStorage.setItem('Welcome ',name)
          setTimeout(()=>{
            router.push('/');
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
          className="w-full h-full object-cover" />
      </div>
      <div className="relative backdrop-blur-md p-12 w-[800px] h-[600px] rounded-lg shadow-lg flex items-center gap-5 top-5 mt-5">       
        <div className="relative w-1/2 h-[500px]">
          <Image 
            src="/loginbg.jpg" 
            alt="Login Image" 
            fill 
            className="object-cover rounded-lg" />
        </div>
        <div className="relative w-1/2 flex flex-col gap-4 ml-5 outline-none">
          <input 
            type="text" 
            name='email'
            value={logInInfo.email}
            onChange={handleChange}
            placeholder="Email" 
            className="px-4 py-2 border rounded-md w-full bg-white/100 backdrop-blur-xl outline-none " />
          <input 
            type="password"
            name='password' 
            value={logInInfo.password}
            onChange={handleChange}
            placeholder="Password" 
            className="px-4 py-2 border rounded-md w-full bg-white/100 backdrop-blur-xl outline-none" />
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-gray-500 transition" 
            onClick={handleLogIn} >
            Login
          </button>          
          <div className="mt-7 text-center text-md">
            <p className="text-white/100">Don&apos;t have an account?</p>
            <Link 
              href="/sign-up" 
              className="flex flex-col items-center">
              <p className="text-blue-700 font-semibold ">Sign up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default SignIn;
