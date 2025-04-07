"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Button from './Button'
import { User } from 'lucide-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogOut from './LogOut'
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsOpen(false);
    };

    const [currentIndex, setCurrentIndex] = useState(1)
    const[hasClicked , setHasClicked] = useState(false)
    const [isLoading , setIsLoading] = useState(false) 
    const [loadedVideos, setLoadedVideos]  = useState(0)
    const [showDropdown, setShowDropdown] = useState(false)

    const totalVideos = 4;
    const nextVideoRef = useRef<HTMLVideoElement | null>(null);

    const upcomingVideoIndex = (currentIndex % totalVideos )+1;

    const handleMiniVdClick = ()=>{
        setHasClicked(true)
        setCurrentIndex(upcomingVideoIndex)
    }

    useGSAP(()=>{
        if (hasClicked){
            gsap.set('#next-video', {visibility:'visible'})

            gsap.to('#next-video',{
                transformOrigin:'center center',
                scale:1,
                width:'100%',
                height: '100%',
                ease: 'power1.inOut',
                onStart: () => {
                    if (nextVideoRef.current) {
                        nextVideoRef.current.play();
                    }
                }
                
            })

            gsap.from('#current-video',{
                transformOrigin :'center center',
                scale:0,
                duration :1.5,
                ease: 'power1.inOut'
            }
        )}
    },{dependencies: [currentIndex], revertOnUpdate:true})


    useGSAP (()=>{
        gsap.set('#video-frame',{
            clipPath :'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius:'0 0 40% 10%'
        })

        gsap.from('#video-frame',{
            clipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius :'0 0 0 0',
            ease :'power1.inOut',
            scrollTrigger:{
                trigger :"#video-frame",
                start :'center center',
                end:'bottom center',
                scrub:true,
            }
        })
    })

    const getVideoSrc = (index : number) => `/videos/weather-${index}.mp4`

    const handleVideoLoad = ()=>{
        setLoadedVideos((prev)=>prev+1)
    }

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
          setIsLoading(false);
        }
      }, [loadedVideos]);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
        {isLoading &&(
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50 ">
                <div className="three-body">
                    <div className="three-body__dot" />
                    <div className="three-body__dot" />
                    <div className="three-body__dot" />
                </div>
            </div>
        )}
        <div className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75" id='video-frame'>
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                <div className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100" onClick={handleMiniVdClick} >
                    <video
                        ref={nextVideoRef} 
                        src={getVideoSrc(upcomingVideoIndex)}
                        loop
                        muted
                        id='current-video'
                        className='size-64 origin-center scale-150 object-cover object-center'
                        onLoadedData={handleVideoLoad}
                    />
                </div>
            </div>
            <div>
                <video
                    ref={nextVideoRef}
                    src={getVideoSrc(currentIndex)}
                    loop
                    muted
                    id='next-video'
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                    onLoadedData={handleVideoLoad}
                />
                <video
                    src={getVideoSrc(currentIndex === totalVideos-1 ? 1 : currentIndex)}
                    autoPlay
                    loop
                    muted
                    className='absolute left-0 top-0 size-full object-cover object-center'
                    onLoadedData={handleVideoLoad}
                />
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 z-40 text-blue-75'>
                j<b>o</b>urney
            </h1>
            <div className="absolute left-0 top-0 z-40 size-full">
                <div className="mt-24 px-5 sm:px-10">
                    <h1 className='special-font hero-heading text-blue-100'>
                        Trav<b>e</b>ler
                    </h1>
                    <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                    Wander More, Worry Less <br /> Your Next Destination Awaits!
                    </p>
                </div>
            </div>
        </div> 
        <h1 className='special-font hero-heading absolute bottom-5 text-black'>
                J<b>o</b>urney
        </h1>
        
    </div>
  )
}

export default Hero
