import React from 'react'
import Image  from 'next/image';
import { ImageProps } from '@/types';


const Picture = (props : ImageProps) => {
  return (
    <Image 
    height={props.height}
    width={props.width}
    src={props.imageURL}
    className={props.className}
    alt= {props.alt}
    />
  )
    
}

export default Picture