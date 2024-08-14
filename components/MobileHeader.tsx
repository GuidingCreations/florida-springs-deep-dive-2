'use client'
import Image from 'next/image'
import PrimaryButton from './PrimaryButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { UserTypeInterface } from '@/types'

const MobileHeader =  (user : UserTypeInterface) => {

    const pathname = usePathname();


  return (
    <div className='horizontal-container mobile-header'>
        <Logo height={35} width={35}/>
        
        {user?.user?.email ? 
        <Image src='icons/blank-profile.svg' height={35} width={35} alt = 'Image' className='float-right'/> :
        pathname !== '/sign-up' && pathname !== '/sign-in' ? <Link href= '/sign-up' className='float-right'><PrimaryButton buttonText='Sign up' className='float-right'/></Link> : null }
    
        
    </div>
  )
}

export default MobileHeader