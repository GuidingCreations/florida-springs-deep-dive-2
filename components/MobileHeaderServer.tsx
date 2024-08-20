'use server'
import React from 'react'
import MobileHeader from './MobileHeader'
import { getUserProfilePicture } from '@/lib/actions/user.action'
import ImageResourceGenerator from './ImageResourceGenerator'

const MobileHeaderServer = async () => {

    const user = await getUserProfilePicture();

  return (

    <div>
        <MobileHeader user = {user}/>
    </div>
  )
}

export default MobileHeaderServer