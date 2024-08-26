//Imports

'use server';
const cloudinary = require('cloudinary').v2;
import axios from 'axios';

// Set env names

const {
  cloudName = process.env.CLOUDINARY_CLOUD_NAME,
  apiKey = process.env.CLOUDINARY_API_KEY,
  apiSecret = process.env.CLOUDINARY_API_SECRET
} = process.env;

// Configure cloudinary

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

// Delete profile image

export const destroyImage = async () => {
    console.log('cloud name', cloudName)

    
    const result = await cloudinary.uploader.destroy('alligator', function(error : any, result : any) {
      console.log(result, error);
    });
    console.log('destroy result', result);

    if( result.result === 'ok') {
      console.log('Image destroyed')
      return {responseCode: 200, result: result}
    } else {
      console.log('Image not destroyed')
      return {responseCode: 500, error: result}
    }

  }

// Upload profile image

  export const uploadImage = async (fd : FormData) => {

    console.log('fd', fd);
    
    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;
    
    
    const cloudinaryResponse = await fetch(url, {
      method: 'POST',
      body: fd
    })
    console.log('cloudinary response', cloudinaryResponse);

    return {response: 'hello'}

  }


  export const changeImage = async () => {
    


  }