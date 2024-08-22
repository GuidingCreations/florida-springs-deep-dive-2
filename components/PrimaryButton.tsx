import React from 'react'

declare type buttonProps = {
  
  buttonText: string;
  className?: string;
  onClick?: () => void;

}


const PrimaryButton = (button: buttonProps) => {
  return (
    <button className= {`${button.className? button.className : ''} btn-primary btn`} onClick={button.onClick}>{button.buttonText}</button>
  )
}

export default PrimaryButton