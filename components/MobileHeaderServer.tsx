'use server'
import React from 'react'
import MobileHeader from './MobileHeader'
import { getLoggedInUser, getUserProfilePicture } from '@/lib/actions/user.action'
import ImageResourceGenerator from './ImageResourceGenerator'

const MobileHeaderServer = async () => {

    const userPic = await getUserProfilePicture();
    const user = await getLoggedInUser();
    
    console.log('MHS email', user.email)
    console.log('MHS', userPic)
  return (

    <div>
        <MobileHeader 
            userPic = {userPic ? userPic : '/icons/blank-profile.svg'}
            userEmail= {user.email}
            />
    </div>
  )
}

export default MobileHeaderServer