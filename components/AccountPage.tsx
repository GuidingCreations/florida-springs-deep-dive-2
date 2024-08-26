"use client";

import React, { use, useRef } from "react";
import {
  getLoggedInUser,
  getUserProfilePicture,
} from "@/lib/actions/user.action";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { deleteUserProfilePicture } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/actions/cloudinary.actions";
import { mkdir } from "fs";

const cloudinary = require('cloudinary').v2;
const path = require('path');
declare type AccountPageProps = {
  user: any;
  userPic: any;
};


const AccountPage = (props: AccountPageProps) => {
  const router = useRouter();

  const fileRef = useRef<HTMLInputElement>(null);

  const [userImage, setUserImage] = React.useState<File | undefined>(
    props.userPic
  );

  const [previewUserImage, setPreviewUserImage] = React.useState<
    string | undefined
  >(props.userPic);

  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    setUserImage(target.files[0]);

    const file = new FileReader();
    file.readAsDataURL(target.files[0]);

    file.onload = () => {
      setPreviewUserImage(file.result as string);
    };
    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;
    const data = new FormData();

    data.append("file", target.files[0]);
    data.append("upload_preset", "fl-springs-deep-dive");
    data.append("api_key", process.env.CLOUDINARY_API_KEY!);
    data.append("api_secret", process.env.CLOUDINARY_API_SECRET!);
    data.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME!);

    fetch(url, {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('data', data);
    }).catch((error) => {
      console.log('error', error);
    });
  }





    // data.append("upload_preset", "fl-springs-deep-dive");
    // data.append("file", target.files[0]);
    // data.append("api_key", process.env.CLOUDINARY_API_KEY);

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
          <PrimaryButton
            buttonText="Change profile picture"
            onClick={() => {
              fileRef.current?.click();
            }}
          />

          <PrimaryButton
            buttonText="Delete profile picture"
            className="bg-red-500"
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
            isLoading={isLoading}
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
