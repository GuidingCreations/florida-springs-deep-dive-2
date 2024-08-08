import { AuthFormProps } from '@/types'
import React from 'react'
import Logo from './Logo'

const AuthForm = (props : AuthFormProps) => {
  return (
    <section className='center flex flex-col'>
        <Logo height={35} width={35}/>
    </section>
  )
}

export default AuthForm