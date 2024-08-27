"use client";

// Imports

import React, { use, useRef } from "react";
import {changeUserProfilePicture} from "@/lib/actions/user.action";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { deleteUserProfilePicture } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { AccountPageProps } from "@/types";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { flushSync } from "react-dom";



const AccountPage = (props: AccountPageProps) => {

// Declare variables
  
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUserImage, setPreviewUserImage] = React.useState<string | undefined>(props.userPic);

// Function to handle image change

  const handleImageChange = (event: React.FormEvent<HTMLInputElement>) => {

  flushSync(() => setIsLoading(true) ) 
  console.log(isLoading)
  const file = new FileReader();
  const target = event.target as HTMLInputElement & { files: FileList };

// Throw alert if file size is over 10MB

    if (target.files[0].size > 10485760) {
      alert("File size should be less than 10MB, please re-select");
      return;
    } 
    
// Else handle image change
    
    else {

      file.readAsDataURL(target.files[0]);
      file.onload = () => {
        setPreviewUserImage(file.result as string);
      };

      const data = new FormData();
      data.append("file", target.files[0]);
      data.append("upload_preset", "fl-springs-deep-dive");
      data.append("api_key", process.env.CLOUDINARY_API_KEY!);
      data.append("api_secret", process.env.CLOUDINARY_API_SECRET!);
      data.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME!);
  
      changeUserProfilePicture({formData : data})
  
    }

    window.location.reload();
    setIsLoading(false);

  }







  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="page-wrapper gap-2">
      <h1 className="center-self font-bold">
        {props.user.firstName + " " + props.user.lastName}
      </h1>
      <div className="flex flex-col items-center justify-center w-100 gap-2">
        <div className=" profile-pic-wrapper">
          <Image
            src={previewUserImage || props.userPic}
            height={150}
            width={150}
            alt="Profile Picture"
            className="profile-pic min-h-[150px] min-w-[150px] max-h-[150px] max-w-[150px]"
          />
        </div>




        <div className="flex items-center gap-2">
          {/* <PrimaryButton
            buttonText="Change profile picture"
            onClick={() => {
              const [loading, setLoading] = React.useState(false);
              fileRef.current?.click();
            }}
          /> */}


          
        <Button
            className="btn btn-primary"
            disabled={isLoading}
            onClick={() => {fileRef.current?.click();}}
          >
            {isLoading ? (
             <div className="flex gap-1"> <Loader2 className="animate-spin" size={20} /> Loading... </div>
            ) : 'Change profile picture'
            
            }

          </Button>

          <PrimaryButton
            buttonText="Delete profile picture"
            className="bg-red-500 btn btn-destroy"
            onClick={() => {
              setIsLoading(true);
              deleteUserProfilePicture({ userId: props.user.$id }).then(
                (response) => {
                  if (response?.responseCode === 200) {
                    router.push("/");
                  }
                }
              );
              setIsLoading(false);
            }}
            type="destroy"
          ></PrimaryButton>
        </div>
        <input
          type="file"
          ref={fileRef}
          hidden
          onChange={handleImageChange}
          accept="image/png, image/jpeg, image/jpg, image/svg"
        />
      </div>
    </div>
  );
};

export default AccountPage;
