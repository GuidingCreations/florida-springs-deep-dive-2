import React from 'react'

declare type buttonProps = {
  
  buttonText: string;
  className?: string

}


const PrimaryButton = (button: buttonProps) => {
  return (
    <button className= {`${button.className? button.className : ''} btn-primary btn`}>{button.buttonText}</button>
  )
}

export default PrimaryButton