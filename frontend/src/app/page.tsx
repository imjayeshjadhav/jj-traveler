import About from '@/components/About'
import Contact from '@/components/Contact'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Story from '@/components/Story'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero/>
      <Navbar/>
      <About/>
      <Features/>
      <Story/>
      <Contact/>
    </div>
  )
}

export default page
