import Image from 'next/image'
import Link from 'next/link'

const Logo = ({height, width} : {height: number, width: number}) => {
  return (
    <header className='horizontal-container'>
        <Link href='/' className='horizontal-container'>
        <Image src='/icons/snorkel.svg' height={height} width={width} alt='logo'/>
        <h1>Florida Springs Deep Dive</h1>
        </Link>
    </header>
  )
}

export default Logo