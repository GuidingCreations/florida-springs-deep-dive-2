const cloudinary = require('cloudinary').v2;

const {
  cloudName = process.env.CLOUDINARY_CLOUD_NAME,
  apiKey = process.env.CLOUDINARY_API_KEY,
  apiSecret = process.env.CLOUDINARY_API_SECRET
} = process.env;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });


export const destroyImage = async () => {
    console.log('cloud name', cloudName)

    
    const result = await cloudinary.uploader.destroy('appBackground_p5wwzy', function(error : any, result : any) {
      console.log(result, error);
    });
    console.log('destroy result', result);
  }