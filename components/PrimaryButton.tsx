import { Loader2 } from 'lucide-react';
import React from 'react'

declare type buttonProps = {
  
  buttonText: string;
  className?: string;
  onClick?: () => void;
  type? : 'destroy'
  isLoading?: boolean;

}


const PrimaryButton = (button: buttonProps) => {
  return (
    <button className= {`${button.className? button.className : ''} ${button.type? 'btn-destroy' : 'btn-primary btn'}`} onClick={button.onClick} disabled = {button.isLoading}>
      
      {button.isLoading ? (
             <div className="flex gap-1"> <Loader2 className="animate-spin" size={20} /> Loading... </div>
            ) : button.buttonText }
      </button>
  )
}

export default PrimaryButton