import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
  return (
    <div>
     <div className='text-2xl text-center border-t pt-8'>
      <Title text1={'ABOUT'} text2={'US'}/>
     </div>

     <div className='my-10 flex flex-col gap-16 md:flex-row'>
      <img src={assets.about_img} className='w-full md:max-w-[450px]'/>
      <div className=' flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat nobis maiores similique labore pariatur incidunt minima atque dignissimos nesciunt architecto minus repudiandae, sequi magni iste rem quae perspiciatis quidem? Quos!</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, dolorem illo. Vel magnam illo at ullam assumenda nobis pariatur voluptatum! Eveniet ipsam autem iusto?</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam aliquam dolorum voluptate, soluta dolore sunt minus vero quo?</p>
      </div>
     </div>
     <div className='text-xl py-4 '>
      <Title text1={'WHY'} text2={'CHOOSE US'}/>
     </div>
     <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem doloremque numquam quas?</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem doloremque numquam quas?</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque aliquam, minus cupiditate odio obcaecati consequuntur.</p>
      </div>
     </div>
     <NewsLetterBox/>
    </div>
  )
}

export default About
