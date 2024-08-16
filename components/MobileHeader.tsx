'use client'
import Image from 'next/image'
import PrimaryButton from './PrimaryButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { UserTypeInterface } from '@/types'

const MobileHeader =  (user : any) => {

    const pathname = usePathname();
    console.log('IMAGE', user);

  return (
    <div className='horizontal-container mobile-header'>
        <Logo height={35} width={35}/>
        
        {user ?  <Image src={user.user} height={50} width={50} alt='profile picture' className='float-right profile-pic'/> :
        pathname !== '/sign-up' && pathname !== '/sign-in' ? <Link href= '/sign-up' className='float-right'><PrimaryButton buttonText='Sign up' className='float-right'/></Link> : null }
    
        
    </div>
  )
}

export default MobileHeader