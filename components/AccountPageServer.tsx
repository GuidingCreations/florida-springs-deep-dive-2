'use server'


import React from 'react'
import { getUserProfilePicture, getLoggedInUser } from '@/lib/actions/user.action'
import AccountPage from './AccountPage'

const AccountPageServer = async () => {

  const user = await getLoggedInUser();
  console.log('Logged in user', user)
  const userPic = await getUserProfilePicture();

  return (
    <>
    <AccountPage 
    user={user ? user : {}}
    userPic={userPic ? userPic : '/icons/blank-profile.svg'}
    />
     

    </>
  )
}

export default AccountPageServer