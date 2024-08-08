import Image from 'next/image'
import { Button } from './ui/button'
import PrimaryButton from './PrimaryButton'

const MobileHeader = () => {
  return (
    <div className='horizontal-container mobile-header'>
        <Image src='/icons/snorkel.svg' height={35} width={35} alt='logo'/>
        <h1>Florida Springs Deep Dive</h1>
        <PrimaryButton buttonText='Sign up' className='float-right'/>
    </div>
  )
}

export default MobileHeader