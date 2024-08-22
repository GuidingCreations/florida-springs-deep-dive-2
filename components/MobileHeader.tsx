//Imports
"use client";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { UserTypeInterface } from "@/types";
import Picture from "./Picture";

// Component

const MobileHeader = (user: any) => {
  
  const pathname = usePathname();
  console.log('user MH', user)
  return (
    <div className="horizontal-container mobile-header">
      
{/* Logo */}
 
      <Logo height={35} width={35} />

{/* If there is a logged in user, display their profile picture. If not, display a sign up button. If the user is on the sign up or sign in page, do not display anything. */}

      {user.user ? (
        <Link className="profile-pic-wrapper float-right" href= '/account'>
        <Picture
          imageURL={user.user}
          height={50}
          width={50}
          alt="profile picture"
          className="float-right profile-pic"
        />
        </Link>
      ) : pathname !== "/sign-up" && pathname !== "/sign-in" ? (
        <Link href="/sign-up" className="float-right">
          <PrimaryButton buttonText="Sign up" className="float-right" />
        </Link>
      ) : null}
    </div>
  );
};

export default MobileHeader;
