import { apiError } from "./apiError.js";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

export const cloudinaryFileUpload = async (localFilePath) => {
  try {

    if(!localFilePath){
        throw new apiError(400, 'Local file path required !!!')
    }

    if(!fs.existsSync(localFilePath)){
        throw new apiError(404, 'Image does not exist in local File Path !!!')
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    const response = await cloudinary.uploader
       .upload(
           localFilePath, {
               resource_type: "auto",
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
       // remove file 
       fs.unlinkSync(localFilePath)
       return response

  } catch (error) {
    // remove file 
    fs.unlinkSync(localFilePath)
    console.l(error)
  }
};
