'use server'

import React from 'react'
import { getLoggedInUser, getUserProfilePicture } from '@/lib/actions/user.action'
import Image from 'next/image';

const page = async () => {
const userPic = await getUserProfilePicture();
const user = await getLoggedInUser();

return (
    <div className='page-wrapper'>
        <h1 className='center-self font-bold'>{user.firstName + " " + user.lastName}</h1>
    <div className='flex items-center justify-center w-100'>
    <div className=' profile-pic-wrapper'>
        <Image 
        src={userPic}
        height={200}
        width={200}
        alt='Profile Picture'
        className='profile-pic'
        />
    </div>
    </div>
    </div>

  )
}

export default page