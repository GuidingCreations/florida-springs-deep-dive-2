import { getUserInfo } from '@/lib/actions/user.action'
import React from 'react'


const page = async () => {

  const userInfo =  await getUserInfo({userId: '66b9731e002be966372a'});
  console.log('User info', userInfo)

  return (
    <div className='page-wrapper'>Springs</div>
  )
}

export default page