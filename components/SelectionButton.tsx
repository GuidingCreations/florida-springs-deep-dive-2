import Link from 'next/link'
import { buttonProps } from '@/types'
import { usePathname } from 'next/navigation'


const SelectionButton = (button: buttonProps) => {

    const pathname = usePathname();
    const isActive = usePathname() === button.route || pathname.startsWith(`${button.route}/`);


  return (   
    
        <button className={`${button.className? button.className : ''} btn btn-selection ${isActive ? 'btn-active' : ''}`}><Link href= {button.route} className=''>{button.buttonText}</Link></button>
    
  )
}

export default SelectionButton