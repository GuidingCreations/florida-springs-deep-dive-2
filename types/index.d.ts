
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