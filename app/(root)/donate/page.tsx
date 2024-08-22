'use client'
require('dotenv').config()
import DonatePage from '@/components/DonatePage'
import { destroyImage } from '@/lib/actions/cloudinary.actions'
import React from 'react'

const page = () => {

  console.log('env', process.env.CLOUDINARY_CLOUD_NAME)
  return ( <>
  
  <button onClick={() => destroyImage()}>Destroy</button>
  
  </> )
}

export default page