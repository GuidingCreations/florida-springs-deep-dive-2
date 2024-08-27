//Imports

'use server';
import { uploadProfilePictureToAppwrite } from "../appwrite";
import { getLoggedInUser, getUserProfilePicture } from "./user.action";
const cloudinary = require('cloudinary').v2;

// Set env names

const {
  cloudName = process.env.CLOUDINARY_CLOUD_NAME,
  apiKey = process.env.CLOUDINARY_API_KEY,
  apiSecret = process.env.CLOUDINARY_API_SECRET
} = process.env;

const uploadURL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;

// Configure cloudinary

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

// Delete profile image

export const destroyImage = async (imageName : string) => {
    console.log('cloud name', cloudName)

    
    const result = await cloudinary.uploader.destroy(imageName, function(error : any, result : any) {
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

  export const uploadImageToCloudinary = async (formData : FormData) => {

    try {

    // Add image to cloudinary

    const cloudinaryResponse = await fetch(uploadURL, {
      method: 'POST',
      body: formData
    });

    const cloudinaryResponseData = await cloudinaryResponse.json();

    
    console.log('data', cloudinaryResponseData);
 
    return cloudinaryResponseData;

      
    } catch (error) {
      console.log('error', error);
      return error;
    }
    
  }


  export const changeImage = async () => {
    


  }

export const deleteProfilePictureFromCloudinary = async () => {
    
    const currentUserPic = await getUserProfilePicture();

    if (currentUserPic?.userPic !== '/icons/blank-profile.svg') {
        destroyImage(currentUserPic?.cloudinaryImageName);
        console.log('destroyed image');
        return currentUserPic?.userId;
    }

}