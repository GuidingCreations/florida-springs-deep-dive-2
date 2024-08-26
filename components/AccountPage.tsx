"use client";

import React, { useRef } from "react";
import {
  getLoggedInUser,
  getUserProfilePicture,
} from "@/lib/actions/user.action";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { deleteUserProfilePicture } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

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

    file.onload = () => {
      setPreviewUserImage(file.result as string);
    };

    file.readAsDataURL(target.files[0]);
  };

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
            onClick={() => fileRef.current?.click()}
          />

        

          <PrimaryButton
            buttonText="Delete profile picture"
            className="bg-red-500"
            onClick={() => {
              setIsLoading(true);
              deleteUserProfilePicture({ userId: props.user.$id }).then((response) => {
                if (response?.responseCode === 200) {
                  router.push("/");
                }
              });
              setIsLoading(false);
            }}
            type="destroy"
            isLoading={isLoading}
          >
            

          </PrimaryButton>
        </div>
        <input type="file" ref={fileRef} hidden onChange={handleImageChange} />
      </div>
    </div>
  );
};

export default AccountPage;
