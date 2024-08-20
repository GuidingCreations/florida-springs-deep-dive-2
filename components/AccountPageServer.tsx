'use server'


import React from 'react'
import { getUserProfilePicture, getLoggedInUser } from '@/lib/actions/user.action'
import AccountPage from './AccountPage'

const AccountPageServer = async () => {

  const user = await getLoggedInUser();
  const userPic = await getUserProfilePicture();

  return (
    <AccountPage 
    user={user}
    userPic={userPic}
    />
  )
}

export default AccountPageServer