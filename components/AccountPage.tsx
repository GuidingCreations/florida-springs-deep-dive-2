
import React from 'react'
import { getLoggedInUser, getUserProfilePicture } from '@/lib/actions/user.action'
import Image from 'next/image';

declare type AccountPageProps = {
    user: any;
    userPic: any;
}

const AccountPage = async (props: AccountPageProps) => {

console.log('user pic ap', props.userPic)
console.log('user ap', props.user )

return (
    <div className='page-wrapper'>
        <h1 className='center-self font-bold'>{props.user.firstName + " " + props.user.lastName}</h1>
    <div className='flex items-center justify-center w-100'>
    <div className=' profile-pic-wrapper'>
        <Image 
        src={props.userPic}
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

export default AccountPage