import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
  return (
    <div className='page-wrapper auth-page'>
        <AuthForm type='sign-up'/>
    </div>
  )
}

export default page