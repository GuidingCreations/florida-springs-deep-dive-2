'use client'
import Image from 'next/image'
import PrimaryButton from './PrimaryButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MobileHeader = () => {

    const pathname = usePathname();

  return (
    <div className='horizontal-container mobile-header'>
        <Link href='/' className='horizontal-container'>
        <Image src='/icons/snorkel.svg' height={35} width={35} alt='logo'/>
        <h1>Florida Springs Deep Dive</h1>
        </Link>
        { pathname !== '/sign-up' ? <Link href= '/sign-up' className='float-right'><PrimaryButton buttonText='Sign up' className='float-right'/></Link> : null}
    </div>
  )
}

export default MobileHeader