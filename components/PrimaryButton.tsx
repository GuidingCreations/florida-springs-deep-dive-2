import { Loader2 } from 'lucide-react';
import React from 'react'
import { flushSync } from 'react-dom';

declare type buttonProps = {
  
  buttonText: string;
  className?: string;
  onClick?: () => void;
  type? : 'destroy'

}


const PrimaryButton = (button: buttonProps)  =>  {

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <button className= {`${button.className? button.className : ''} ${button.type? 'btn-destroy' : 'btn-primary btn'}`} onClick={
     async () => {
        button.onClick && button.onClick();
      }
    } disabled = {isLoading}>
      
      {isLoading ? (
             <div className="flex gap-1"> <Loader2 className="animate-spin" size={20} /> Loading... </div>
            ) : button.buttonText }
      </button>
  )
}

export default PrimaryButton