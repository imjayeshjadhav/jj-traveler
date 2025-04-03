import React from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'

const Profile = () => {
  return (
    <div className="relative w-full h-screen">
      <Image src="/bg3.jpg" alt="" fill sizes="100%" className="w-full h-full object-cover" />
      <div className="w-full h-screen flex justify-center ">
        <div className="w-1/4 h-[600px] flex flex-col items-center gap-5 shadow-lg bg-white/70 rounded-md z-10 relative p-5 top-24 ">
          <div className="relative w-[150px] h-[150px] rounded-full  ">
            <Image src="/podimg2.jpg" alt='' fill sizes='100%' className='flex justify-center items-center rounded-full ring-2 ring-black' />
            <Camera className='absolute top-[115px] left-28 w-[30px] h-[30px] bg-gray-300 rounded-full '/>
          </div>
          <div className="z-10">
            <h1 className='text-xl font-semibol'>Jayesh Jadhav</h1>
          </div>
        </div>
        <div className="w-2/4 h-[600px] flex flex-col items-end gap-4 shadow-lg bg-white/80  rounded-md z-10 relative p-5 top-24 left-3 ">

        </div>
        
      </div>
       
    </div>
  )
}

export default Profile
