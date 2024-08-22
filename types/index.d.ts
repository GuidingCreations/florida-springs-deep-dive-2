
declare type buttonProps = {
  
  buttonText: string;
  route: string;
  className?: string

}

export interface selectionBarProps {
    buttons: buttonProps[];

}

declare type AuthFormProps = {
    type: 'sign-in' | 'sign-up';
}

declare type SignUpParams = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
  };

  declare type userType = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    $id: string;
    $tenant: string;
    $createdAt: string
    $updatedAt: string;
    $permissions: [];
    $databaseId: string;
    $collectionId: string;
  }

  export interface UserTypeInterface {
    user?: userType;
  }

  export type ImageProps = {
  
    imageURL: string;
    className?: string;
    height: number;
    width: number;
    alt: string;

}

export type MobileHeaderProps = {
  userPic: any;
  userEmail: string | undefined;
}