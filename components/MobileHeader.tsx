import Image from 'next/image'
import { Button } from './ui/button'

const MobileHeader = () => {
  return (
    <div className='horizontal-container'>
        <Image src='/icons/snorkel.svg' height={35} width={35} alt='logo'/>
        <h1>Florida Springs Deep Dive</h1>
        <Button className='float-right bg-theme-primary' size={'sm'}>Sign up</Button>
    </div>
  )
}

export default MobileHeader